import z from "zod";

export const boardSchema = z.object({
  name: z
    .string()
    .min(1, "Board name is required")
    .max(50, "Exceeded maximum character limit of 50"),
  description: z
    .string()
    .max(200, "Exceeded maximum character limit of 200")
    .optional(),
});
