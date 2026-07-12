import { Router } from "express";
import { TripController } from "../controllers/trip.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new TripController();

router.post("/plan", authMiddleware, controller.plan.bind(controller));

export default router;
