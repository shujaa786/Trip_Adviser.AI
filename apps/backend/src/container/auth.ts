import { AuthController } from "../modules/auth/auth.controller";
import { AuthService } from "../modules/auth/auth.service";
import { userService } from "./users";

export const authService = new AuthService(userService);
export const authController = new AuthController(authService);
