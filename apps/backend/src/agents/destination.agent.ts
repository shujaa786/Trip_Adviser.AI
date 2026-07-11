import { AgentResult } from "../core/agent-result";
import { ExecutionStatus } from "../core/execution-status";
import { WorkflowContext } from "../core/workflow-context";
import { DestinationResult } from "../domain";
import { LLMService } from "../services/llm.service";
import { WorkflowStep } from "../workflow";
import { buildDestinationPrompt } from "../prompts";
import { BaseAgent } from "./base-agent";

export class DestinationAgent implements BaseAgent<DestinationResult> {
  readonly step = WorkflowStep.DESTINATION;

  constructor(private readonly llmService: LLMService) {}

  async execute(
    context: WorkflowContext,
  ): Promise<AgentResult<DestinationResult>> {
    const startedAt = new Date();

    try {
      const prompt = buildDestinationPrompt(context);

      const output =
        await this.llmService.generateStructured<DestinationResult>(
          prompt,
          context,
        );

      return {
        agent: "DestinationAgent",

        status: ExecutionStatus.COMPLETED,

        startedAt,

        completedAt: new Date(),

        output,

        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    } catch (error) {
      return {
        agent: "DestinationAgent",

        status: ExecutionStatus.FAILED,

        startedAt,

        completedAt: new Date(),

        error: error instanceof Error ? error.message : "Unknown Error",

        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    }
  }
}
