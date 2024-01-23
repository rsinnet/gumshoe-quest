import { Schema, model } from "mongoose";

const clueProgressSchema = new Schema({
  discovered: Boolean,
});
export default model("ClueProgress", clueProgressSchema);
