import { WorkflowContext } from "../core/workflow-context";

export function buildItineraryPrompt(context: WorkflowContext): string {
  const destination = context.state.destination?.output;

  if (!destination) {
    throw new Error("Destination not available.");
  }

  return `
  Original User Request



Structured Context

${JSON.stringify(context.request, null, 2)}

You are an expert travel planner.

Create a detailed travel itinerary.

Return ONLY valid JSON.

Destination:
${destination.destination}
The destination has already been finalized.

Never replace it.

Never generate another destination.

The itinerary MUST stay completely inside this destination.

Days:
${context.request.days}

Budget:
${context.request.budget}

Interests:
${(context.request.interests ?? []).join(", ")}

Return ONLY valid JSON matching this structure:

{
  "itinerary":[
    {
      "day":1,
      "title":"string",
      "description":"string",
      "activities":["string"],
      "transport":"string",
      "accommodation":"string",
      "estimatedCost":3500
    }
  ]
}

Rules

- estimatedCost MUST be a realistic INR estimate.
- Include transport, meals, attraction tickets and local travel.
- Never return 0 unless the day is genuinely free.
- Standard hotels should cost between ₹2500–₹5000/night unless the user requested luxury.
- Return ONLY JSON.
`;
}
