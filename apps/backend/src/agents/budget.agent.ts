import { AgentResult } from "../core/agent-result";
import { ExecutionStatus } from "../core/execution-status";
import { WorkflowContext } from "../core/workflow-context";
import { BudgetResult } from "../domain";
import { buildBudgetPrompt } from "../prompts";
import { LLMService } from "../services/llm.service";
import { WorkflowStep } from "../workflow";
import { BaseAgent } from "./base-agent";

export class BudgetAgent implements BaseAgent<BudgetResult> {
  readonly step = WorkflowStep.BUDGET;

  constructor(private readonly llmService: LLMService) {}

  async execute(context: WorkflowContext): Promise<AgentResult<BudgetResult>> {
    const startedAt = new Date();

    try {
      const prompt = buildBudgetPrompt(context);

      const output = await this.llmService.generateStructured<BudgetResult>(
        prompt,
        context,
      );

      return {
        agent: "BudgetAgent",
        status: ExecutionStatus.COMPLETED,
        startedAt,
        completedAt: new Date(),
        output,
        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    } catch (error) {
      return {
        agent: "BudgetAgent",
        status: ExecutionStatus.FAILED,
        startedAt,
        completedAt: new Date(),
        error: error instanceof Error ? error.message : "Unknown Error",
        executionTimeMs: Date.now() - startedAt.getTime(),
      };
    }
  }
}
