import { Router } from "express";
import Mystery from "../models/static/Mystery.js";
import MysteryProgress from "../models/dynamic/MysteryProgress.js";

const router = Router();

router.get("/mysteries/:mysteryId", async (req, res) => {
  console.log("Fetching mystery data...");
  try {
    // TODO: Handle userId.
    // const userId = req.params.userId;
    const mysteryId = req.params.mysteryId;

    console.log(`Looking up mystery by ID: ${mysteryId}`);
    const mystery = await Mystery.findById(mysteryId);
    if (!mystery) {
      console.log(`Mystery ID not found: ${mysteryId}`);
      res.status(404).send(`Mystery ID not found: ${mysteryId}`);
      return;
    }
    console.log(`Returning mystery for mysteryId: ${mysteryId}`);
    res.send(mystery);
  } catch (error) {
    res.status(500).send(`Error fetching mystery data: ${error.toString()}`);
  }
});

export default router;
