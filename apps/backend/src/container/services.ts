import { LLMService } from "../services/llm.service";
import { ProviderFactory } from "../providers/provider-factory";
/**
 * Shared application services.
 * This is the application's composition root.
 */
const providerFactory = new ProviderFactory();

export const llmService = new LLMService(providerFactory);
