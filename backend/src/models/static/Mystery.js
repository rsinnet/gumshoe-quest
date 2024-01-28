import { Schema, model } from "mongoose";

const mysterySchema = new Schema({
  name: { type: String, unique: true },
  synopsis: String,
  locations: [
    {
      name: String,
      prompt: String,
      context: [String],
      clues: [String],
      misleadingClues: [String],
    },
  ],
});

export default model("Mystery", mysterySchema);
