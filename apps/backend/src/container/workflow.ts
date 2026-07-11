import { ContextManager } from "../context";
import { ExecutionPlanner } from "../workflow/execution-planner";
import { ExecutionEngine } from "../workflow/execution-engine";

import { registry } from "./agents";

export const contextManager = new ContextManager();

export const executionPlanner = new ExecutionPlanner();

export const executionEngine = new ExecutionEngine(registry);
