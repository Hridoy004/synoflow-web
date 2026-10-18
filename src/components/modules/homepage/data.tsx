import {
  BarChart3,
  Code2,
  GanttChartSquare,
  Inbox,
  Layers3,
  LayoutDashboard,
  ListTodo,
  type LucideIcon,
  Megaphone,
  Palette,
  Target,
} from "lucide-react";

export const PEOPLE = {
  AR: "bg-violet-100 text-violet-700",
  HR: "bg-sky-100 text-sky-700",
  SK: "bg-pink-100 text-pink-700",
  MN: "bg-amber-100 text-amber-700",
} as const;

export type PersonId = keyof typeof PEOPLE;

export const PRIORITY_STYLES = {
  High: "text-orange-600",
  Medium: "text-amber-600",
  Low: "text-sky-600",
} as const;

export type Priority = keyof typeof PRIORITY_STYLES;

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  assignee: PersonId;
  label: string;
};

export type BoardColumn = { title: string; dotClass: string; tasks: Task[] };

export const BOARD: BoardColumn[] = [
  {
    title: "To do",
    dotClass: "bg-slate-400",
    tasks: [
      {
        id: "SYN-124",
        title: "Create onboarding screens",
        priority: "High",
        assignee: "AR",
        label: "Design",
      },
      {
        id: "SYN-125",
        title: "Update workspace settings",
        priority: "Medium",
        assignee: "HR",
        label: "Backend",
      },
      {
        id: "SYN-126",
        title: "Add email notifications",
        priority: "Low",
        assignee: "SK",
        label: "Feature",
      },
    ],
  },
  {
    title: "In progress",
    dotClass: "bg-[#4852F5]",
    tasks: [
      {
        id: "SYN-121",
        title: "Implement authentication",
        priority: "High",
        assignee: "HR",
        label: "Backend",
      },
      {
        id: "SYN-122",
        title: "Design project dashboard",
        priority: "Medium",
        assignee: "AR",
        label: "Design",
      },
    ],
  },
  {
    title: "Done",
    dotClass: "bg-emerald-500",
    tasks: [
      {
        id: "SYN-118",
        title: "Initialize application",
        priority: "Medium",
        assignee: "SK",
        label: "Setup",
      },
      {
        id: "SYN-119",
        title: "Configure database",
        priority: "Low",
        assignee: "HR",
        label: "Backend",
      },
    ],
  },
];

export const SIDEBAR_NAV: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Inbox, label: "My issues" },
  { icon: Layers3, label: "Board", active: true },
  { icon: GanttChartSquare, label: "Roadmap" },
  { icon: BarChart3, label: "Reports" },
];

export const SIDEBAR_PROJECTS = [
  { name: "Website redesign", dotClass: "bg-[#4852F5]" },
  { name: "Mobile app", dotClass: "bg-emerald-500" },
  { name: "Internal tools", dotClass: "bg-amber-500" },
];

export const BACKLOG = [
  {
    id: "SYN-130",
    title: "Set up billing page",
    status: "Ready",
    points: 5,
    assignee: "MN",
  },
  {
    id: "SYN-131",
    title: "Invite teammates by email",
    status: "Ready",
    points: 3,
    assignee: "SK",
  },
  {
    id: "SYN-132",
    title: "Export reports as CSV",
    status: "Needs scope",
    points: 8,
    assignee: "HR",
  },
  {
    id: "SYN-133",
    title: "Dark mode for the app",
    status: "Needs scope",
    points: 5,
    assignee: "AR",
  },
] as const satisfies readonly {
  id: string;
  title: string;
  status: "Ready" | "Needs scope";
  points: number;
  assignee: PersonId;
}[];

export const STATUS_STYLES = {
  Ready: "bg-emerald-50 text-emerald-700",
  "Needs scope": "bg-amber-50 text-amber-700",
} as const;

export const ROADMAP = [
  { label: "Onboarding", start: 0, width: 38, barClass: "bg-[#4852F5]" },
  { label: "Authentication", start: 12, width: 34, barClass: "bg-sky-500" },
  { label: "Dashboard", start: 30, width: 40, barClass: "bg-violet-500" },
  { label: "Notifications", start: 52, width: 30, barClass: "bg-emerald-500" },
  { label: "Public launch", start: 78, width: 20, barClass: "bg-orange-500" },
];

export const ROADMAP_MONTHS = ["Oct", "Nov", "Dec", "Jan"];

export const BURNDOWN = [88, 80, 76, 68, 60, 55, 44, 38, 30, 22];

export const COMMENTS: { author: PersonId; name: string; text: string }[] = [
  {
    author: "AR",
    name: "Amina",
    text: "Onboarding screens are ready for review.",
  },
  {
    author: "HR",
    name: "Hasan",
    text: "Looks good. I'll connect them to auth today.",
  },
  { author: "SK", name: "Sara", text: "Moving SYN-124 to In progress." },
];

export const WORKFLOW: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Layers3,
    title: "Plan your work",
    text: "Create a project, organize the backlog, and turn ideas into clear tasks.",
  },
  {
    icon: ListTodo,
    title: "Move work forward",
    text: "Assign owners, discuss issues, and watch progress on the board.",
  },
  {
    icon: BarChart3,
    title: "Review and improve",
    text: "Check sprint results, find bottlenecks, and plan what comes next.",
  },
];

export const TEAMS: {
  icon: LucideIcon;
  title: string;
  text: string;
  chipClass: string;
}[] = [
  {
    icon: Code2,
    title: "Engineering",
    text: "Run sprints, triage bugs, and ship releases without losing track of what is in flight.",
    chipClass: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Palette,
    title: "Design",
    text: "Move work from brief to handoff and keep reviews attached to the right task.",
    chipClass: "bg-pink-50 text-pink-600",
  },
  {
    icon: Target,
    title: "Product",
    text: "Prioritize the backlog, plan the roadmap, and show stakeholders the real status.",
    chipClass: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    text: "Coordinate campaigns and deadlines where the rest of the team already works.",
    chipClass: "bg-amber-50 text-amber-600",
  },
];

export const FAQS = [
  {
    q: "Is Synoflow free to start?",
    a: "Yes. Create a workspace for free and invite your team when you are ready.",
  },
  {
    q: "Can I plan sprints and keep a backlog?",
    a: "Yes. Move issues from the backlog into a sprint and follow progress on the board.",
  },
  {
    q: "How do I see where a project stands?",
    a: "Open Reports to see task status, workload, and sprint progress in one view.",
  },
  {
    q: "Can my whole team work in one workspace?",
    a: "Yes. Add members, assign issues, and comment on work without switching tools.",
  },
];
