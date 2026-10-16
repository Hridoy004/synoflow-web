"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useVerifyAccount } from "@/hooks";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120;
const OTP_LENGTH = 6;

const slotClass =
  "h-12 w-10 text-lg font-semibold text-slate-900 sm:h-14 sm:w-12 sm:text-xl data-[active=true]:border-blue-500 data-[active=true]:ring-blue-500/30";

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verify, isPending: verifyPending } = useVerifyAccount();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  const handleVerify = (code: string) => {
    if (verifyPending) return;

    if (code.length !== OTP_LENGTH) {
      setIsInvalid(true);
      return;
    }

    verify(
      { email, otp: code },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Verification failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Account verified",
            description: "Welcome aboard!",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          setOtp("");
          setIsInvalid(true);
          toast.add({
            title: "Verification failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_COOLDOWN);
  };

  if (!email) {
    return null;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <MailCheck className="size-6" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
            Check your email
          </h1>
          <p className="text-balance text-sm text-slate-500">
            We sent a 6-digit verification code to
          </p>
          <p className="break-all text-sm font-semibold text-slate-900">
            {email}
          </p>
        </div>
      </div>

      <form
        id="otp-form"
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleVerify(otp);
        }}
      >
        <Field data-invalid={isInvalid} className="items-center">
          <InputOTP
            id="otp"
            name="otp"
            autoFocus
            maxLength={OTP_LENGTH}
            value={otp}
            pattern={REGEXP_ONLY_DIGITS}
            autoComplete="one-time-code"
            disabled={verifyPending}
            aria-label="Verification code"
            onChange={(value) => {
              setOtp(value);
              if (isInvalid) setIsInvalid(false);
            }}
            onComplete={handleVerify}
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

          {isInvalid && (
            <FieldError
              errors={[
                { message: "Invalid code. Please check and try again." },
              ]}
            />
          )}
        </Field>

        <Button
          type="submit"
          disabled={verifyPending || otp.length !== OTP_LENGTH}
          className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:ring-blue-500/40 disabled:opacity-60"
        >
          {verifyPending ? (
            <>
              <Spinner /> Verifying…
            </>
          ) : (
            "Verify account"
          )}
        </Button>
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
              className="font-semibold text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Resend code
            </button>
          )}
        </p>

        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to sign up
        </Link>
      </div>
    </div>
  );
}
