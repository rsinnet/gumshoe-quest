import { Schema, model } from "mongoose";

const mysteryProgressSchema = new Schema({
  userId: String,
  mystery: { type: Schema.Types.ObjectId, ref: "Mystery" },
  locations: [
    {
      discovered: Boolean,
      clues: [Boolean],
      misleadingClues: [Boolean],
    },
  ],
});

export default model("MysteryProgress", mysteryProgressSchema);
