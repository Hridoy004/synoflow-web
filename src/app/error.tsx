"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Route rendering failed", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-indigo-600">
          Something went wrong
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          This page couldn&apos;t load
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Please try again. If the problem continues, contact your workspace
          administrator.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-slate-400">
            Reference: {error.digest}
          </p>
        )}
        <Button type="button" className="mt-6" onClick={retry}>
          Try again
        </Button>
      </section>
    </main>
  );
}
