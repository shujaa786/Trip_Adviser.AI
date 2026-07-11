export interface LLMProvider {
  readonly name: string;

  readonly model: string;

  generateStructured<T>(prompt: string): Promise<T>;
}
