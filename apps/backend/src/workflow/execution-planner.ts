import { WorkflowContext } from "../core/workflow-context";

import { buildSteps } from "./planner-rules";

import { ExecutionPlan } from "./execution-plan";

export class ExecutionPlanner {
  createPlan(context: WorkflowContext): ExecutionPlan {
    return {
      steps: buildSteps(context),
    };
  }
}
