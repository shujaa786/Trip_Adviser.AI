import { WorkflowContext } from "../core/workflow-context";
import { TripPlanResponse } from "../dto/response";

export class ResponseComposer {
  compose(context: WorkflowContext): TripPlanResponse {
    if (
      !context.state.destination?.output ||
      !context.state.itinerary?.output ||
      !context.state.budget?.output
    ) {
      throw new Error("Workflow completed without all agent outputs.");
    }

    return {
      success: true,

      trip: {
        destination: context.state.destination.output,

        itinerary: context.state.itinerary.output,

        budget: context.state.budget.output,
      },

      execution: {
        workflowId: context.execution.workflowId,

        status: context.execution.status,
      },

      metadata: {
        provider: context.metadata.provider,
        model: context.metadata.model,
        fallbackUsed: context.metadata.fallbackUsed,
      },
    };
  }
}
