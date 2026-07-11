import { ExecutionStatus } from "./execution-status";

export interface AgentResult<T> {
  agent: string;

  status: ExecutionStatus;

  startedAt: Date;

  completedAt?: Date;

  output?: T;

  error?: string;

  executionTimeMs?: number;
}
