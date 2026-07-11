import { WorkflowContext } from "../core/workflow-context";

export function buildDestinationPrompt(context: WorkflowContext): string {
  const { request } = context;

  return `
You are an expert travel planner.

Recommend exactly ONE travel destination.
Recommend the BEST VALUE destination.

Avoid luxury-first planning.

Prioritize experiences.

Do not recommend destinations whose average trip cost exceeds 110% of the user's budget.
Return ONLY valid JSON.

IMPORTANT:
Do NOT use markdown.
Do NOT wrap the JSON inside triple backticks with json.
Do NOT explain anything.

Return exactly this schema:
{
  "destination": "",
  "reason": "",
  "bestSeason": "",
  "estimatedBudget": 0,
  "highlights": []
}

Traveler Details:

Source: ${request.source}
Budget: ${request.budget}
Days: ${request.days}
Travelers: ${request.travelers}
Interests: ${request.interests.join(", ")}
`;
}
