import { WorkflowContext } from "../core/workflow-context";
import { WorkflowStep } from "./execution-plan";

export function buildSteps(context: WorkflowContext): WorkflowStep[] {
  const steps: WorkflowStep[] = [];

  if (!context.request.destination) {
    steps.push(WorkflowStep.DESTINATION);
  }

  steps.push(WorkflowStep.ITINERARY);

  steps.push(WorkflowStep.BUDGET);

  return steps;
}
