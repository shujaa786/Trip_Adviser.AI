export interface DayPlan {
  day: number;

  title: string;

  description: string;

  activities: string[];

  accommodation?: string;

  transport?: string;

  estimatedCost: number;
}

export interface ItineraryResult {
  itinerary: DayPlan[];
}
