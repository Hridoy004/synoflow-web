import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Command,
  Flag,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import {
  BOARD,
  type BoardColumn,
  PRIORITY_STYLES,
  SIDEBAR_NAV,
  SIDEBAR_PROJECTS,
  type Task,
} from "./data";
import { AppWindow, Avatar, GlowFrame } from "./primitives";

function Sidebar() {
  return (
    <aside
      aria-hidden
      className="hidden border-r border-slate-200 bg-slate-50/70 p-3 md:block"
    >
      <div className="flex items-center gap-2 px-2 py-2">
        <span className="flex size-6 items-center justify-center rounded-md bg-[#4852F5] text-white">
          <Command className="size-3.5" />
        </span>
        <span className="text-xs font-semibold text-slate-800">
          Engineering
        </span>
        <ChevronDown className="ml-auto size-3.5 text-slate-400" />
      </div>

      <nav className="mt-3 space-y-0.5">
        {SIDEBAR_NAV.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium ${
              active
                ? "bg-white text-[#3A43D6] shadow-sm ring-1 ring-slate-200"
                : "text-slate-500"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </div>
        ))}
      </nav>

      <p className="mt-6 px-2.5 text-[11px] font-medium text-slate-400">
        Projects
      </p>
      <ul className="mt-2 space-y-0.5 text-xs text-slate-600">
        {SIDEBAR_PROJECTS.map((p) => (
          <li key={p.name} className="flex items-center gap-2.5 px-2.5 py-1.5">
            <span className={`size-2 rounded-sm ${p.dotClass}`} />
            {p.name}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2.5 px-2.5 text-xs text-slate-500">
        <Settings className="size-4" />
        Settings
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">
          Website redesign
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          Sprint 4, ends in 5 days
        </p>
      </div>
      <div aria-hidden className="hidden items-center gap-3 sm:flex">
        <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] text-slate-400">
          <Search className="size-3" /> Search
        </div>
        <Bell className="size-4 text-slate-400" />
        <div className="flex -space-x-2">
          <Avatar id="HR" />
          <Avatar id="AR" />
          <Avatar id="SK" />
        </div>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#4852F5] px-3 text-xs font-medium text-white">
          <Plus className="size-3.5" /> Create issue
        </span>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-400">
          {task.id}
        </span>
        <span className="hidden rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 sm:inline">
          {task.label}
        </span>
      </div>
      <p className="mt-1.5 text-[11px] font-medium leading-4 text-slate-800 sm:text-xs sm:leading-5">
        {task.title}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`flex items-center gap-1 text-[10px] font-medium ${PRIORITY_STYLES[task.priority]}`}
        >
          <Flag className="size-3" />
          <span className="hidden sm:inline">{task.priority}</span>
        </span>
        <Avatar id={task.assignee} />
      </div>
    </div>
  );
}

function Column({ column }: { column: BoardColumn }) {
  return (
    <section className="min-w-0">
      <header className="mb-3 flex items-center gap-2">
        <span className={`size-2 rounded-full ${column.dotClass}`} />
        <h3 className="truncate text-xs font-semibold text-slate-700">
          {column.title}
        </h3>
        <span className="ml-auto rounded-full bg-slate-200/70 px-1.5 text-[10px] font-medium text-slate-500">
          {column.tasks.length}
        </span>
      </header>
      <div className="space-y-2.5">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

function FloatingToast() {
  return (
    <div className="absolute -left-6 bottom-12 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur lg:flex xl:-left-10">
      <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold text-slate-900">
          SYN-119 marked as done
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          Hasan moved it from In progress
        </p>
      </div>
    </div>
  );
}

function FloatingProgress() {
  return (
    <div className="absolute -right-6 top-24 hidden w-56 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur lg:block xl:-right-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-900">Sprint 4</p>
        <span className="text-xs font-semibold text-[#4852F5]">68%</span>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-slate-100">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#4852F5] to-[#8B5CF6]" />
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        17 of 25 story points done
      </p>
    </div>
  );
}

export function ProductPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
      <GlowFrame>
        <AppWindow
          title="synoflow.app / engineering / website-redesign"
          className="rounded-3xl shadow-none"
        >
          <div className="grid md:grid-cols-[200px_1fr]">
            <Sidebar />
            <div className="min-w-0">
              <Topbar />
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 sm:gap-4 sm:p-5">
                {BOARD.map((column) => (
                  <Column key={column.title} column={column} />
                ))}
              </div>
            </div>
          </div>
        </AppWindow>
      </GlowFrame>
      <FloatingToast />
      <FloatingProgress />
    </div>
  );
}
