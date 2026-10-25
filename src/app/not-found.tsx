import { ArrowLeft, CircleHelp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <CircleHelp className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-5 text-sm font-semibold text-indigo-600">404</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The page may have moved or the address may be incorrect.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-6"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Synoflow
        </Button>
      </section>
    </main>
  );
}
