import { AgentResult } from "./agent-result";
import { ExecutionStatus } from "./execution-status";
import { DestinationResult, ItineraryResult, BudgetResult } from "../domain";

export interface WorkflowContext {
  request: {
    source?: string | null;
    destination?: string | null;
    days?: number | null;
    budget?: number | null;
    travelers?: number | null;
    interests?: string[] | null;
  };

  execution: {
    workflowId: string;

    status: ExecutionStatus;

    startedAt: Date;

    completedAt?: Date;
  };

  /**
   * Shared mutable workflow state.
   * Every agent reads from here and writes only its own output.
   */
  state: {
    destination?: AgentResult<DestinationResult>;

    itinerary?: AgentResult<ItineraryResult>;

    budget?: AgentResult<BudgetResult>;
  };

  /**
   * Final API response.
   */
  response: {
    finalResponse?: unknown;
  };

  metadata: {
    provider?: string;
    model?: string;
    retries: number;
    fallbackUsed: boolean;
  };
}
