import z from "zod";
export const cardSchema = z.object({
  title: z
    .string()
    .min(1, "Column name is required")
    .max(100, "Exceeded maximum character limit of 30"),
  description: z
    .string()
    .min(1)
    .max(1000, "Exceeded maximum character limit of 1000")
    .optional(),
  assignee: z
    .string()
    .max(50, "Exceeded maximum character limit of 30")
    .optional(),
  dueDate: z.string().date().optional(),
  status: z.enum([
    "todo",
    "in-progress",
    "in-review",
    "blocked",
    "done",
    "cancelled",
  ]),
  priority: z.enum(["low", "medium", "high"]),
});
