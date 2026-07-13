export interface ChatRequest {
  message: string;
}

export interface ExecutionInfo {
  workflowId: string;
  status: string;
  agentsExecuted: string[];
}

export interface MetadataInfo {
  provider: string;
  model: string;
  fallbackUsed: boolean;
}

export interface TripPlanResponse {
  destination: Record<string, unknown>;
  itinerary: Record<string, unknown>;
  budget: Record<string, unknown>;
}

export interface PlanTripApiResponse {
  trip: TripPlanResponse;
  execution: ExecutionInfo;
  metadata: MetadataInfo;
}
