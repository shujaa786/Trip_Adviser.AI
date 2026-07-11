import { BaseAgent } from "../agents";

import { WorkflowStep } from "../workflow";

export class AgentRegistry {
  private readonly agents = new Map<WorkflowStep, BaseAgent<unknown>>();

  register(agent: BaseAgent) {
    this.agents.set(agent.step, agent);
  }

  get(step: WorkflowStep): BaseAgent<unknown> {
    const agent = this.agents.get(step);

    if (!agent) {
      throw new Error(`Agent ${step} not found.`);
    }

    return agent;
  }
}
