import {
  TripRequest,
  TripRequestSchema,
} from "../dto/request/trip-request.dto";

export class RequestValidator {
  validate(data: unknown): TripRequest {
    return TripRequestSchema.parse(data);
  }
}
