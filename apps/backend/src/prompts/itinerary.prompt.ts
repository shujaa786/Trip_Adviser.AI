import { WorkflowContext } from "../core/workflow-context";

export function buildItineraryPrompt(context: WorkflowContext): string {
  const destination = context.state.destination?.output;

  if (!destination) {
    throw new Error("Destination not available.");
  }

  return `
You are an expert travel planner.

Create a detailed travel itinerary.

Return ONLY valid JSON.

Destination:
${destination.destination}

Days:
${context.request.days}

Budget:
${context.request.budget}

Interests:
${context.request.interests.join(", ")}

Return EXACTLY this schema:

{
  "itinerary":[
    {
      "day":1,
      "title":"",
      "description":"",
      "activities":[],
      "transport":"",
      "accommodation":"",
      "estimatedCost":0
    }
  ]
}
`;
}
