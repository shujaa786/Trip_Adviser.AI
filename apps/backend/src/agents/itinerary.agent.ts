import { AgentResult } from "../core/agent-result";
import { ExecutionStatus } from "../core/execution-status";
import { WorkflowContext } from "../core/workflow-context";
import { ItineraryResult } from "../domain";
import { LLMService } from "../services/llm.service";
import { WorkflowStep } from "../workflow";
import { buildItineraryPrompt } from "../prompts";
import { BaseAgent } from "./base-agent";

export class ItineraryAgent implements BaseAgent<ItineraryResult> {
  readonly step = WorkflowStep.ITINERARY;

  constructor(private readonly llmService: LLMService) {}

  async execute(
    context: WorkflowContext,
  ): Promise<AgentResult<ItineraryResult>> {
    const startedAt = new Date();

    try {
      const prompt = buildItineraryPrompt(context);

      const output = await this.llmService.generateStructured<ItineraryResult>(
        prompt,
        context,
      );

      return {
        agent: "ItineraryAgent",

        status: ExecutionStatus.COMPLETED,

        startedAt,

        completedAt: new Date(),

        output,

        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    } catch (error) {
      return {
        agent: "ItineraryAgent",

        status: ExecutionStatus.FAILED,

        startedAt,

        completedAt: new Date(),

        error: error instanceof Error ? error.message : "Unknown Error",

        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    }
  }
}
