import { Check, CheckCircle2, type LucideIcon, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PREVIEW_NAV, PREVIEW_TASKS } from "./content";

function PreviewSidebar() {
  return (
    <aside
      aria-hidden
      className="border-r bg-muted/50 p-2 min-[420px]:p-2.5 sm:p-4"
    >
      <div className="mb-5 flex items-center justify-center gap-2 px-1 min-[420px]:justify-start">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Zap className="size-4" />
        </span>
        <span className="hidden text-xs font-semibold text-foreground sm:block">
          Synoflow
        </span>
      </div>

      <nav className="space-y-1">
        {PREVIEW_NAV.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-medium min-[420px]:justify-start",
              active
                ? "bg-card text-primary shadow-sm ring-1 ring-border"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="hidden min-[420px]:inline">{label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-6 hidden rounded-xl border bg-card p-2.5 min-[420px]:block">
        <Zap className="size-4 text-primary" />
        <p className="mt-2 text-[10px] font-semibold text-foreground sm:text-xs">
          Work in sync
        </p>
        <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
          Everything in one place.
        </p>
      </div>
    </aside>
  );
}

function StatTile({
  icon: Icon,
  label,
  hint,
  iconClass,
}: {
  icon: LucideIcon;
  label: string;
  hint: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border p-3">
      <Icon aria-hidden className={cn("size-4", iconClass)} />
      <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function PreviewMain() {
  return (
    <div className="min-w-0 p-3 sm:p-5">
      <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-lg">
        Your work, organized.
      </h3>
      <p className="mt-1 text-[11px] leading-5 text-muted-foreground sm:text-xs">
        Keep your projects moving forward.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatTile
          icon={Check}
          label="Tasks"
          hint="Organized work"
          iconClass="text-primary"
        />
        <StatTile
          icon={Users}
          label="Teams"
          hint="Shared goals"
          iconClass="text-violet-600"
        />
      </div>

      <div className="mt-3 rounded-xl border p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-xs font-semibold text-foreground">
            Task overview
          </h4>
          <span className="text-[10px] text-muted-foreground/60">Example</span>
        </div>
        <ul className="space-y-3.5">
          {PREVIEW_TASKS.map((task) => (
            <li
              key={task.title}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <CheckCircle2
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground/60"
                />
                <span className="truncate text-[10px] text-foreground/80 sm:text-xs">
                  {task.title}
                </span>
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "shrink-0 rounded-md px-1.5 text-[9px] sm:px-2 sm:text-[10px]",
                  task.statusClass,
                )}
              >
                {task.status}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 p-3">
        <Check aria-hidden className="size-4 shrink-0 text-primary" />
        <p className="text-[10px] leading-4 text-primary sm:text-xs">
          A clearer view of your team&apos;s work.
        </p>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[26px] bg-gradient-to-b from-background via-primary/30 to-violet-500/10 p-[1.5px] shadow-2xl shadow-primary/25">
        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="flex h-10 items-center border-b bg-muted/50 px-4">
            <div className="flex w-12 gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-red-300" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-300" />
            </div>
            <span className="mx-auto text-[11px] font-medium text-muted-foreground/60">
              synoflow.app / overview
            </span>
            <span className="w-12" aria-hidden />
          </div>
          <div className="grid grid-cols-[52px_minmax(0,1fr)] min-[420px]:grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-[148px_minmax(0,1fr)]">
            <PreviewSidebar />
            <PreviewMain />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border bg-card/95 p-3.5 shadow-xl backdrop-blur sm:flex lg:-left-8">
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-foreground">
            Stay organized
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Move forward together
          </p>
        </div>
      </div>
    </div>
  );
}
