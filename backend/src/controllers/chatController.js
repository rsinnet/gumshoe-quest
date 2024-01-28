import { config } from "dotenv";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { INVESTIGATE_PROMPT } from "../data.js";

config();

const investigateLocation = async (progress, locationIndex, message) => {
  const location = progress.mystery.locations[locationIndex];
  console.log("Got location: ", location);

  const context = Array.prototype.concat(
    location.context,
    location.clues.map((clue) => `CLUE: ${clue}`),
    location.misleadingClues.map((clue) => `MIS: ${clue}`),
  );
  const vectorStore = await HNSWLib.fromDocuments(
    context.map((item) => new Document({ pageContent: item })),
    new OpenAIEmbeddings(),
  );
  const retriever = vectorStore.asRetriever(1);

  const prompt = ChatPromptTemplate.fromMessages(INVESTIGATE_PROMPT);
  const model = new ChatOpenAI({ modelName: "gpt-4" });
  const outputParser = new StringOutputParser();

  const setupAndRetrieval = RunnableMap.from({
    context: new RunnableLambda({
      func: (input) =>
        retriever.invoke(input).then((response) => response[0].pageContent),
    }).withConfig({ runName: "contextRetriever" }),
    question: new RunnablePassthrough(),
  });
  const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);

  let response = await chain.invoke(message);
  if (response === undefined) {
    console.log("Undefined response for message: ", message);
  }

  const clue = response.startsWith("CLUE: ");
  if (clue) {
    response = response.substring("CLUE: ".length);
  }
  const misleadingClue = response.startsWith("MIS: ");
  if (misleadingClue) {
    response = response.substring("MIS: ".length);
  }
  return { response, clue, misleadingClue };
};
export default investigateLocation;
