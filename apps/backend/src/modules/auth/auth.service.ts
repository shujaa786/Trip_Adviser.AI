import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserService } from "../users";
import { env } from "../../config/env";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(name: string, email: string, password: string) {
    const user = await this.userService.createUser(name, email, password);

    const token = jwt.sign(
      {
        userId: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return {
      user,
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async me(userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
