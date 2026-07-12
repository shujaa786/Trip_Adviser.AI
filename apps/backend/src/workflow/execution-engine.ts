import { BaseAgent } from "../agents";
import { ExecutionStatus } from "../core/execution-status";
import { WorkflowContext } from "../core/workflow-context";
import { BudgetResult, DestinationResult, ItineraryResult } from "../domain";
import { AgentRegistry } from "../registry";
import { ExecutionPlan } from "./execution-plan";
import { WorkflowStep } from "./execution-plan";

export class ExecutionEngine {
  constructor(private readonly registry: AgentRegistry) {}

  async execute(
    context: WorkflowContext,
    plan: ExecutionPlan,
  ): Promise<WorkflowContext> {
    context.execution.status = ExecutionStatus.RUNNING;

    try {
      for (const step of plan.steps) {
        const agent = this.registry.get(step);

        const _result = await agent.execute(context);

        switch (step) {
          case WorkflowStep.DESTINATION: {
            const agent = this.registry.get(
              step,
            ) as BaseAgent<DestinationResult>;

            context.state.destination = await agent.execute(context);
            break;
          }

          case WorkflowStep.ITINERARY: {
            const agent = this.registry.get(step) as BaseAgent<ItineraryResult>;

            context.state.itinerary = await agent.execute(context);
            break;
          }

          case WorkflowStep.BUDGET: {
            const agent = this.registry.get(step) as BaseAgent<BudgetResult>;

            context.state.budget = await agent.execute(context);
            break;
          }
        }
      }

      context.execution.status = ExecutionStatus.COMPLETED;
      context.execution.completedAt = new Date();

      context.response.finalResponse = {
        destination: context.state.destination,
        itinerary: context.state.itinerary,
        budget: context.state.budget,
      };

      return context;
    } catch (error) {
      context.execution.status = ExecutionStatus.FAILED;
      context.execution.completedAt = new Date();

      throw error;
    }
  }
}
