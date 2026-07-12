import { Prisma } from "../../../generated/prisma";
import { TripRequest } from "../../dto/request/trip-request.dto";
import { TripPlanResponse } from "../../dto/response/trip-plan.response";
import { prisma as db } from "../../container";

export class TripRepository {
  async createTrip(
    userId: string,
    request: TripRequest,
    response: TripPlanResponse,
  ) {
    return db.trip.create({
      data: {
        userId,
        destination: response.trip.destination.destination,

        startDate: request.startDate ? new Date(request.startDate) : null,

        endDate: request.endDate ? new Date(request.endDate) : null,

        budget: request.budget,

        travelers: request.travelers ?? 1,

        status: "COMPLETED",

        request: request as unknown as Prisma.JsonObject,

        response: response as unknown as Prisma.JsonObject,
      },
    });
  }

  async findUserTrips(userId: string) {
    return db.trip.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findTripById(id: string, userId: string) {
    return db.trip.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteTrip(id: string, userId: string) {
    return db.trip.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
