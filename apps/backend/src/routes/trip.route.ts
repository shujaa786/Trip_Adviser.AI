import { Router } from "express";
import { TripController } from "../controllers/trip.controller";

const router = Router();
const controller = new TripController();

router.post("/plan", controller.plan.bind(controller));

export default router;
