import { Schema, model } from "mongoose";

import ClueProgress from "./ClueProgress";

const locationProgressSchema = new Schema({
  clues: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClueProgress" }],
});

export default model("LocationProgress", locationProgressSchema);
