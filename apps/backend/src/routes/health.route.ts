import { Router } from "express";
import { successResponse } from "../utils/api-response";

const router = Router();

router.get("/", (_, res) => {
  res.json(
    successResponse("API is healthy", {
      service: "Trip Adviser AI",
      timestamp: new Date().toISOString(),
    }),
  );
});

export default router;
