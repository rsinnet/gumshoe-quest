import { Schema, model } from "mongoose";

import LocationProgress from "./LocationProgress";

const MysteryProgressSchema = new Schema({
  userId: String,
  mysteryId: String,
  locations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LocationProgress" },
  ],
});

export default model("MysteryProgress", mysteryProgressSchema);
