import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";

export default function AccountVerifyPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-slate-50 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl"
      />

      <header className="relative z-10 px-5 py-6 sm:px-10 md:px-14 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900"
        >
          <Logo />
          <span>Synoflow</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-indigo-50 text-indigo-600 ring-8 ring-indigo-50/60">
              <MailCheck aria-hidden="true" className="size-7" />
            </span>

            {/** biome-ignore lint/a11y/useSemanticElements: The live region groups a heading and description. */}
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col gap-2"
            >
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
                Verify your account
              </h1>
              <p className="text-balance text-sm leading-relaxed text-slate-500">
                We&apos;ve sent a verification link to your email address.
                Please check your inbox and click the link to activate your
                account.
              </p>
            </div>

            <p className="text-xs text-slate-400">
              Didn&apos;t get it? Check your spam folder.
            </p>

            <Link
              href="/login"
              className="group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-0.5"
              />
              Back to sign in
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-2 px-5 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-10 md:px-14">
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
