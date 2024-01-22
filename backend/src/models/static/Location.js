import { Schema, model } from "mongoose";

import Clue from "./static/Clue";
import Context from "./static/Context";

const locationSchema = new Schema({
  locationId: String,
  name: String,
  prompt: String,
  context: [{ type: mongoose.Schema.Types.ObjectId, ref: "Context" }],
  clue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clue " }],
});

export default model("Location", locationSchema);
