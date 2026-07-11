import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
