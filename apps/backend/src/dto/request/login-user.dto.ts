import { z } from "zod";

export const LoginUserDto = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginUserDto = z.infer<typeof LoginUserDto>;
