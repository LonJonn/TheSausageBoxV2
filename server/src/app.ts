import express from "express";
import cors from "cors";
import { showsRoutes } from "./routes";

if (!process.env["apikey"])
  throw new Error("No 2captcha 'apikey' env variable set.");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/shows", showsRoutes);

app.listen(3000, () => {
  console.log("Server started!");
});
