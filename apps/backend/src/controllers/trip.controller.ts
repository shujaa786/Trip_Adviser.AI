import { Request, Response } from "express";

import {
  interpreterAgent,
  orchestrator,
  responseComposer,
  tripService,
} from "../container";
import { ChatRequestSchema } from "../dto/request/chat-request.dto";

export class TripController {
  plan = async (req: Request, res: Response) => {
    const chatRequest = ChatRequestSchema.parse(req.body);

    const tripRequest = await interpreterAgent.interpret(chatRequest.message);

    const context = await orchestrator.execute(tripRequest);

    const response = responseComposer.compose(context);

    await tripService.createTrip(req.user.id, tripRequest, response);

    res.json(response);
  };
}
