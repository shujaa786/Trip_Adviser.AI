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
  Original User Request


Structured Context

${JSON.stringify(context.request, null, 2)}
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

Budget calculation MUST use the itinerary above.

Never create another itinerary.

Never change destination.

Never assume luxury hotels unless itinerary contains them.

Return ONLY valid JSON in this format:

{
  "total": 46500,
  "withinBudget": true,
  "suggestions": [],
  "breakdown": {
    "transport": 6000,
    "accommodation": 21000,
    "food": 9000,
    "activities": 8000,
    "miscellaneous": 2500
  }
}

Rules

- All monetary values MUST be realistic INR estimates.
- Never return 0 unless the cost is actually zero.
- If itinerary estimatedCost values exist, use them.
- Otherwise estimate yourself.
- Total MUST equal the sum of the breakdown.
- Return ONLY JSON.

IMPORTANT:
- Return ONLY JSON.
- No markdown.
- No explanation.
- No \`\`\`json block.
`;
}
