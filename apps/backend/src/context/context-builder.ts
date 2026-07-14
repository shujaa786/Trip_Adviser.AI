import { randomUUID } from "crypto";

import { ExecutionStatus } from "../core/execution-status";
import { WorkflowContext } from "../core/workflow-context";
import { TripRequest } from "../dto/request/trip-request.dto";

type WorkflowRequest = WorkflowContext["request"];

export class ContextBuilder {
  build(request: TripRequest): WorkflowContext {
    let days = request.days ?? undefined;

    if (days == null && request.startDate && request.endDate) {
      const start = new Date(request.startDate);
      const end = new Date(request.endDate);

      days =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;
    }

    if (days == null || Number.isNaN(days) || days <= 0) {
      days = 5;
    }

    const normalizedRequest = this.buildNormalizedRequest(request, days);

    return {
      request: normalizedRequest,

      execution: {
        workflowId: randomUUID(),
        status: ExecutionStatus.PENDING,
        startedAt: new Date(),
      },

      state: {},

      response: {},

      metadata: {
        retries: 0,
        fallbackUsed: false,
      },
    };
  }

  private buildNormalizedRequest(
    request: TripRequest,
    days: number,
  ): WorkflowRequest {
    return {
      source: request.source,
      destination: request.destination,
      days,
      budget: request.budget,
      travelers: request.travelers,
      interests: request.interests,
    };
  }
}
