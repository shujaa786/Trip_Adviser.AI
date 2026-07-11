import { AgentResult } from "../core/agent-result";
import { WorkflowContext } from "../core/workflow-context";
import { WorkflowStep } from "../workflow";

export interface BaseAgent<T = unknown> {
  readonly step: WorkflowStep;

  execute(context: WorkflowContext): Promise<AgentResult<T>>;
}
