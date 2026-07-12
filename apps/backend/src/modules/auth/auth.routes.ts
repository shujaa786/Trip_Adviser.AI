import { Router } from "express";

import { asyncHandler } from "../../utils/async-handler";

import { authController } from "../../container/auth";

export const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(authController.register.bind(authController)),
);

authRouter.post(
  "/login",
  asyncHandler(authController.login.bind(authController)),
);

authRouter.get("/me", asyncHandler(authController.me.bind(authController)));
