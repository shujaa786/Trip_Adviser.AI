import { WorkflowContext } from "../core/workflow-context";
import { WorkflowStep } from "./execution-plan";

export function buildSteps(_context: WorkflowContext): WorkflowStep[] {
  return [
    WorkflowStep.DESTINATION,
    WorkflowStep.ITINERARY,
    WorkflowStep.BUDGET,
  ];
}
