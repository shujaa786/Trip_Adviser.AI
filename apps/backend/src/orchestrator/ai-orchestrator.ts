import { WorkflowContext } from "../core/workflow-context";
import { ContextManager } from "../context";
import { ExecutionPlanner } from "../workflow";
import { ExecutionEngine } from "../workflow/execution-engine";

export class AIOrchestrator {
  constructor(
    private readonly contextManager: ContextManager,
    private readonly planner: ExecutionPlanner,
    private readonly engine: ExecutionEngine,
  ) {}

  async execute(payload: unknown): Promise<WorkflowContext> {
    const context = this.contextManager.create(payload);

    const plan = this.planner.createPlan(context);

    return await this.engine.execute(context, plan);
  }
}
