"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useSendContactMessage } from "@/hooks";
import {
  contactFormSchema,
  contactSchema,
  EMPTY_CONTACT_VALUES,
  INQUIRY_TYPES,
  type InquiryType,
} from "@/validation";

const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white text-base shadow-xs placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 sm:text-sm";

type ContactFormProps = {
  defaultInquiry?: InquiryType;
};

export default function ContactForm({ defaultInquiry }: ContactFormProps) {
  const { mutateAsync: sendMessage, isPending } = useSendContactMessage();

  const form = useForm({
    defaultValues: {
      ...EMPTY_CONTACT_VALUES,
      inquiryType: defaultInquiry ?? "",
    },
    validators: { onSubmit: contactFormSchema },
    onSubmit: async ({ value }) => {
      try {
        await sendMessage(contactSchema.parse(value));

        toast.add({
          title: "Message sent",
          description: "Thank you for contacting Synoflow.",
          type: "success",
        });

        form.reset();
      } catch {
        toast.add({
          title: "Unable to send message",
          description:
            "Please try again later or contact us directly at support@synoflow.com",
          type: "error",
        });
      }
    },
  });

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Send us a message
        </h2>
        <p className="text-sm leading-6 text-slate-500">
          Have a question or need help? Fill out the form and let us know how we
          can help.
        </p>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Full name <span className="text-rose-500">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <User
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="John Doe"
                        autoComplete="name"
                        className={`${inputClass} pl-9`}
                        aria-invalid={isInvalid}
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Work email <span className="text-rose-500">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Mail
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        inputMode="email"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={`${inputClass} pl-9`}
                        aria-invalid={isInvalid}
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <form.Field name="inquiryType">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Inquiry type <span className="text-rose-500">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className={`${inputClass} w-full appearance-none px-3 pr-10 ${
                          field.state.value
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        {INQUIRY_TYPES.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="organization">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Organization{" "}
                    <span className="font-normal text-slate-400">
                      (Optional)
                    </span>
                  </FieldLabel>

                  <div className="relative">
                    <Building2
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                    />
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Your company"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              )}
            </form.Field>
          </div>

          <form.Field name="subject">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Subject <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="How can we help?"
                    className={inputClass}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="message">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor={field.name}>
                      Message <span className="text-rose-500">*</span>
                    </FieldLabel>
                    <span className="text-xs text-slate-400">
                      {field.state.value.length}/2000
                    </span>
                  </div>

                  <div className="relative">
                    <MessageSquare
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400"
                    />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      placeholder="Tell us more about your question..."
                      rows={5}
                      maxLength={2000}
                      className="min-h-32 resize-y rounded-lg border-slate-200 bg-white pl-9 text-sm shadow-xs placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                      aria-invalid={isInvalid}
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending}
            className="group h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:ring-indigo-500/40 disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Spinner />
                Sending message…
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send message
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>

          <p className="text-center text-xs leading-relaxed text-slate-400">
            Your information will only be used to respond to your inquiry.
          </p>
        </FieldGroup>
      </form>
    </div>
  );
}
