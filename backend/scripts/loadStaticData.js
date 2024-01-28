import mongoose from "mongoose";
import Mystery from "../src/models/static/Mystery.js";
import MysteryProgress from "../src/models/dynamic/MysteryProgress.js";

import fs from "fs";
import yaml from "js-yaml";

console.log("Connecting to MongoDB...");
await mongoose.connect(
  "mongodb://root:example@localhost:27017/mystery?authSource=admin",
  {},
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const fetchSourceData = () => {
  const fileContents = fs.readFileSync("./scripts/mvp.yaml", "utf8");
  const data = yaml.load(fileContents);
  return data;
};

const loadData = async (mysteries) => {
  try {
    let results = [];
    for (const mystery of mysteries) {
      const result = await Mystery.findOneAndUpdate(
        { name: mystery.name },
        mystery,
        {
          upsert: true,
          new: true,
        },
      );
      results.push(result);
      console.log("Mystery saved:", result);
    }
    return results;
  } catch (err) {
    console.error(err);
  }
};

const createUserProgress = async (userId, mystery) => {
  try {
    const mysteryProgress = new MysteryProgress({
      userId: userId,
      mystery: mystery,
      locations: mystery.locations.map((location, index) => {
        return {
          discovered: index == 0,
          clues: location.clues.map((clue) => false),
          misleadingClues: location.misleadingClues.map((misleading) => false),
        };
      }),
    });
    await mysteryProgress.save();
    console.log("Mystery progress saved:", mysteryProgress);
  } catch (err) {
    console.error(err);
  }
};

console.log("Loading static data...");
const data = fetchSourceData();
console.log("Loaded static data.");
const mysteries = await loadData(data.mysteries);
await createUserProgress("user1", mysteries[0]);
await mongoose.disconnect();
