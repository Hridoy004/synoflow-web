import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleDashed,
  Clock3,
  Command,
  Flag,
  Layers3,
  ListTodo,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const buttonPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#4852F5] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3A43D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4852F5] focus-visible:ring-offset-2";

const buttonSecondary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300";

const heading =
  "text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-[1.15]";

const boardColumns = [
  {
    title: "TO DO",
    count: 3,
    color: "bg-slate-400",
    tasks: [
      {
        id: "SYN-124",
        title: "Create onboarding screens",
        priority: "High",
        priorityColor: "text-orange-600",
        avatar: "AR",
        avatarColor: "bg-violet-100 text-violet-700",
        type: "story",
      },
      {
        id: "SYN-125",
        title: "Update workspace settings",
        priority: "Medium",
        priorityColor: "text-amber-600",
        avatar: "HR",
        avatarColor: "bg-blue-100 text-blue-700",
        type: "task",
      },
      {
        id: "SYN-126",
        title: "Add email notifications",
        priority: "Low",
        priorityColor: "text-sky-600",
        avatar: "SK",
        avatarColor: "bg-pink-100 text-pink-700",
        type: "story",
      },
    ],
  },
  {
    title: "IN PROGRESS",
    count: 2,
    color: "bg-blue-500",
    tasks: [
      {
        id: "SYN-121",
        title: "Implement authentication",
        priority: "High",
        priorityColor: "text-orange-600",
        avatar: "HR",
        avatarColor: "bg-blue-100 text-blue-700",
        type: "story",
      },
      {
        id: "SYN-122",
        title: "Design project dashboard",
        priority: "Medium",
        priorityColor: "text-amber-600",
        avatar: "AR",
        avatarColor: "bg-violet-100 text-violet-700",
        type: "task",
      },
    ],
  },
  {
    title: "DONE",
    count: 2,
    color: "bg-emerald-500",
    tasks: [
      {
        id: "SYN-118",
        title: "Initialize application",
        priority: "Medium",
        priorityColor: "text-amber-600",
        avatar: "SK",
        avatarColor: "bg-pink-100 text-pink-700",
        type: "task",
      },
      {
        id: "SYN-119",
        title: "Configure database",
        priority: "Low",
        priorityColor: "text-sky-600",
        avatar: "HR",
        avatarColor: "bg-blue-100 text-blue-700",
        type: "story",
      },
    ],
  },
];

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    icon: ListTodo,
    title: "Issue tracking",
    description:
      "Create tasks, assign owners, set priorities, and keep every issue moving toward completion.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: Layers3,
    title: "Agile & sprint planning",
    description:
      "Organize backlogs, plan sprints, and make your team's next milestone clear.",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    icon: BarChart3,
    title: "Reports & insights",
    description:
      "Understand project progress, workload, and delivery trends from one place.",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Keep conversations, ownership, and task updates connected to the work.",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    icon: CalendarDays,
    title: "Project planning",
    description:
      "Track due dates, coordinate milestones, and get ahead of upcoming deadlines.",
    accent: "bg-pink-50 text-pink-600",
  },
  {
    icon: Zap,
    title: "Less busywork",
    description:
      "Build consistent workflows and reduce repetitive project management tasks.",
    accent: "bg-indigo-50 text-indigo-600",
  },
];

const workflow = [
  {
    number: "01",
    title: "Plan your work",
    description:
      "Create projects, organize backlogs, and turn ideas into actionable tasks.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Move work forward",
    description:
      "Assign owners, collaborate on issues, and track progress across your board.",
    icon: ArrowUpRight,
  },
  {
    number: "03",
    title: "Measure progress",
    description:
      "Review sprint outcomes, identify bottlenecks, and plan the next milestone.",
    icon: BarChart3,
  },
];

