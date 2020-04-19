import express from "express";
import { showsRoutes } from "./routes";

import Pup from "./pup";

let web: Pup;
(async () => {
  web = await new Pup().init();
  await web.load();
})();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  // CORS middleware
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/captcha", async (req, res) => {
  try {
    const captchaToken = await web.getNewToken();
    res.json(captchaToken);
  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(503).json({ error: err.message });
  }
});

// Routes
app.use("/api/shows", showsRoutes);

app.listen(3000, () => {
  console.log("Server started!");
});
