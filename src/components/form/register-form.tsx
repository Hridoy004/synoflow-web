"use client";

import { useRegistration } from "@/hooks";
import { userRegistrationSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const inputClass =
  "h-11 rounded-lg border-slate-200 bg-white pl-9 text-base shadow-xs placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 sm:text-sm";
const labelClass = "text-sm font-medium text-slate-700";
const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400";

type UserDefaultValues = z.infer<typeof userRegistrationSchema>;

const defaultValues: UserDefaultValues = {
  name: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
};

function ShowToggle({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={shown ? "Hide password" : "Show password"}
      aria-pressed={shown}
      onClick={onToggle}
      className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: registration, isPending: registrationPending } =
    useRegistration();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: userRegistrationSchema,
    },
    onSubmit: ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
        user: {
          contactNumber: value.contactNumber,
        },
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Registration failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Account created",
            description: "Please verify your email to continue.",
            type: "success",
          });

          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Couldn't create your account",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-7">
      <div className="flex flex-col gap-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-semibold leading-tight sm:text-[1.75rem] tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="text-balance text-sm text-slate-500">
          Set up your Synoflow workspace in under a minute.
        </p>
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
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Full name
                  </FieldLabel>
                  <div className="relative">
                    <User aria-hidden="true" className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Ali Hasan"
                      className={inputClass}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="name"
                      autoCapitalize="words"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Work email
                  </FieldLabel>
                  <div className="relative">
                    <Mail aria-hidden="true" className={iconClass} />
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
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Phone number
                  </FieldLabel>
                  <div className="relative">
                    <Phone aria-hidden="true" className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      inputMode="tel"
                      placeholder="+880 1413 453455"
                      className={inputClass}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="tel"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={`${inputClass} pr-11`}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    <ShowToggle
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
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                    />
                    <ShowToggle
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
            disabled={registrationPending}
            type="submit"
            className="group h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:ring-blue-500/40 disabled:opacity-70"
          >
            {registrationPending ? (
              <>
                <Spinner /> Creating account…
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponent />

      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
        <p className="text-xs leading-relaxed text-slate-400">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="underline underline-offset-2 hover:text-slate-600"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline underline-offset-2 hover:text-slate-600"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
