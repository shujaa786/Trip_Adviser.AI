import {
  TripRequest,
  TripRequestSchema,
} from "../dto/request/trip-request.dto";

export class RequestValidator {
  validate(data: unknown): TripRequest {
    const result = TripRequestSchema.safeParse(data);

    if (!result.success) {
      console.warn(
        "TripRequest validation failed. Continuing with raw AI response.",
        result.error.issues,
      );

      return data as TripRequest;
    }

    return result.data;
  }
}
