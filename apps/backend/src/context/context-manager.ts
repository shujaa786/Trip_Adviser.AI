import { WorkflowContext } from "../core/workflow-context";
import { ContextBuilder } from "./context-builder";

import { RequestValidator } from "./request-validator";

export class ContextManager {
  private readonly validator = new RequestValidator();

  private readonly builder = new ContextBuilder();
  create(payload: unknown): WorkflowContext {
    const request = this.validator.validate(payload);

    return this.builder.build(request);
  }
}
