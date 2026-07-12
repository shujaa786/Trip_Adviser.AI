// import { Router } from "express";

// import { authMiddleware } from "../../middleware/auth.middleware";
// import { asyncHandler } from "../../utils/async-handler";

// import { TripController } from "./trip.controller";
// import { TripRepository } from "./trip.repository";
// import { TripService } from "./trip.service";

// const router = Router();

// const tripRepository = new TripRepository();
// const tripService = new TripService(tripRepository);
// const tripController = new TripController(tripService);

// router.get(
//   "/",
//   authMiddleware,
//   asyncHandler(tripController.getTrips.bind(tripController)),
// );

// router.get(
//   "/:id",
//   authMiddleware,
//   asyncHandler(tripController.getTrip.bind(tripController)),
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   asyncHandler(tripController.deleteTrip.bind(tripController)),
// );

// export default router;

import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";

import { TripController } from "./trip.controller";
import { TripRepository } from "./trip.repository";
import { TripService } from "./trip.service";

export const tripModuleRouter = Router();

const repository = new TripRepository();
const service = new TripService(repository);
const controller = new TripController(service);

tripModuleRouter.get(
  "/",
  authMiddleware,
  asyncHandler(controller.getTrips.bind(controller)),
);

tripModuleRouter.get(
  "/:id",
  authMiddleware,
  asyncHandler(controller.getTrip.bind(controller)),
);

tripModuleRouter.delete(
  "/:id",
  authMiddleware,
  asyncHandler(controller.deleteTrip.bind(controller)),
);
