"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, ArrowRight, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const labelClass = "text-sm font-medium text-slate-700";

const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white pl-9 text-base shadow-xs placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 sm:text-sm";

const buttonClass =
  "group h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:ring-indigo-500/40 disabled:opacity-70";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: ({ value }) => {
      const email = value.email.trim();

      forgotPassword(
        { email },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server failure",
                description: "Something went wrong. Please try again.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Verification code sent",
              description: "Check your inbox for the 6-digit code.",
              type: "success",
            });

            const params = new URLSearchParams({ email });
            router.push(`/forgot-password/reset-password?${params.toString()}`);
          },
          onError: (err) => {
            toast.add({
              title: "Couldn't send code",
              description:
                err.message || "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
          <KeyRound aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
            Forgot your password?
          </h1>
          <p className="text-balance text-sm leading-relaxed text-slate-500">
            No worries. Enter the email linked to your account and we&apos;ll
            send you a 6-digit code to reset it.
          </p>
        </div>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Email
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
                      placeholder="you@company.com"
                      className={inputClass}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={isPending} type="submit" className={buttonClass}>
            {isPending ? (
              <>
                <Spinner /> Sending code…
              </>
            ) : (
              <>
                Send reset code
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <Link
        href="/login"
        className="group inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-x-0.5"
        />
        Back to sign in
      </Link>
    </div>
  );
}
