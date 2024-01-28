import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import chatRoute from "./routes/chat.js";
import mysteryRoute from "./routes/mystery.js";
import progressRoute from "./routes/progress.js";
process.env.GOOGLE_CLOUD_PROJECT = "";

const app = express();
const port = 3001;

mongoose.connect(
  "mongodb://root:example@localhost:27017/mystery?authSource=admin",
  {},
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin (frontend) to make requests
  }),
);
app.use(express.json()); // Middleware to parse JSON requests

app.get("/", (req, res) => {
  console.log("HELLO");
  res.send("Hello from Express!");
});
app.use("/chat", chatRoute);
app.use("/mystery", mysteryRoute);
app.use("/progress", progressRoute);
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
