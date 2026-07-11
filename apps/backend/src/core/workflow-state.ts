export interface DestinationState {
  destination: string;
  reason: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
}

export interface ItineraryState {
  days: DayPlan[];
}

export interface BudgetState {
  total: number;

  accommodation: number;

  transport: number;

  food: number;

  activities: number;

  misc: number;
}
