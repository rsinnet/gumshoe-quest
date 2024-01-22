import { Schema, model } from "mongoose";

const clueSchema = new Schema({
  id: Number,
  description: String,
});

export default model("Clue", clueSchema);
