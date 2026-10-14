import Logo from "@/assets/svg/Logo";
import VerifyAccountForm from "@/components/form/verify-account-form";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-[#F5F9FF] to-white px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#bfdbfe_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl"
      />

      <Link
        href="/"
        className="flex items-center justify-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 lg:justify-start"
      >
        <Logo />
        <span>Synoflow</span>
      </Link>

      <main className="relative flex flex-1 items-center justify-center py-8 sm:py-10">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
          <Suspense
            fallback={
              <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
            }
          >
            <VerifyAccountForm />
          </Suspense>
        </div>
      </main>

      <footer className="relative flex flex-col items-center gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Synoflow System</p>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-900">
            Terms
          </Link>
          <Link href="/help" className="hover:text-slate-900">
            Help
          </Link>
        </nav>
      </footer>
    </div>
  );
}
