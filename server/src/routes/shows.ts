import express from "express";
import fetch from "node-fetch";
import Auther, { IAuthResponse } from "../Auther";

const router = express.Router();

/**
 * Search for a show and retrieve data.
 * Used to find the slug of a show.
 */
const searchUrl = "https://dev.lookmovie.ag/api/v1/shows/search/?q=";
router.get("/search", async (req, res) => {
  const { query: searchQuery } = req.query;
  if (!searchQuery)
    return res.status(400).send({ error: "No search query provided." });

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
const pageUrl = "https://dev.lookmovie.ag/shows/view/";
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
  const auther = new Auther();

  auther.slug = slug;
  await auther.sendCaptcha();
  await auther.waitForResult();

  try {
    const auth = await auther.auth();
    res.json(auth);
  } catch (error) {
    res.status(401).json("Auth failed.");
  }
});

/**
 * Get hashmap of qualities for episode with Url to their index.m3u8 files.
 * Auth Access Token and Expiry required from /auth.
 */
interface IQualityBody {
  auth: IAuthResponse;
}

interface IMasterResponse {
  "1080"?: string;
  "720"?: string;
  "480"?: string;
}

router.post("/episode/:id", async (req, res) => {
  const { auth } = req.body as IQualityBody;
  const { accessToken, expires } = auth;
  const { id: episodeId } = req.params;

  const masterUrl = `https://dev.lookmovie.ag/manifests/shows/json/${accessToken}/${expires}/${episodeId}/master.m3u8`;
  const masterRes = await fetch(masterUrl);
  if (!masterRes.ok)
    return res
      .status(masterRes.status)
      .json("Something went wrong: " + masterRes.statusText);
  const qualities = (await masterRes.json()) as IMasterResponse;

  res.json(qualities);
});

export default router;
