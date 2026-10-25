import { z } from "zod";

const optionalDate = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .transform((value) => value || undefined);

export const teamSchema = z.object({
  name: z.string().trim().min(2).max(150),
  description: z.string().trim().max(500).optional(),
});

export const projectSchema = z
  .object({
    name: z.string().trim().min(2).max(150),
    key: z
      .string()
      .trim()
      .min(2)
      .max(20)
      .regex(/^[A-Za-z0-9_-]+$/, "Use letters, numbers, _ or - for the key."),
    description: z.string().trim().max(500).optional(),
    teamId: z.string().optional(),
    startDate: optionalDate,
    dueDate: optionalDate,
  })
  .refine(
    ({ startDate, dueDate }) =>
      !startDate || !dueDate || new Date(dueDate) >= new Date(startDate),
    {
      message: "Due date must be on or after the start date.",
      path: ["dueDate"],
    },
  );

export const sprintSchema = z
  .object({
    name: z.string().trim().min(2).max(150),
    goal: z.string().trim().max(500).optional(),
    startDate: optionalDate,
    endDate: optionalDate,
  })
  .refine(
    ({ startDate, endDate }) =>
      !startDate || !endDate || new Date(endDate) >= new Date(startDate),
    {
      message: "End date must be on or after the start date.",
      path: ["endDate"],
    },
  );

export const taskSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().max(5000).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELLED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assigneeId: z.string().optional(),
  sprintId: z.string().optional(),
  dueDate: optionalDate,
});

export const labelSchema = z.object({
  name: z.string().trim().min(1).max(100),
  color: z
    .string()
    .regex(/^#(?:[\da-fA-F]{3}|[\da-fA-F]{6})$/, "Enter a valid hex color.")
    .nullable()
    .optional(),
});

export const commentSchema = z.object({
  content: z.string().trim().min(1).max(5000),
});
