"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function ErrorIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mb-7 flex size-24 items-center justify-center min-[400px]:size-28 sm:size-32"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-50 to-white ring-1 ring-indigo-100" />
      <div className="absolute inset-3.5 rounded-full border border-dashed border-indigo-200" />
      <div className="relative flex size-16 items-center justify-center rounded-full bg-indigo-600 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-white sm:size-[4.5rem]">
        <AlertTriangle
          className="size-8 shrink-0 text-white sm:size-9"
          strokeWidth={1.75}
        />
      </div>
      <span className="absolute -right-0.5 top-3 size-4 rounded-full border-4 border-white bg-indigo-500 shadow-sm" />
      <span className="absolute -left-0.5 bottom-4 size-3 rounded-full bg-blue-300 ring-2 ring-white" />
    </div>
  );
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-slate-50 px-3 py-8 min-[400px]:px-4 sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl sm:size-96" />
        <div className="absolute -bottom-32 -right-20 size-72 rounded-full bg-blue-200/30 blur-3xl sm:size-96" />
      </div>

      <section
        role="alert"
        className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-xl shadow-indigo-900/5 min-[400px]:p-7 sm:max-w-lg sm:p-10 md:p-12"
      >
        <ErrorIllustration />

        <p className="mx-auto w-fit rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-100">
          Something went wrong
        </p>

        <h1 className="mt-4 text-balance text-2xl font-bold tracking-tight text-slate-950 min-[400px]:text-3xl sm:text-4xl">
          We couldn&apos;t load Synoflow
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
          An unexpected error occurred while loading the application. Please
          try again.
        </p>

        {error.digest && (
          <p className="mx-auto mt-5 w-fit max-w-full break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600">
            Reference ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={reset}
            className="h-11 w-full gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-6 font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:from-indigo-600 hover:to-indigo-700 sm:w-auto"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </Button>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-6 text-slate-500 sm:mt-9">
          If the problem persists, contact your workspace administrator.
        </p>
      </section>
    </main>
  );
}
