import { z } from "zod";

export const ChatRequestSchema = z.object({
  message: z.string().trim().min(5, "Message is required."),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
