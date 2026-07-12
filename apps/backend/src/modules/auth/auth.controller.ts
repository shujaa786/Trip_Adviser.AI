import { Request, Response } from "express";

import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    const result = await this.authService.register(
      req.body.name,
      req.body.email,
      req.body.password,
    );

    res.status(201).json({
      success: true,
      ...result,
    });
  }

  async login(req: Request, res: Response) {
    const result = await this.authService.login(
      req.body.email,
      req.body.password,
    );

    res.json({
      success: true,
      ...result,
    });
  }

  async me(req: Request, res: Response) {
    const user = await this.authService.me(req.user.id);

    res.json({
      success: true,
      user,
    });
  }
}
