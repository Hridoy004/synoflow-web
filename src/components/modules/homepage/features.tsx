import {
  BarChart3,
  GanttChartSquare,
  Layers3,
  ListTodo,
  type LucideIcon,
  MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  BACKLOG,
  BURNDOWN,
  COMMENTS,
  ROADMAP,
  ROADMAP_MONTHS,
  STATUS_STYLES,
} from "./data";
import { AppWindow, Avatar, Container, SectionHeader } from "./primitives";

const TONES = {
  indigo: { card: "from-[#EEF0FF]", chip: "bg-[#4852F5] shadow-[#4852F5]/30" },
  emerald: {
    card: "from-emerald-50",
    chip: "bg-emerald-500 shadow-emerald-500/30",
  },
  violet: {
    card: "from-violet-50",
    chip: "bg-violet-500 shadow-violet-500/30",
  },
  sky: { card: "from-sky-50", chip: "bg-sky-500 shadow-sky-500/30" },
} as const;

function FeatureCard({
  icon: Icon,
  tone,
  title,
  description,
  className = "",
  children,
}: {
  icon: LucideIcon;
  tone: keyof typeof TONES;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br ${t.card} via-white to-white ${className}`}
    >
      <div className="p-7 sm:p-9">
        <span
          className={`flex size-11 items-center justify-center rounded-xl text-white shadow-lg ${t.chip}`}
        >
          <Icon className="size-5" />
        </span>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 max-w-md text-[15px] leading-7 text-slate-600">
          {description}
        </p>
      </div>
      <div className="mt-auto px-5 sm:px-9">{children}</div>
    </article>
  );
}

function BacklogVisual() {
  return (
    <AppWindow
      title="Sprint 5 planning"
      className="rounded-b-none border-b-0 shadow-xl"
    >
      <ul className="divide-y divide-slate-100 p-2">
        {BACKLOG.map((item) => (
          <li key={item.id} className="flex items-center gap-3 px-3 py-3">
            <ListTodo aria-hidden className="size-4 shrink-0 text-slate-300" />
            <span className="hidden text-[11px] font-medium text-slate-400 sm:block">
              {item.id}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-800">
              {item.title}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[item.status]}`}
            >
              {item.status}
            </span>
            <span className="w-9 text-right text-[11px] text-slate-500">
              {item.points} pts
            </span>
            <Avatar id={item.assignee} />
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}

function ReportsVisual() {
  return (
    <div
      className="rounded-t-2xl border border-b-0 border-slate-200 bg-white p-5 shadow-xl"
      role="img"
      aria-label="Bar chart showing remaining work falling across the sprint"
    >
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] text-slate-500">Completed</p>
          <p className="text-3xl font-semibold tracking-tight text-slate-950">
            68%
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          On track
        </span>
      </div>
      <div className="mt-5 flex h-28 items-end gap-1.5">
        {BURNDOWN.map((height) => (
          <div
            key={height}
            className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CollaborationVisual() {
  return (
    <ul className="space-y-3 rounded-t-2xl border border-b-0 border-slate-200 bg-white p-5 shadow-xl">
      {COMMENTS.map((c) => (
        <li key={c.text} className="flex items-start gap-3">
          <Avatar id={c.author} size="size-7" />
          <div className="min-w-0 rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5">
            <p className="text-[11px] font-semibold text-slate-700">{c.name}</p>
            <p className="mt-0.5 text-xs leading-5 text-slate-600">{c.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function RoadmapVisual() {
  return (
    <AppWindow title="Roadmap" className="rounded-b-none border-b-0 shadow-xl">
      <div className="grid grid-cols-[92px_1fr] items-center gap-x-3 p-4 sm:grid-cols-[112px_1fr] sm:p-5">
        <span />
        <div className="flex justify-between border-b border-slate-100 pb-2 text-[11px] text-slate-400">
          {ROADMAP_MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        {ROADMAP.map((row) => (
          <div key={row.label} className="contents">
            <span className="truncate py-2.5 text-xs font-medium text-slate-700">
              {row.label}
            </span>
            <div className="relative h-9 border-b border-slate-50">
              <div
                className={`absolute top-2.5 h-4 rounded-full ${row.barClass}`}
                style={{ left: `${row.start}%`, width: `${row.width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeader
          title="Everything from the first task to the final release"
          description="One connected place for planning, doing, and reviewing work."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <FeatureCard
            className="lg:col-span-2"
            icon={Layers3}
            tone="indigo"
            title="Plan sprints from a backlog that stays organized"
            description="Collect ideas in one backlog, size them with story points, and pull the right work into the next sprint."
          >
            <BacklogVisual />
          </FeatureCard>

          <FeatureCard
            icon={BarChart3}
            tone="emerald"
            title="Know where every sprint stands"
            description="Spot blocked work while there is still time to act."
          >
            <ReportsVisual />
          </FeatureCard>

          <FeatureCard
            icon={MessageSquare}
            tone="violet"
            title="Keep the conversation on the work"
            description="Comment on issues, so decisions never get lost in chat."
          >
            <CollaborationVisual />
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-2"
            icon={GanttChartSquare}
            tone="sky"
            title="Share a roadmap everyone can follow"
            description="Lay projects out on a timeline so the whole team sees what ships, when, and what depends on what."
          >
            <RoadmapVisual />
          </FeatureCard>
        </div>
      </Container>
    </section>
  );
}
