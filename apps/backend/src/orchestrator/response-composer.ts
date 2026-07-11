import { WorkflowContext } from "../core/workflow-context";

export class ResponseComposer {
  compose(context: WorkflowContext) {
    return {
      workflowId: context.execution.workflowId,

      status: context.execution.status,

      result: context.response,
    };
  }
}
