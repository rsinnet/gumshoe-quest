import mongoose from "mongoose";
import Mystery from "../src/models/static/Mystery.js";

await mongoose.connect(
  "mongodb://root:example@localhost:27017/mystery?authSource=admin",
  {},
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const fetchData = async (name) => {
  try {
    const mystery = await Mystery.findOne({ name: name });
    return mystery;
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

const data = await fetchData("The Case of the Missing Manuscript");
console.log(data.toJSON());
