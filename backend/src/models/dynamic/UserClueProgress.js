import { Schema, model } from "mongoose";

const userClueProgressSchema = new Schema({
  discovered: Boolean,
});
export default model("UserClueProgress", userClueProgressSchema);
