import { GeminiProvider } from "./gemini.provider";
import { GroqProvider } from "./groq.provider";
import { LLMProvider } from "./llm-provider";

export class ProviderFactory {
  private readonly primaryProvider: LLMProvider;
  private readonly fallbackProvider: LLMProvider;

  constructor() {
    this.primaryProvider = new GeminiProvider();
    this.fallbackProvider = new GroqProvider();
  }

  getPrimaryProvider(): LLMProvider {
    return this.primaryProvider;
  }

  getFallbackProvider(): LLMProvider {
    return this.fallbackProvider;
  }
}
