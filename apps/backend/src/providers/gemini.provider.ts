import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { LLMProvider } from "./llm-provider";

export class GeminiProvider implements LLMProvider {
  readonly name = "Gemini";
  readonly model = env.GEMINI_MODEL;
  private readonly client = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async generateStructured<T>(prompt: string): Promise<T> {
    const result = await this.client.models.generateContent({
      model: env.GEMINI_MODEL,
      contents: prompt,
    });

    const text = (result.text ?? "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\bundefined\b/g, "null")
      .trim();

    return JSON.parse(text) as T;
  }
}
