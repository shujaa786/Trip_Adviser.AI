import bcrypt from "bcrypt";

import { prisma } from "../../container";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
