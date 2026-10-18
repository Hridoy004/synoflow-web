import type { ReactNode } from "react";
import { PEOPLE, type PersonId } from "./data";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  align = "center",
  tone = "light",
}: {
  title: string;
  description: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <h2
        className={`text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl lg:leading-[1.08] ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-lg leading-8 ${dark ? "text-indigo-100/75" : "text-slate-600"}`}
      >
        {description}
      </p>
    </div>
  );
}

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] focus-visible:ring-offset-2";

const buttonVariants = {
  primary:
    "bg-[#4852F5] text-white shadow-[0_10px_30px_-8px_rgba(72,82,245,0.65)] hover:bg-[#3A43D6] hover:shadow-[0_14px_36px_-8px_rgba(72,82,245,0.75)]",
  secondary:
    "border border-slate-200 bg-white/80 text-slate-800 shadow-sm backdrop-blur hover:border-slate-300 hover:bg-white",
  inverse:
    "bg-white text-[#2C34C9] shadow-lg shadow-black/10 hover:bg-indigo-50",
  inverseOutline: "border border-white/40 text-white hover:bg-white/10",
} as const;

export function buttonClass(variant: keyof typeof buttonVariants) {
  return `${buttonBase} ${buttonVariants[variant]}`;
}

export function Avatar({
  id,
  size = "size-6",
}: {
  id: PersonId;
  size?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ring-2 ring-white ${PEOPLE[id]}`}
    >
      {id}
    </span>
  );
}

export function AppWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 ${className}`}
    >
      <div className="flex h-10 items-center border-b border-slate-200 bg-slate-50 px-4">
        <div className="flex w-12 gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="mx-auto truncate text-[11px] font-medium text-slate-400">
          {title}
        </span>
        <span className="w-12" aria-hidden />
      </div>
      {children}
    </div>
  );
}

export function GlowFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[26px] bg-gradient-to-b from-white via-[#4852F5]/30 to-[#8B5CF6]/10 p-[1.5px] shadow-[0_50px_120px_-30px_rgba(72,82,245,0.5)]">
      {children}
    </div>
  );
}
