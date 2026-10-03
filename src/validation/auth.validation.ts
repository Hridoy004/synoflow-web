import z from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Please provide a valid email address.");

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least 1 number.")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character.");

const contactNumberSchema = z
  .string()
  .refine((value) => value === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(value), {
    message: "Please provide a valid Bangladeshi number.",
  })
  .optional();

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const userRegistrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters long.")
      .max(100, "Name must not exceed 100 characters."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema.min(1, "Please confirm your password"),
    contactNumber: contactNumberSchema,
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
