import { WorkflowContext } from "../core/workflow-context";

export function buildTripPrompt(context: WorkflowContext): string {
  return `
You are an expert travel planner.

Source:
${context.request.source}

Destination:
${context.request.destination ?? "Suggest best destination"}

Days:
${context.request.days}

Budget:
₹${context.request.budget}

Travelers:
${context.request.travelers}

Interests:
${(context.request.interests ?? []).join(", ")}

Generate an itinerary.
`;
}
