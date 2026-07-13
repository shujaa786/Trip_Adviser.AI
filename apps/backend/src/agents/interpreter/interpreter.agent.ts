import { ProviderFactory } from "../../providers";
import { TripRequest } from "../../dto/request/trip-request.dto";

import { INTERPRETER_PROMPT } from "./interpreter.prompt";

export class InterpreterAgent {
  constructor(private readonly providerFactory: ProviderFactory) {}

  async interpret(message: string): Promise<TripRequest> {
    const prompt = `
${INTERPRETER_PROMPT}

User Request

${message}
`;

    const primary = this.providerFactory.getPrimaryProvider();

    try {
      return await primary.generateStructured<TripRequest>(prompt);
    } catch (error) {
      console.warn("Interpreter fallback...", error);

      const fallback = this.providerFactory.getFallbackProvider();

      return fallback.generateStructured<TripRequest>(prompt);
    }
  }
}
