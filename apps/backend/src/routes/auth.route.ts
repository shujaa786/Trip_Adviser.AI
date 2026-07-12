import { Router } from "express";

import { authRouter } from "../modules/auth";

export const authRoute = Router();

authRoute.use("/auth", authRouter);
