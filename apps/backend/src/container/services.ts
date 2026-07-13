import { LLMService } from "../services/llm.service";
import { ProviderFactory } from "../providers/provider-factory";
import { InterpreterAgent } from "../agents/interpreter/interpreter.agent";

/**
 * Shared application services.
 */

export const providerFactory = new ProviderFactory();

export const llmService = new LLMService(providerFactory);

export const interpreterAgent = new InterpreterAgent(providerFactory);
