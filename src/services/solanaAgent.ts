import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as dotenv from "dotenv";
import bs58 from "bs58";

dotenv.config();

export class SolanaAgent {
  private agent: any;
  private config: any;

  constructor() {
    this.config = { configurable: { thread_id: "Solana Agent Kit!" } };
  }

  async initialize(privateKey: string) {
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    // Use the provided private key
    const solanaKit = new SolanaAgentKit(privateKey, process.env.RPC_URL!, {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    });

    const tools = createSolanaTools(solanaKit);
    const memory = new MemorySaver();

    this.agent = await createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
    });
  }

  async processMessage(message: string): Promise<string> {
    if (!this.agent) {
      throw new Error("Agent not initialized. Please call initialize method first.");
    }

    let response = "";
    const stream = await this.agent.stream(
      {
        messages: [new HumanMessage(message)],
      },
      this.config,
    );

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        response += chunk.agent.messages[0].content;
      } else if ("tools" in chunk) {
        response += chunk.tools.messages[0].content;
      }
    }

    return response;
  }
}
