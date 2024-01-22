import { Schema, model } from "mongoose";

import UserLocationProgress from "./UserLocationProgress";

const userMysteryProgressSchema = new Schema({
  mysteryId: String,
  locations, [{type: mongoose.Schema.Types.ObjectId, ref: "UserLocationProgress"}],
});

export default model("UserMysteryProgress", userMysteryProgressSchema);
