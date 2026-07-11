import { WorkflowContext } from "../core/workflow-context";
import { ProviderFactory } from "../providers";

export class LLMService {
  constructor(private readonly providerFactory: ProviderFactory) {}

  async generateStructured<T>(
    prompt: string,
    context: WorkflowContext,
  ): Promise<T> {
    const primary = this.providerFactory.getPrimaryProvider();

    try {
      context.metadata.provider = primary.name;
      context.metadata.model = primary.model;
      context.metadata.fallbackUsed = false;

      return await primary.generateStructured<T>(prompt);
    } catch (error) {
      console.warn("Primary provider failed. Falling back...", error);

      const fallback = this.providerFactory.getFallbackProvider();

      context.metadata.provider = fallback.name;
      context.metadata.model = fallback.model;
      context.metadata.fallbackUsed = true;
      context.metadata.retries++;

      return fallback.generateStructured<T>(prompt);
    }
  }
}
