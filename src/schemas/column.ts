import z from "zod";

export const columnSchema = z.object({
  name: z
    .string()
    .min(1, "Column name is required")
    .max(30, "Exceeded maximum character limit of 30"),
  wipLimit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .nullable()
    .optional()
    .transform((val) => val ?? ""),
});
