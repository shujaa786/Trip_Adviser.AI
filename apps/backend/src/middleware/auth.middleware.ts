import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authorization.substring(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    req.user = {
      id: payload.userId,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
