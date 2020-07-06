import express from "express";
import cors from "cors";
import { showsRoutes } from "./routes";
import Pup from "./Pup";

if (!process.env["API_KEY"])
  throw new Error("No 2captcha 'apikey' env variable set.");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/shows", showsRoutes);

app.listen(3000, async () => {
  console.log("Server started!");

  await Pup.init();
  await Pup.load();
  console.log("Pup ready!");
});
