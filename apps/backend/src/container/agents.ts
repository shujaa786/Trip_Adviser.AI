import { BudgetAgent } from "../agents/budget.agent";
import { DestinationAgent } from "../agents/destination.agent";
import { ItineraryAgent } from "../agents/itinerary.agent";

import { AgentRegistry } from "../registry";
import { llmService } from "./services";

export const registry = new AgentRegistry();

registry.register(new DestinationAgent(llmService));

registry.register(new ItineraryAgent(llmService));

registry.register(new BudgetAgent(llmService));
