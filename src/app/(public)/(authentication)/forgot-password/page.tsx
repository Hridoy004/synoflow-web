import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import { ForgotPasswordForm } from "@/components/form/forgot-password-form";
import ThemeToggle from "@/components/layout/public/theme-toggle";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a secure code to reset your Synoflow password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-slate-50 pb-[max(1.5rem,env(safe-area-inset-bottom))] dark:bg-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl"
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-10 md:px-14 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900"
        >
          <Logo />
          <span>Synoflow</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <ForgotPasswordForm />
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-2 px-5 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-10 md:px-14">
        <p>&copy; {new Date().getFullYear()} Synoflow System</p>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
          <Link href="/contact#faq" className="hover:text-slate-900">
            Help
          </Link>
        </nav>
      </footer>
    </div>
  );
}
