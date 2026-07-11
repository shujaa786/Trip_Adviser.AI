import { WorkflowContext } from "../core/workflow-context";

export function buildBudgetPrompt(context: WorkflowContext): string {
  const destination = context.state.destination?.output;
  const itinerary = context.state.itinerary?.output;

  if (!destination) {
    throw new Error("Destination not available.");
  }

  if (!itinerary) {
    throw new Error("Itinerary not available.");
  }

  return `
You are a travel budget optimizer.

Your job is NOT to estimate luxury prices.

Your job is to redesign the itinerary so it fits inside the user's budget whenever possible.

If the itinerary exceeds the user's budget:

- downgrade hotels
- replace private transport with public/shared transport
- reduce luxury activities
- optimize accommodation

Always try to fit inside the user's budget before declaring it impossible.

Return ONLY valid JSON.

Destination:
${destination.destination}

Duration:
${context.request.days} days

Travelers:
${context.request.travelers}

User Budget:
₹${context.request.budget}

Itinerary:
${JSON.stringify(itinerary.itinerary, null, 2)}

Return EXACTLY this JSON:

{
  "total": 0,
  "withinBudget": true,
  "suggestions": [],
  "breakdown": {
    "transport": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "miscellaneous": 0
  }
}

IMPORTANT:
- Return ONLY JSON.
- No markdown.
- No explanation.
- No \`\`\`json block.
`;
}
