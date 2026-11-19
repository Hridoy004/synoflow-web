import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/form/register-form";
import ThemeToggle from "@/components/layout/public/theme-toggle";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Help", href: "/contact#faq" },
];

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a Synoflow account and set up your team workspace.",
};

export default function RegisterPage() {
  return (
    <div className="grid min-h-dvh w-full grid-cols-1 bg-background lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <section className="flex min-h-dvh min-w-0 flex-col bg-gradient-to-br from-brand-50/70 via-background to-background px-4 py-5 dark:from-slate-900 dark:via-background dark:to-background sm:px-6 sm:py-7 md:px-10 lg:px-12 lg:py-8 xl:px-16 2xl:px-20">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link
            href="/"
            aria-label="Synoflow home"
            className="inline-flex items-center gap-2.5 rounded-md text-lg font-bold tracking-tight text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:text-xl"
          >
            <Logo className="size-10 shrink-0" />
            <span>Synoflow</span>
          </Link>
          <ThemeToggle />
        </header>

        <main className="flex w-full flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
          <div className="w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[400px]">
            <RegisterForm />
          </div>
        </main>

        <footer className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 pt-4 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} Synoflow System</p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </section>

      <aside className="relative hidden min-h-dvh min-w-0 overflow-hidden border-l border-border bg-gradient-to-br from-brand-50 via-background to-brand-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 lg:flex lg:flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-20 [background-image:radial-gradient(var(--color-brand-200)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 size-72 rounded-full bg-primary/15 blur-3xl xl:size-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-primary/10 blur-3xl xl:size-96"
        />

        <div className="relative z-10 mx-auto w-full max-w-2xl px-8 pt-12 xl:px-12 xl:pt-16 2xl:px-16 2xl:pt-20">
          <p           className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-xs font-semibold tracking-wide text-primary shadow-sm">
            WORK BETTER TOGETHER
          </p>

          <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-foreground xl:text-3xl 2xl:text-4xl">
            Set up your team workspace in minutes.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground xl:text-base">
            Create a project, invite your teammates, and start tracking work
            from day one. Keep your team organized and move every project
            forward with Synoflow.
          </p>
        </div>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-3xl flex-1 items-center justify-center px-5 pb-8 pt-6 xl:px-10 xl:pb-12">
          <Image
            src="/register.svg"
            width={720}
            height={640}
            sizes="(min-width: 1024px) 45vw, 100vw"
            loading="eager"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block h-auto max-h-[min(65vh,680px)] w-full object-contain object-center dark:drop-shadow-[0_24px_64px_rgba(129,140,248,0.12)]"
          />
        </div>

        <div className="relative z-10 px-8 pb-6 text-center text-xs text-muted-foreground xl:px-12 xl:pb-8">
          Plan smarter. Collaborate better. Deliver faster.
        </div>
      </aside>
    </div>
  );
}
