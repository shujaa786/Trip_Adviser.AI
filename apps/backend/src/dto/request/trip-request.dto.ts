import { z } from "zod";

export const TripRequestSchema = z
  .object({
    source: z.string().optional().nullable(),
    destination: z.string().optional().nullable(),
    budget: z.number().optional().nullable(),
    days: z.number().optional().nullable(),
    travelers: z.number().optional().nullable(),
    interests: z.array(z.string()).optional().nullable(),
    startDate: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),

    preferences: z
      .object({
        accommodation: z.string().optional().nullable(),
        transport: z.string().optional().nullable(),
        foodPreference: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  })
  .passthrough();
// .refine((data) => !!data.days || (!!data.startDate && !!data.endDate), {
//   message: "Provide either days OR startDate & endDate",
// });

export type TripRequest = z.infer<typeof TripRequestSchema>;
