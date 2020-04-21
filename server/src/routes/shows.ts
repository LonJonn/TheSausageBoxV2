import express from "express";
import fetch from "node-fetch";
import { captchaMw, ICaptchaReq } from "../middleware";

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
interface IAuthResponse {
  success: boolean;
  data: {
    expires: number;
    accessToken: string;
  };
}

const authUrl = "https://false-promise.lookmovie.ag/api/v1/storage/shows/";
router.get("/auth/:slug", captchaMw, async (req: ICaptchaReq, res) => {
  const { slug } = req.params;

  async function getAuth(token: string) {
    let queryString = `?slug=${slug}&token=${token}&sk=null&step=1`;

    let authRes = await fetch(authUrl + queryString);
    if (!authRes.ok)
      res
        .status(authRes.status)
        .json("Something went wrong: " + authRes.statusText);

    return (await authRes.json()) as IAuthResponse;
  }

  let auth = await getAuth(req.web!.token);
  if (!auth.success) {
    req.web?.refreshToken();
    auth = await getAuth(req.web!.token);
  }

  if (!auth.success) return res.status(503).json("Auth failed.");

  res.json(auth);
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
  const { accessToken, expires } = auth.data;
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

/**
 * ########################
 * !!__MAYBE NOT NEEDED__!!
 * #######################
 */
/**
 * Get the index.m3u8 file for an episode.
 * Episode ID and Auth Access Token and Expiry required from /auth.
 */
interface IIndexBody {
  indexUrl: string;
  auth: IAuthResponse;
}

router.post("/:id/index", async (req, res) => {
  const { auth } = req.body as IIndexBody;
  const { accessToken, expires } = auth.data;
  const { id: episodeId } = req.params;

  // Create master.m3u8 URL and fetch file
  // const masterUrl = `https://dev.lookmovie.ag/manifests/shows/json/${auth.data.accessToken}/${auth.data.expires}/${episodeId}/master.m3u8`;
  // const masterFileRes = await fetch(masterUrl);
  // if (!masterFileRes.ok)
  //   return res
  //     .status(masterFileRes.status)
  //     .json("Something went wrong: " + masterFileRes.statusText);
  // const masterFileText = await masterFileRes.text();

  // Create master.m3u8 URL and fetch episode quality links
  const masterUrl = `https://dev.lookmovie.ag/manifests/shows/json/${accessToken}/${expires}/${episodeId}/master.m3u8`;
  const masterRes = await fetch(masterUrl);
  if (!masterRes.ok)
    return res
      .status(masterRes.status)
      .json("Something went wrong: " + masterRes.statusText);
  const masterData = (await masterRes.json()) as IMasterResponse;

  // Get index.m3u8 URL from master.m3u8 file
  const bestQualityUrl =
    masterData["1080"] || masterData["720"] || masterData["480"];
  if (!bestQualityUrl)
    return res.status(404).json("Can't find any links for episode.");
  const indexFileRes = await fetch(bestQualityUrl);
  if (!indexFileRes.ok)
    return res
      .status(indexFileRes.status)
      .json("Something went wrong: " + indexFileRes.statusText);
  const indexBuffer = await indexFileRes.buffer();

  res.header("Content-Type", "application/vnd.apple.mpegurl").end(indexBuffer);
});

export default router;
