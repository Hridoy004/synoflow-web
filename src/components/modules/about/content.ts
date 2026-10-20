import {
  Eye,
  FolderKanban,
  Layers3,
  ListChecks,
  type LucideIcon,
  MessageSquare,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";

export const HERO_HIGHLIGHTS = [
  "Organized projects",
  "Connected teams",
  "Clear priorities",
];

export const PREVIEW_NAV: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}[] = [
  { icon: Layers3, label: "Overview", active: true },
  { icon: ListChecks, label: "My tasks" },
  { icon: Users, label: "Members" },
  { icon: FolderKanban, label: "Projects" },
];

export const PREVIEW_TASKS = [
  {
    title: "Create project roadmap",
    status: "Done",
    statusClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Design workspace",
    status: "In progress",
    statusClass: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Review task priorities",
    status: "To do",
    statusClass: "bg-amber-50 text-amber-700",
  },
];

export const PURPOSE: {
  icon: LucideIcon;
  title: string;
  text: string;
  cardClass: string;
  chipClass: string;
}[] = [
  {
    icon: Target,
    title: "Our mission",
    text: "To simplify project management by helping teams plan clearly, collaborate effectively, and turn ideas into completed work.",
    cardClass: "from-primary/10",
    chipClass: "bg-primary text-white shadow-lg shadow-primary/30",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "To create a workspace where teams understand their priorities, see the bigger picture, and do their best work together.",
    cardClass: "from-violet-50",
    chipClass: "bg-violet-500 text-white shadow-lg shadow-violet-500/30",
  },
];

export const SOLUTIONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Layers3,
    title: "Scattered information",
    text: "Bring projects, tasks, and important work into one organized workspace.",
  },
  {
    icon: MessageSquare,
    title: "Disconnected teams",
    text: "Keep team members aligned with shared project information and activity.",
  },
  {
    icon: ListChecks,
    title: "Unclear priorities",
    text: "Organize tasks, assign responsibilities, and make progress easier to follow.",
  },
];

export const CAPABILITIES: {
  icon: LucideIcon;
  title: string;
  text: string;
  cardClass: string;
  chipClass: string;
}[] = [
  {
    icon: FolderKanban,
    title: "Organize projects",
    text: "Keep projects, teams, and workspaces structured in one place.",
    cardClass: "from-primary/10",
    chipClass: "bg-primary text-white shadow-lg shadow-primary/30",
  },
  {
    icon: ListChecks,
    title: "Manage tasks",
    text: "Create tasks, assign responsibilities, and track task status.",
    cardClass: "from-emerald-50",
    chipClass: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
  },
  {
    icon: Users,
    title: "Work together",
    text: "Bring members together around shared goals and project activity.",
    cardClass: "from-violet-50",
    chipClass: "bg-violet-500 text-white shadow-lg shadow-violet-500/30",
  },
];

export const VALUES: {
  icon: LucideIcon;
  title: string;
  text: string;
  chipClass: string;
}[] = [
  {
    icon: Target,
    title: "Simplicity first",
    text: "Make complex workflows easier to understand, manage, and complete.",
    chipClass: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Users,
    title: "Better together",
    text: "Bring people together around shared goals and meaningful work.",
    chipClass: "bg-sky-50 text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Built on trust",
    text: "Encourage transparency, accountability, and responsible collaboration.",
    chipClass: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Always improving",
    text: "Help teams spend less time managing work and more time creating value.",
    chipClass: "bg-amber-50 text-amber-600",
  },
];
