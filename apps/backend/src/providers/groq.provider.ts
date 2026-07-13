import Groq from "groq-sdk";
import { LLMProvider } from "./llm-provider";
import { env } from "../config/env";

const client = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export class GroqProvider implements LLMProvider {
  readonly name = "Groq";
  readonly model = env.GROQ_MODEL;
  async isAvailable() {
    return true;
  }
  async generateStructured<T>(prompt: string): Promise<T> {
    const completion = await client.chat.completions.create({
      model: env.GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = (completion.choices[0]?.message?.content ?? "{}")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\bundefined\b/g, "null")
      .trim();

    return JSON.parse(text) as T;
  }
}
