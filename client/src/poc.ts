import Hls from "hls.js";
import axios from "axios";

const videoEl = document.querySelector("video")!;

const print = (val: string) => {
  document.body.appendChild(document.createElement("pre")).innerText = val;
};

print("loadinmg");

function loadVideo(url: string) {
  const hls = new Hls();
  hls.loadSource(url);
  hls.attachMedia(videoEl);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    videoEl?.play();
  });
}

(async () => {
  const search = (
    await axios.get(
      "http://192.168.0.25:3000/api/shows/search?query=rick%20and%20morty"
    )
  ).data;
  print(JSON.stringify(search));

  const slug = search.result[0].slug;
  print(slug);

  // Get GReCaptcha token
  const captchaToken = (await axios.get("http://192.168.0.25:3000/api/captcha"))
    .data;
  print(captchaToken);

  const auth = (
    await axios.post("http://192.168.0.25:3000/api/shows/auth", {
      slug,
      captchaToken,
    })
  ).data;
  print(JSON.stringify(auth));

  const seasons = (
    await axios.get(`http://192.168.0.25:3000/api/shows/seasons/${slug}`)
  ).data;
  print(JSON.stringify(seasons));

  const episodeId = seasons["1"].episodes["1"].id_episode;
  print(episodeId);

  const links = (
    await axios.post(
      `http://192.168.0.25:3000/api/shows/episode/${episodeId}`,
      {
        auth,
      }
    )
  ).data;
  print(JSON.stringify(links));

  loadVideo(links["720"]);
})();
