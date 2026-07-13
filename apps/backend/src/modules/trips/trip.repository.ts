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
    const trips = await db.trip.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return trips.map((trip) => {
      const request = trip.request as Prisma.JsonObject;

      const source = String(request.source ?? "");

      const destination = String(request.destination ?? "");

      let title = "Untitled Trip";

      if (source && destination) {
        title = `${source} → ${destination}`;
      } else if (destination) {
        title = destination;
      } else if (source) {
        title = source;
      }

      return {
        id: trip.id,
        title,
        createdAt: trip.createdAt,
      };
    });
  }

  async findTripById(id: string, userId: string) {
    const trip = await db.trip.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!trip) {
      return null;
    }

    return {
      id: trip.id,
      request: trip.request,
      trip: (trip.response as Prisma.JsonObject).trip,
      execution: (trip.response as Prisma.JsonObject).execution,
      metadata: (trip.response as Prisma.JsonObject).metadata,
      createdAt: trip.createdAt,
    };
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
