import { TripController, TripRepository, TripService } from "../modules/trips";

const tripRepository = new TripRepository();

export const tripService = new TripService(tripRepository);

export const tripModuleController = new TripController(tripService);
