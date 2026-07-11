import { BudgetResult, DestinationResult, ItineraryResult } from "../../domain";

export interface TripPlanResponse {
  success: boolean;

  trip: {
    destination: DestinationResult;

    itinerary: ItineraryResult;

    budget: BudgetResult;
  };

  execution: {
    workflowId: string;

    status: string;
  };

  metadata: {
    provider?: string;
    fallbackUsed?: boolean;

    model?: string;
  };
}
