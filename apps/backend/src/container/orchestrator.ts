import { AIOrchestrator } from "../orchestrator";

import { contextManager, executionPlanner, executionEngine } from "./workflow";

export const orchestrator = new AIOrchestrator(
  contextManager,
  executionPlanner,
  executionEngine,
);
