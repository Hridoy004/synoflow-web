"use client";

import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAcceptInvitation } from "@/hooks";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const searchParams = useSearchParams();

  const organizationId = params.orgId;
  const token = searchParams.get("token");

  const submitted = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  const { mutate } = useAcceptInvitation();

  useEffect(() => {
    if (submitted.current) return;

    if (!organizationId || !token) {
      setStatus("error");
      setMessage(
        !organizationId
          ? "Organization is missing. Please use the link from your invitation email."
          : "Invitation token is missing. Please use the link from your invitation email.",
      );
      return;
    }

    submitted.current = true;

    mutate(
      { organizationId, token },
      {
        onSuccess: () => {
          setStatus("success");
          setMessage("Your invitation has been accepted successfully!");

          // Give the user time to see the success message.
          setTimeout(() => {
            router.replace("/user/organizations");
          }, 1200);
        },
        onError: (error: unknown) => {
          const apiError = error as {
            message?: string;
            data?: {
              message?: string;
            };
            status?: number;
            statusCode?: number;
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          const statusCode = apiError.status ?? apiError.statusCode;
          const errorMessage =
            apiError.data?.message ??
            apiError.response?.data?.message ??
            (statusCode === 403
              ? "Your account is not permitted to accept this invitation."
              : (apiError.message ??
                "Unable to accept the invitation. It may have expired or already been used."));

          setStatus("error");
          setMessage(
            statusCode === 403
              ? `${errorMessage} Please make sure you are signed in with the email address that received the invitation.`
              : errorMessage,
          );
        },
      },
    );
  }, [organizationId, token, mutate, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <LoaderCircle className="mx-auto size-12 animate-spin text-indigo-600" />

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Accepting your invitation
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Please wait while we add you to the organization.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto size-12 text-green-600" />

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Invitation Accepted!
            </h1>

            <p className="mt-2 text-sm text-slate-600">{message}</p>

            <p className="mt-3 text-xs text-slate-400">
              Redirecting to your organizations...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto size-12 text-red-600" />

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Invitation Failed
            </h1>

            <p
              role="alert"
              aria-live="polite"
              className="mt-3 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-700"
            >
              {message}
            </p>

            <button
              type="button"
              onClick={() => router.replace("/user/organizations")}
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Go to Organizations
            </button>
          </>
        )}
      </div>
    </main>
  );
}
