import express from "express";
import cors from "cors";
import { showsRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/api/captcha", captchaMiddleware, async (req: ICaptchaReq, res) => {
//   try {
//     const captchaToken = await web.getNewToken();
//     res.json(captchaToken);
//   } catch (err) {
//     console.error("SERVER ERROR:", err.message);
//     res.status(503).json({ error: err.message });
//   }
// });

// Routes
app.use("/api/shows", showsRoutes);

app.listen(3000, () => {
  console.log("Server started!");
});
