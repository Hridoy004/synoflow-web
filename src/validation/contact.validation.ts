import { z } from "zod";

export const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "billing", label: "Billing & Subscription" },
  { value: "feature-request", label: "Feature Request" },
  { value: "bug-report", label: "Bug Report" },
  { value: "partnership", label: "Partnership" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];

const inquiryValues = INQUIRY_TYPES.map((type) => type.value) as [
  InquiryType,
  ...InquiryType[],
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address")
    .max(254, "Email must be 254 characters or fewer")
    .email("Enter a valid email address"),
  inquiryType: z.enum(inquiryValues, { message: "Select an inquiry type" }),
  organization: z
    .string()
    .trim()
    .max(120, "Organization name must be 120 characters or fewer"),
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject")
    .max(150, "Subject must be 150 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export const contactFormSchema = contactSchema.extend({
  inquiryType: z.union([z.literal(""), z.enum(inquiryValues)]),
});

/** Validated data sent to the API. */
export type ContactPayload = z.infer<typeof contactSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const EMPTY_CONTACT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  inquiryType: "",
  organization: "",
  subject: "",
  message: "",
};

export function isInquiryType(value: unknown): value is InquiryType {
  return INQUIRY_TYPES.some((type) => type.value === value);
}
