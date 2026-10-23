import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import LoginForm from "@/components/form/login-form";

function getSafeNextPath(value: string | string[] | undefined) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/";
  }

  const destination = new URL(value, "https://synoflow.invalid");
  return destination.origin === "https://synoflow.invalid"
    ? `${destination.pathname}${destination.search}${destination.hash}`
    : "/";
}

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = getSafeNextPath(next);

  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
      <div className="flex flex-col px-5 py-6 sm:px-10 md:px-14 md:py-10">
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 lg:justify-start"
        >
          <Logo />
          <span>Synoflow</span>
        </Link>

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">
            <LoginForm nextPath={nextPath} />
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

      <aside className="relative hidden overflow-hidden border-l border-slate-200/80 bg-gradient-to-br from-indigo-50 via-[#F6F5FF] to-violet-100 lg:flex lg:flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#c7d2fe_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-violet-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-96 rounded-full bg-sky-300/30 blur-3xl"
        />

        <div className="relative z-10 max-w-lg px-10 pt-14 xl:px-14 xl:pt-20">
          <h2 className="text-2xl font-semibold leading-[1.2] tracking-tight text-slate-900 xl:text-3xl 2xl:text-4xl">
            Everything your team is working on, in one place.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 xl:text-base">
            Plan sprints, assign tasks and track progress from backlog to
            release.
          </p>
        </div>

        <div className="relative z-10 mt-8 min-h-0 flex-1 px-6 pb-10 xl:px-10">
          <Image
            src="/login.svg"
            width={720}
            height={640}
            sizes="(min-width: 1024px) 45vw, 100vw"
            alt=""
            className="size-full object-contain object-bottom"
          />
        </div>
      </aside>
    </div>
  );
}
