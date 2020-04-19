// Step 1 - Search for Movie / Show
const showsLink = "https://lookmovie.ag/api/v1/shows/search/?q=breaking%20bad";
const showsResponse = {
  total: 1,
  result: [
    {
      imdb_rating: "9.5",
      id_show: "21",
      slug: "0903747-breaking-bad-2008",
      year: "2008",
      first_air_date: "2008-01-20 00:00:00",
      title: "Breaking Bad",
      description:
        "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
      duration: "45",
      views: "20",
      poster: "/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg",
      backdrop: "/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
      date_added: "2019-02-22 01:28:42",
    },
  ],
};

const moviesLink =
  "https://lookmovie.ag/api/v1/movies/search/?q=breaking%20bad";
const moviesResponse = {
  per_page: 20,
  total: 1,
  result: [
    {
      imdb_rating: "0",
      id_movie: "85325",
      slug: "9243946-el-camino-a-breaking-bad-movie-2019",
      backdrop: "/2Y8nK5SSNzcWOfbOlmnmdt28xTW.jpg",
      shard_url: "/storage6/",
      year: "2019",
      flag_quality: "8",
      release_date: "2019-10-11 00:00:00",
      title: "El Camino: A Breaking Bad Movie",
      description:
        "In the wake of his dramatic escape from captivity, Jesse Pinkman must come to terms with his past in order to forge some kind of future.",
      duration: "123",
      poster: "/eGY2PH7LZwM1j6u107zsuesD4CU.jpg",
    },
  ],
};

// Step 2 - download server generated html with window.seasons
const step2 = "https://lookmovie.ag/shows/view/0903747-breaking-bad-2008";

// Step 3 - parse seasons obj and find episode IDs
const step3 = {
  "1": {
    episodes: {
      "1": {
        id_episode: "35691",
        episode: "1",
        season: "1",
        title: "Pilot",
        description:
          "When an unassuming high school chemistry teacher discovers he has a rare form of lung cancer, he decides to team up with a former student and create a top of the line crystal meth in a used RV, to provide for his family once he is gone.",
        still_path: "/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg",
        air_date: "2008-01-20",
        is_chromecast_supported: "0",
      },
    },
    meta: {
      first_air_date: "2008-01-20",
      description:
        'High school chemistry teacher Walter White\'s life is suddenly transformed by a dire medical diagnosis. Street-savvy former student Jesse Pinkman "teaches" Walter a new trade.',
      title: "Season 1",
      season: "1",
      poster: "/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg",
    },
  },
};

// Step 4 - Get Google ReCaptcha Token
const token = await grecaptcha.execute(
  "6Ley5moUAAAAAJxloiuF--u_uS28aYUj-0E6tSfZ"
);

// Step 5 - Generate access URL for master manifest
const queryParams = {
  slug: "0903747-breaking-bad-2008",
  token:
    "03AHaCkAbk3_Xh9FU37Wvc3ZMj-j6glSGoZHqziarCbSAQFE8pPyrYSXSVwVXpyChQSNLGYR4bHn-PSNNIMMKqevS0W6AeJ8cy16EImGrajKCPDTDwrU--6JfhR7iOYlhIJ7tkh-gf0bY8KL4HjMzPt0oz42hIkimVDd2uWedmkTO2r8DyAzKf0AUz-MG5mfvgBHLJWWwY3bd99SEl8r44J9AwlsrkTUzPqLPMDMTpHDlHWSOYVG6FCCfj-aTUYxzBiyGxcUesrK8B9lQQpP4BxSakhUJDoGV0NkCZ_F1q2ep_HCkKZ0P4eukHoC7plnWHq8M6vORr1vPGEzIjvDblPtsNZsL5QjHHZwvmu6Yj50Y502Jc_V76RCsbAan06WzTBl454rUe9_fd",
  sk: null,
  step: 1,
};
const step5 = `https://false-promise.lookmovie.ag/api/v1/storage/shows/?slug=${queryParams.slug}&token=${queryParams.token}&sk=null&step=1`;
const returns = {
  sk: "",
  expires: 1587124608,
  accessToken: "smZA1Krnt9kCyO2TCVSJBQ",
};

// Step 6 - Fetch master manifest
const step6 =
  "https://lookmovie.ag/manifests/shows/<Xm4zcbOLDmUne1bBFL2r_Q>/<1587046352>/<35633>/master.m3u8";

// Step 7 - Fetch index manifest and feed to HLS player
const step7 =
  "https://xvi.lookmovie.ag/Xm4zcbOLDmUne1bBFL2r_Q/1587046352/storage2/shows/0903747-breaking-bad-2008/21-S1E7-1551423755/720p/index.m3u8";

// Optional Step - Get subtitles
const subtitlesURL =
  "https://lookmovie.ag/api/v1/shows/episode-subtitles/?id_episode=35633";
const subReturns = [
  {
    languageName: "English",
    shard: "storage2",
    isoCode: "en",
    storagePath:
      "shows/0903747-breaking-bad-2008/21-S1E7-1551423755/subtitles/",
  },
];
