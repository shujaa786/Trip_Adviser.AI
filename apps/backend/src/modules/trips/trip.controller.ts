import { Request, Response } from "express";

import { TripService } from "./trip.service";

export class TripController {
  constructor(private readonly tripService: TripService) {}

  async getTrips(req: Request, res: Response) {
    const trips = await this.tripService.findUserTrips(req.user.id);

    res.json({
      success: true,
      trips,
    });
  }

  async getTrip(req: Request, res: Response) {
    const id = String(req.params.id);
    const trip = await this.tripService.findTripById(id, req.user.id);

    res.json({
      success: true,
      trip,
    });
  }

  async deleteTrip(req: Request, res: Response) {
    const id = String(req.params.id);
    await this.tripService.deleteTrip(id, req.user.id);

    res.json({
      success: true,
      message: "Trip deleted successfully.",
    });
  }
}
