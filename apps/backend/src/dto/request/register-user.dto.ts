import { z } from "zod";

export const RegisterUserDto = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export type RegisterUserDto = z.infer<typeof RegisterUserDto>;
