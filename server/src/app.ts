import express from "express";
import cors from "cors";
import { showsRoutes } from "./routes";

import Pup from "./Pup";

let web: Pup;
(async () => {
  web = await new Pup().init();
  await web.load();
})();

const app = express();

app.use(express.json());
app.use(cors());

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
