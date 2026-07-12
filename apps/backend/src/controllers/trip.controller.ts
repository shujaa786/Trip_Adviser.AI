import { Request, Response } from "express";

import { orchestrator, responseComposer, tripService } from "../container";

export class TripController {
  plan = async (req: Request, res: Response) => {
    const context = await orchestrator.execute(req.body);

    const response = responseComposer.compose(context);

    await tripService.createTrip(req.user.id, req.body, response);

    res.json(response);
  };
}
