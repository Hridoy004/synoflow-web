"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Root application rendering failed", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <main className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-indigo-600">Synoflow</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            We hit an unexpected error
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Reload this page to try again. Your work is safe.
          </p>
          {error.digest && (
            <p className="mt-3 text-xs text-slate-400">
              Reference: {error.digest}
            </p>
          )}
          <Button type="button" className="mt-6" onClick={retry}>
            Reload page
          </Button>
        </main>
      </body>
    </html>
  );
}
