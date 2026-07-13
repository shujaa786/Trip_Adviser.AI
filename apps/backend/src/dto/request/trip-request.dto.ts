import { z } from "zod";

export const TripRequestSchema = z
  .object({
    source: z.string().min(2),

    destination: z.string().optional(),

    startDate: z.string().nullable().optional(),

    endDate: z.string().nullable().optional(),

    days: z.number().positive().optional(),

    budget: z.number().positive(),

    travelers: z.number().positive().default(1),

    interests: z.array(z.string()).default([]),

    preferences: z
      .object({
        hotelCategory: z.enum(["budget", "standard", "luxury"]).optional(),

        transport: z
          .enum(["bike", "car", "train", "flight"])
          .nullable()
          .optional(),

        accommodationType: z.string().nullable().optional(),
        foodPreference: z.string().nullable().optional(),
        accessibilityNeeds: z.string().nullable().optional(),
      })
      .optional(),
  })
  .refine((data) => !!data.days || (!!data.startDate && !!data.endDate), {
    message: "Provide either days OR startDate & endDate",
  });

export type TripRequest = z.infer<typeof TripRequestSchema>;
