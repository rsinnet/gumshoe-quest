import { Schema, model } from "mongoose";

import UserClueProgress from "./UserClueProgress";

const userLocationProgressSchema = new Schema({
  clues: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserClueProgress" }],
});

export default model("UserLocationProgress", userLocationProgressSchema);
