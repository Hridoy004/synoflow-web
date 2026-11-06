"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, CircleHelp, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HOME_HREF = "/";

const actionClass = "h-11 w-full rounded-xl px-6 font-semibold sm:w-auto";

function BrandLogo() {
  return (
    <Link
      href={HOME_HREF}
      aria-label="Synoflow home"
      className="mb-7 inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:mb-10"
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 [&_svg]:size-5">
        <Logo />
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-950">
        Syno<span className="text-indigo-600">flow</span>
      </span>
    </Link>
  );
}

function NotFoundIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mb-6 flex size-24 items-center justify-center min-[400px]:size-28 sm:mb-7 sm:size-32"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-50 to-white ring-1 ring-indigo-100" />
      <div className="absolute inset-3.5 rounded-full border border-dashed border-indigo-200" />
      <div className="relative flex size-16 items-center justify-center rounded-full bg-indigo-600 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-white sm:size-[4.5rem]">
        <CircleHelp
          className="size-8 shrink-0 text-white sm:size-9"
          strokeWidth={1.75}
        />
      </div>
      <span className="absolute -right-0.5 top-3 size-4 rounded-full border-4 border-white bg-indigo-500 shadow-sm" />
      <span className="absolute -left-0.5 bottom-4 size-3 rounded-full bg-blue-300 ring-2 ring-white" />
    </div>
  );
}

function GoBackButton() {
  const router = useRouter();

  const goBack = () =>
    window.history.length > 1 ? router.back() : router.push(HOME_HREF);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={goBack}
      className={cn(
        actionClass,
        "border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
      )}
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Go Back to Safety
    </Button>
  );
}

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-slate-50 px-3 py-8 min-[400px]:px-4 sm:px-6 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl sm:size-96" />
        <div className="absolute -bottom-32 -right-20 size-72 rounded-full bg-blue-200/30 blur-3xl sm:size-96" />
      </div>

      <section className="w-full max-w-md sm:max-w-xl">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-xl shadow-indigo-900/5 min-[400px]:p-7 sm:p-10 md:p-12">
          <BrandLogo />
          <NotFoundIllustration />

          <p className="mx-auto w-fit rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-100">
            Error 404
          </p>

          <h1 className="mt-4 text-balance text-2xl font-bold tracking-tight text-slate-950 min-[400px]:text-3xl sm:text-4xl">
            Oops! Page not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            Looks like this page has gone off track. The link may be broken, or
            the page may have been moved. Let’s get you back on track.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href={HOME_HREF} />}
              className={cn(
                actionClass,
                "bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-600/25 transition hover:from-indigo-600 hover:to-indigo-700",
              )}
            >
              <Home className="size-4" aria-hidden="true" />
              Back to Home
            </Button>
            <GoBackButton />
          </div>

          <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-6 text-slate-500 sm:mt-9">
            Need help? Return to Synoflow and continue managing your projects in
            one place.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Synoflow. All rights reserved.
        </p>
      </section>
    </main>
  );
}
