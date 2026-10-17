import z from "zod";

export const ORGANIZATION_NAME_MAX_LENGTH = 80;
export const ORGANIZATION_SLUG_MAX_LENGTH = 50;
export const ORGANIZATION_DESCRIPTION_MAX_LENGTH = 250;

const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(
    ORGANIZATION_SLUG_MAX_LENGTH,
    `Slug must not exceed ${ORGANIZATION_SLUG_MAX_LENGTH} characters.`,
  )
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only.",
  );

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters long.")
    .max(
      ORGANIZATION_NAME_MAX_LENGTH,
      `Organization name must not exceed ${ORGANIZATION_NAME_MAX_LENGTH} characters.`,
    ),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .max(
      ORGANIZATION_DESCRIPTION_MAX_LENGTH,
      `Description must not exceed ${ORGANIZATION_DESCRIPTION_MAX_LENGTH} characters.`,
    )
    .optional(),
});

export const updateOrganizationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Organization name must be at least 2 characters long.")
      .max(
        ORGANIZATION_NAME_MAX_LENGTH,
        `Organization name must not exceed ${ORGANIZATION_NAME_MAX_LENGTH} characters.`,
      )
      .optional(),
    description: z
      .string()
      .trim()
      .max(
        ORGANIZATION_DESCRIPTION_MAX_LENGTH,
        `Description must not exceed ${ORGANIZATION_DESCRIPTION_MAX_LENGTH} characters.`,
      )
      .nullable()
      .optional(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update.",
  });

export const organizationMemberEmailSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),
});
