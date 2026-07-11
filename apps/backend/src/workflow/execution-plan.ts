export enum WorkflowStep {
  DESTINATION = "DESTINATION",
  ITINERARY = "ITINERARY",
  BUDGET = "BUDGET",
}

export interface ExecutionPlan {
  steps: WorkflowStep[];
}
