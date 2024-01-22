import { Schema, model } from "mongoose";

const contextSchema = new Schema({
  id: Number,
  description: String,
});

export default model("Context", contextSchema);