function Avatar({
  initials,
  color,
  size = "size-7",
}: {
  initials: string;
  color: string;
  size?: string;
}) {
  return (
    <span
      className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white ${color}`}
    >
      {initials}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#4852F5]">
        {eyebrow}
      </span>
      <h2 className={`${heading} mt-3`}>{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function TaskCard({
  task,
}: {
  task: (typeof boardColumns)[number]["tasks"][number];
}) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-[#A5AAFF] hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-medium text-slate-500">
          {task.id}
        </span>
        <MoreHorizontal className="size-4 text-slate-400" />
      </div>

      <p className="mt-2 text-xs font-medium leading-5 text-slate-800 sm:text-[13px]">
        {task.title}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={`flex items-center gap-1 text-[10px] ${task.priorityColor}`}
        >
          <Flag className="size-3" />
          {task.priority}
        </span>
        <Avatar initials={task.avatar} color={task.avatarColor} size="size-6" />
      </div>
    </div>
  );
}

function SprintBoard() {
  return (
    <div className="relative mx-auto w-full max-w-[660px]">
      <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-100/80 via-blue-50/50 to-violet-100/70 blur-2xl" />

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/[0.08]">
        {/* Mock application top bar */}
        <div className="flex h-12 items-center justify-between border-b border-slate-200 px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#4852F5] text-white">
              <Command className="size-4" />
            </span>
            <span className="text-xs font-bold text-slate-800 sm:text-sm">
              Synoflow
            </span>
            <span className="text-slate-300">/</span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Engineering
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="size-4 text-slate-400" />
            <div className="flex -space-x-2">
              <Avatar initials="HR" color="bg-blue-100 text-blue-700" />
              <Avatar initials="AR" color="bg-violet-100 text-violet-700" />
              <Avatar initials="SK" color="bg-pink-100 text-pink-700" />
            </div>
          </div>
        </div>

        {/* Project toolbar */}
        <div className="border-b border-slate-100 px-3 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md bg-indigo-50 text-[#4852F5]">
                  <Layers3 className="size-4" />
                </span>
                <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                  Website redesign
                </h3>
                <ChevronDown className="size-4 shrink-0 text-slate-400" />
              </div>
              <p className="mt-2 pl-9 text-[11px] text-slate-500">
                Sprint 04 · Oct 13 – Oct 24
              </p>
            </div>
            <button
              type="button"
              className="hidden h-8 shrink-0 items-center gap-1.5 rounded-md bg-[#4852F5] px-3 text-xs font-medium text-white sm:flex"
            >
              <Plus className="size-3.5" />
              Create issue
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-4 text-xs">
              <span className="border-b-2 border-[#4852F5] pb-2 font-semibold text-[#4852F5]">
                Board
              </span>
              <span className="pb-2 text-slate-500">Backlog</span>
              <span className="hidden pb-2 text-slate-500 sm:block">
                Timeline
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Users className="size-3.5" />8 members
            </div>
          </div>
        </div>

        {/* Sprint summary */}
        <div className="mx-3 mt-3 rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 sm:mx-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CircleDashed className="size-4 text-[#4852F5]" />
              <span className="text-xs font-semibold text-slate-800">
                Sprint 04
              </span>
              <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-500">
                ACTIVE
              </span>
            </div>
            <span className="text-xs font-bold text-[#4852F5]">68%</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-indigo-100">
            <div className="h-full w-[68%] rounded-full bg-[#4852F5]" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
            <span>17 of 25 story points</span>
            <span className="flex items-center gap-1">
              <Clock3 className="size-3" />5 days left
            </span>
          </div>
        </div>

        {/* Board columns */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3 sm:gap-3 sm:p-4">
          {boardColumns.map((column) => (
            <div key={column.title} className="min-w-0">
              <div className="mb-2.5 flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${column.color}`}
                />
                <span className="truncate text-[9px] font-bold tracking-wide text-slate-600 sm:text-[10px]">
                  {column.title}
                </span>
                <span className="ml-auto text-[10px] text-slate-400">
                  {column.count}
                </span>
              </div>
              <div className="space-y-2">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-1 rounded-md py-2 text-[10px] text-slate-400 transition hover:bg-white hover:text-[#4852F5]"
                >
                  <Plus className="size-3" />
                  Add issue
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Board footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            Sprint is on track
          </span>
          <span className="text-[10px] font-medium text-[#4852F5]">
            View reports <ArrowRight className="ml-1 inline size-3" />
          </span>
        </div>
      </div>

      {/* Floating activity card */}
      <div className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:flex md:-left-8">
        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Check className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-800">
            Issue completed
          </p>
          <p className="mt-0.5 text-[10px] text-slate-500">
            SYN-119 · 2 minutes ago
          </p>
        </div>
      </div>

      {/* Floating team activity */}
      <div className="absolute -right-2 -top-5 hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-lg sm:flex md:-right-5">
        <div className="flex -space-x-2">
          <Avatar initials="AR" color="bg-violet-100 text-violet-700" />
          <Avatar initials="HR" color="bg-blue-100 text-blue-700" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">Team synced</p>
          <p className="text-[10px] text-slate-500">8 members collaborating</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/[0.04]">
      <span
        className={`flex size-11 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#4852F5] opacity-0 transition group-hover:opacity-100">
        Explore feature <ArrowRight className="size-3.5" />
      </div>
    </article>
  );
}

function WorkflowCard({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="relative rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-[#4852F5]">
          STEP {number}
        </span>
        <span className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-[#4852F5]">
          <Icon className="size-5" />
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function ProgressPanel() {
  const metrics = [
    { label: "Completed", value: 68, color: "bg-emerald-500" },
    { label: "In progress", value: 22, color: "bg-blue-500" },
    { label: "To do", value: 10, color: "bg-slate-300" },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Sprint overview
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Sprint 04 · Current cycle
          </p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-[#4852F5]">
          <BarChart3 className="size-4" />
        </span>
      </div>

      <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-100">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`h-full ${metric.color}`}
            style={{ width: `${metric.value}%` }}
          />
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-3">
            <span className={`size-2.5 rounded-full ${metric.color}`} />
            <span className="flex-1 text-sm text-slate-600">
              {metric.label}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {metric.value}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
        <ArrowUpRight className="size-4 shrink-0" />A clear overview of work
        across the sprint.
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative border-b border-slate-100 bg-gradient-to-b from-[#F7F8FF] via-white to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(72,82,245,0.10),transparent_48%)]"
        />

        <div
          className={`${container} relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-28`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#4852F5] shadow-sm">
              <Sparkles className="size-3.5" />
              Project management, made clearer
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
              Great work starts with
              <span className="text-[#4852F5]"> a better workflow.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Plan projects, track every issue, and bring your team together.
              Synoflow gives your team the clarity to move work forward.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className={buttonPrimary}>
                Get started for free
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/login" className={buttonSecondary}>
                Sign in to workspace
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Organized work
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-500" />
                Team visibility
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="size-4 text-emerald-500" />
                Clear priorities
              </span>
            </div>
          </div>

          <SprintBoard />
        </div>
      </section>

      {/* Product value proposition */}
      <section className="border-b border-slate-100 py-12">
        <div className={container}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            One workspace for your team's entire workflow
          </p>

          <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: ListTodo, label: "Tasks & issues" },
              { icon: Layers3, label: "Projects & sprints" },
              { icon: MessageSquare, label: "Team collaboration" },
              { icon: BarChart3, label: "Progress & reports" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 text-center text-sm font-medium text-slate-600"
              >
                <Icon className="size-4 shrink-0 text-[#4852F5]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Everything connected"
            title="From the first task to the final release"
            description="Give your team one place to plan work, collaborate on issues, and understand what's happening across every project."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-slate-100 bg-slate-50/70 py-20 sm:py-24"
      >
        <div className={container}>
          <SectionHeading
            eyebrow="A clearer process"
            title="Plan it. Build it. Ship it."
            description="A straightforward workflow helps your team spend less time chasing updates and more time doing meaningful work."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {workflow.map((step) => (
              <WorkflowCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 sm:py-24">
        <div
          className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#4852F5]">
              Visibility without the guesswork
            </span>
            <h2 className={`${heading} mt-4`}>
              Know where your project stands.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              See how work is progressing, identify what needs attention, and
              give your team a shared view of the next milestone.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Track task status across the project",
                "Review sprint progress at a glance",
                "Make priorities clear for every team member",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="size-3.5" />
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <Link href="/register" className={`${buttonPrimary} mt-8`}>
              Start managing projects
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <ProgressPanel />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className={container}>
          <div className="relative overflow-hidden rounded-2xl bg-[#171B4D] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full bg-[#4852F5]/30 blur-3xl"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-100">
                  <Circle className="size-2 fill-current" />
                  Your next project starts here
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Bring your team's best work together.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100/80 sm:text-base">
                  Create a workspace, organize your projects, and give your team
                  a clearer path from idea to delivery.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-5 text-sm font-semibold text-[#3039C9] transition hover:bg-indigo-50"
                >
                  Get started for free
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 px-5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
