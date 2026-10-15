"use client";

import { useForgotPassword, useResetPassword } from "@/hooks";
import { resetPasswordSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN_SECONDS = 300;
const OTP_LENGTH = 6;

const labelClass = "text-sm font-medium text-slate-700";
const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400";
const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white pl-9 text-base shadow-xs placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 sm:text-sm";
const slotClass =
  "h-12 w-10 text-lg font-semibold text-slate-900 sm:h-14 sm:w-12 sm:text-xl data-[active=true]:border-indigo-500 data-[active=true]:ring-indigo-500/30";

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);

  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  const { mutate: forgotPassword, isPending: isResending } =
    useForgotPassword();

  useEffect(() => {
    if (!email) router.replace("/forgot-password");
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: ({ value }) => {
      resetPassword(
        {
          email,
          otp: value.otp,
          newPassword: value.newPassword,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Couldn't reset password",
                description: res.message || "Please try again.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Password reset successful",
              description: "You can now sign in with your new password.",
              type: "success",
            });
            router.push("/login");
          },
          onError: (err) => {
            form.setFieldValue("otp", "");
            toast.add({
              title: "Couldn't reset password",
              description:
                err.message || "Invalid or expired code. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleResend = () => {
    if (resendTimer > 0 || isResending) return;

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setResendTimer(RESEND_COOLDOWN_SECONDS);
          form.setFieldValue("otp", "");
          toast.add({
            title: "Code sent again",
            description: "Check your inbox for the new code.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Couldn't resend code",
            description: err.message || "Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  if (!email) return null;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
          <MailCheck aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
            Reset your password
          </h1>
          <p className="text-balance text-sm text-slate-500">
            Enter the 6-digit code we sent to
          </p>
          <p className="break-all text-sm font-semibold text-slate-900">
            {email}
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
          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="items-center">
                  <InputOTP
                    id={field.name}
                    name={field.name}
                    autoFocus
                    maxLength={OTP_LENGTH}
                    value={field.state.value}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoComplete="one-time-code"
                    disabled={isResetting}
                    aria-label="Verification code"
                    aria-invalid={isInvalid}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className={slotClass} />
                      <InputOTPSlot index={1} className={slotClass} />
                      <InputOTPSlot index={2} className={slotClass} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className={slotClass} />
                      <InputOTPSlot index={4} className={slotClass} />
                      <InputOTPSlot index={5} className={slotClass} />
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    New password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a new password"
                      className={`${inputClass} pr-11`}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    <VisibilityToggle
                      shown={showPassword}
                      onToggle={() => setShowPassword((p) => !p)}
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className={`${inputClass} pr-11`}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    <VisibilityToggle
                      shown={showConfirm}
                      onToggle={() => setShowConfirm((p) => !p)}
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isResetting}
            className="h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:ring-indigo-500/40 disabled:opacity-70"
          >
            {isResetting ? (
              <>
                <Spinner /> Resetting…
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="flex flex-col items-center gap-4 text-sm">
        <p className="text-slate-500">
          Didn&apos;t get the code?{" "}
          {resendTimer > 0 ? (
            <span className="font-medium text-slate-700">
              Resend in {formatTime(resendTimer)}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-indigo-600 underline-offset-4 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-60"
            >
              {isResending ? "Sending…" : "Resend code"}
            </button>
          )}
        </p>

        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

function VisibilityToggle({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  const Icon = shown ? EyeOff : Eye;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      aria-pressed={shown}
      className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
