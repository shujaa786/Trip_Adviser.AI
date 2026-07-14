import { WorkflowContext } from "../core/workflow-context";

export function buildDestinationPrompt(context: WorkflowContext): string {
  const { request } = context;

  return `
  Original User Request


Structured Context

${JSON.stringify(context.request, null, 2)}

You are a destination enrichment agent.

IMPORTANT

The destination has ALREADY been selected by another AI.

DO NOT recommend another destination.

DO NOT replace it.

DO NOT optimize it.

Your ONLY responsibility is enriching the given destination.

Destination

${request.destination}

Source

${request.source}

Trip Duration

${request.days} days

Travelers

${request.travelers}

Budget

₹${request.budget}

Interests

${(request.interests ?? []).join(", ")}

Return ONLY valid JSON.

Schema

{
  "destination":"",
  "reason":"",
  "bestSeason":"",
  "estimatedBudget":number,
  "highlights":[]
}

Rules

- destination MUST remain exactly "${request.destination}"

- Never change destination.

- Never suggest another place.

- Never add markdown.

- Output ONLY JSON.
`;
}
