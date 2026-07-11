export interface BudgetBreakdown {
  transport: number;

  accommodation: number;

  food: number;

  activities: number;

  miscellaneous: number;
}

export interface BudgetResult {
  total: number;

  breakdown: BudgetBreakdown;

  withinBudget: boolean;

  suggestions: string[];
}
