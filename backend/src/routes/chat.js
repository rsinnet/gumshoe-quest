import { Router } from "express";
import Mystery from "../models/static/Mystery";
import MysteryProgress from "../models/dynamic/MysteryProgress";
import investigateLocation from "../controllers/chatController";

router.post(
  "/:mysteries/:mysteryId/locations/:locationIndex",
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const mysteryId = req.params.mysteryId;

      const mystery = Mystery.findById(mysteryId);
      if (!mystery) {
        res.status(404).send(`Mystery ID not found: ${mysteryId}`);
        return;
      }

      const mysteryProgress = MysteryProgress.findOne({ userId, mysteryId });
      if (!mysteryProgress) {
        // TODO(RWS): Add a new entry if not found.
        req
          .status(404)
          .send(`Mystery Progress not found: (${userId}, ${mysteryId})`);
        return;
      }

      const { response, clue } = investigateLocation(
        mystery,
        mysteryProgress,
        locationIndex,
      );
      res.send({ response, clue });
    } catch (error) {
      res
        .status(500)
        .send(`Error generating chat response: ${error.toString()}`);
    }
  },
);

export default router;
