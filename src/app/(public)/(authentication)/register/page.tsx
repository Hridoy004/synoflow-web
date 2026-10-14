import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/form/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <div className="flex flex-col bg-gradient-to-b from-blue-50/70 via-white to-white px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 md:px-14 md:py-10 lg:bg-none">
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 lg:justify-start"
        >
          <Logo />
          <span>Synoflow</span>
        </Link>

        <main className="flex flex-1 items-center justify-center py-8 sm:py-10">
          <div className="w-full max-w-[400px] sm:max-w-[440px] sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-8 sm:shadow-sm lg:max-w-[400px] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <RegisterForm />
          </div>
        </main>

        <footer className="flex flex-col items-center gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Synoflow System</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Terms
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Help
            </Link>
          </nav>
        </footer>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-slate-200/80 bg-gradient-to-br from-blue-50 via-[#F5F9FF] to-sky-100 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:self-start">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#bfdbfe_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-blue-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-96 rounded-full bg-sky-300/30 blur-3xl"
        />

        <div className="relative z-10 max-w-lg px-10 pt-14 xl:px-14 xl:pt-20">
          <h2 className="text-2xl font-semibold leading-[1.2] tracking-tight text-slate-900 xl:text-3xl 2xl:text-4xl">
            Set up your team workspace in minutes.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 xl:text-base">
            Create a project, invite your teammates and start tracking work from
            day one.
          </p>
        </div>

        <div className="relative z-10 mt-8 min-h-0 flex-1 px-6 pb-10 xl:px-10">
          <img
            src="/register.svg"
            alt=""
            className="size-full object-contain object-bottom"
          />
        </div>
      </aside>
    </div>
  );
}
