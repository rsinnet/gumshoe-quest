import { Router } from "express";
import investigateLocation from "../controllers/chatController.js";
import MysteryProgress from "../models/dynamic/MysteryProgress.js";
import { markClueAsDiscovered } from "../utils/.js";
const router = Router();

router.post(
  "/mysteries/:mysteryId/locations/:locationIndex",
  async (req, res) => {
    console.log("And here we are...");
    try {
      // const userId = req.params.userId;
      const userId = "user1";
      const mysteryId = req.params.mysteryId;
      const locationIndex = req.params.locationIndex;
      const message = req.body.message;

      // Fetch user progress
      const progress = await MysteryProgress.findOne({
        userId,
        mystery: mysteryId,
      }).populate("mystery");
      if (!progress) {
        // TODO(RWS): Add a new entry if not found.
        req
          .status(404)
          .send(`Mystery Progress not found: (${userId}, ${mysteryId})`);
        return;
      }

      const { response, clue, misleadingClue } = await investigateLocation(
        progress,
        locationIndex,
        message,
      );

      // If a clue is discovered, mark it as such.
      await markClueAsDiscovered(progress, locationIndex, response);

      res.send({ response, clue, misleadingClue });
    } catch (error) {
      console.log("Error fetching progress: ", error);
      res
        .status(500)
        .send(`Error generating chat response: ${error.toString()}`);
    }
  },
);

export default router;
