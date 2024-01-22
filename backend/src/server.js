import cors from "cors";
import express from "express";
import chatRoute from "./routes/chat.js";
// import speechRoute from "./routes/speech.js";
process.env.GOOGLE_CLOUD_PROJECT = "";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin (frontend) to make requests
  })
);
app.use(express.json()); // Middleware to parse JSON requests

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use("/api/chat", chatRoute);
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
