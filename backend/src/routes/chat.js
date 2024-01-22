import { Router } from "express";
import { config } from "dotenv";

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { INVESTIGATE_PROMPT, MYSTERIES } from "../data";

config();

const router = Router();

router.post(
  "/:mysteries/:mysteryId/locations/:locationIndex",
  async (req, res) => {
    const mysteryId = req.params.mysteryId;
    const locationIndex = req.params.locationIndex;
    const location = MYSTERIES[mysteryId].locations[locationIndex];
    try {
      const vectorStore = await HNSWLib.fromDocuments(
        location.context.map((item) => new Document({ pageContent: item })),
        new OpenAIEmbeddings()
      );
      const retriever = vectorStore.asRetriever(1);

      const prompt = ChatPromptTemplate.fromMessages(INVESTIGATE_PROMPT);
      const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
      const outputParser = new StringOutputParser();

      const setupAndRetrieval = RunnableMap.from({
        context: new RunnableLambda({
          func: (input) =>
            retriever.invoke(input).then((response) => response[0].pageContent),
        }).withConfig({ runName: "contextRetriever" }),
        question: new RunnablePassthrough(),
      });
      const chain = setupAndRetrieval
        .pipe(prompt)
        .pipe(model)
        .pipe(outputParser);

      let response = await chain.invoke(req.body.message);
      const clue = response.startsWith("CLUE: ");
      if (clue) {
        response = response.substring("CLUE: ".length);
        console.log(response);
      }

      res.send({ response, clue });
    } catch (error) {
      res
        .status(500)
        .send(`Error generating chat response: ${error.toString()}`);
    }
  }
);

export default router;
