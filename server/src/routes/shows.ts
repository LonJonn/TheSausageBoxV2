import express from "express";
import fetch from "node-fetch";
import Pup, { AuthResponse } from "../Pup";

const router = express.Router();

/**
 * Search for a show and retrieve data.
 * Used to find the slug of a show.
 */
const searchUrl = "https://lookmovie.ag/api/v1/shows/search/?q=";
router.get("/search", async (req, res) => {
  const { query: searchQuery } = req.query;
  if (!searchQuery) return res.status(400).json("No search query provided.");

  const searchRes = await fetch(searchUrl + searchQuery);

  if (!searchRes.ok)
    return res
      .status(searchRes.status)
      .json("Something went wrong: " + searchRes.statusText);

  const data = await searchRes.json();
  res.json(data);
});

/**
 * Get the shows seasons as a JSON object.
 */
const pageUrl = "https://lookmovie.ag/shows/view/";
router.get("/seasons/:slug", async (req, res) => {
  const { slug } = req.params;

  const pageRes = await fetch(pageUrl + slug);

  if (!pageRes.ok)
    return res
      .status(pageRes.status)
      .json("Something went wrong: " + pageRes.statusText);

  const html = await pageRes.text();

  const seasons = JSON.parse(
    html
      .match(/({\\)(.|\n)+(?=';\nwindow.slug)/g)![0]
      .replace(/\\\\"/g, "\\\\'")
      .replace(/[\r\n\\]/g, "")
  );

  res.json(seasons);
});

/**
 * Authenticate for a show.
 * Show slug and Google ReCaptcha token required as query params.
 */
router.get("/auth/:slug", async (req, res) => {
  const { slug } = req.params;

  // If valid auth for this show already exists, use it
  const existingAuth = Pup.getExisitingAuth(slug);
  if (existingAuth) return res.json(existingAuth.data);

  // Otherwise get new auth
  const auth = await Pup.getNewToken(slug);
  if (auth.success) {
    res.json(auth.data);
  } else {
    res.status(401).json("Auth failed.");
  }
});

type Qualities = {
  "1080"?: string;
  "720"?: string;
  "480"?: string;
};

/**
 * Get hashmap of qualities for episode with Url to their index.m3u8 files.
 * Auth Access Token and Expiry required from /auth.
 */
router.post("/episode/:id", async (req, res) => {
  const { data: auth } = req.body as AuthResponse;
  const { accessToken, expires } = auth;
  const { id } = req.params;

  const masterUrl = `https://lookmovie.ag/manifests/shows/json/${accessToken}/${expires}/${id}/master.m3u8`;
  const masterRes = await fetch(masterUrl);
  if (!masterRes.ok)
    return res
      .status(masterRes.status)
      .json("Something went wrong: " + masterRes.statusText);
  const qualities = (await masterRes.json()) as Qualities;

  res.json(qualities);
});

export default router;
