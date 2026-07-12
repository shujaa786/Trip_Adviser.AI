import { TripRequest } from "../../dto/request/trip-request.dto";
import { TripPlanResponse } from "../../dto/response/trip-plan.response";
import { TripRepository } from "./trip.repository";

export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createTrip(
    userId: string,
    request: TripRequest,
    response: TripPlanResponse,
  ) {
    return this.tripRepository.createTrip(userId, request, response);
  }

  async findUserTrips(userId: string) {
    return this.tripRepository.findUserTrips(userId);
  }

  async findTripById(id: string, userId: string) {
    return this.tripRepository.findTripById(id, userId);
  }

  async deleteTrip(id: string, userId: string) {
    return this.tripRepository.deleteTrip(id, userId);
  }
}
