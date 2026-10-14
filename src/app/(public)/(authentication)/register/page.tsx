import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/form/register-form";
import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "/help" },
];

export default function RegisterPage() {
  return (
    <div className="grid min-h-dvh w-full grid-cols-1 bg-white lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <section className="flex min-h-dvh min-w-0 flex-col bg-gradient-to-b from-blue-50/70 via-white to-white px-4 py-5 sm:px-6 sm:py-7 md:px-10 lg:px-12 lg:py-8 xl:px-16 2xl:px-20">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-center lg:justify-start">
          <Link
            href="/"
            aria-label="Synoflow home"
            className="inline-flex items-center gap-2.5 rounded-md text-lg font-semibold tracking-tight text-slate-900 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 sm:text-xl"
          >
            <Logo />
            <span>Synoflow</span>
          </Link>
        </header>

        <main className="flex w-full flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
          <div className="w-full max-w-[400px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 sm:max-w-[440px] sm:p-7 md:p-8 lg:max-w-[400px] lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <RegisterForm />
          </div>
        </main>

        <footer className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 pt-4 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} Synoflow System</p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </section>

      <aside className="relative hidden min-h-dvh min-w-0 overflow-hidden border-l border-blue-100 bg-gradient-to-br from-blue-50 via-[#F5F9FF] to-sky-100 lg:flex lg:flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#bfdbfe_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 size-72 rounded-full bg-blue-300/30 blur-3xl xl:size-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-sky-300/30 blur-3xl xl:size-96"
        />

        <div className="relative z-10 mx-auto w-full max-w-2xl px-8 pt-12 xl:px-12 xl:pt-16 2xl:px-16 2xl:pt-20">
          <p className="mb-4 inline-flex items-center rounded-full border border-blue-200/80 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
            WORK BETTER TOGETHER
          </p>

          <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 xl:text-3xl 2xl:text-4xl">
            Set up your team workspace in minutes.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 xl:text-base">
            Create a project, invite your teammates, and start tracking work
            from day one. Keep your team organized and move every project
            forward with Synoflow.
          </p>
        </div>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-3xl flex-1 items-center justify-center px-5 pb-8 pt-6 xl:px-10 xl:pb-12">
          <img
            src="/register.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block h-auto max-h-[min(65vh,680px)] w-full object-contain object-center"
          />
        </div>

        <div className="relative z-10 px-8 pb-6 text-center text-xs text-slate-500 xl:px-12 xl:pb-8">
          Plan smarter. Collaborate better. Deliver faster.
        </div>
      </aside>
    </div>
  );
}
