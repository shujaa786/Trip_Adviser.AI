import { Request, Response } from "express";

import { orchestrator, responseComposer } from "../container";

export class TripController {
  plan = async (req: Request, res: Response) => {
    const context = await orchestrator.execute(req.body);
    const response = responseComposer.compose(context);

    res.json(response);
  };
}
