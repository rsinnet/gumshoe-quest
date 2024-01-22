import { Schema, model } from "mongoose";

import Location from "./Location";

const mysterySchema = new Schema({
  mysteryId: String,
  mysteryName: String,
  synopsis: String,
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Context" }],
});

export default model("Mystery", mysterySchema);
