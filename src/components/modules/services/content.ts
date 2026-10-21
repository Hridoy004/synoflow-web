import {
  CalendarRange,
  ChartNoAxesCombined,
  FolderKanban,
  ListChecks,
  type LucideIcon,
  ShieldCheck,
  Users,
} from "lucide-react";

export type ServiceTone =
  | "indigo"
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "pink";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: ServiceTone;
  features: readonly string[];
};

export const SERVICES: readonly Service[] = [
  {
    id: "project-management",
    title: "Project Management",
    description:
      "Plan, organize, and track multiple projects from a centralized workspace. Keep your goals, milestones, and progress clearly visible.",
    icon: FolderKanban,
    tone: "indigo",
    features: ["Project organization", "Progress tracking", "Project overview"],
  },
  {
    id: "task-workflow",
    title: "Task & Workflow Management",
    description:
      "Turn complex work into manageable tasks. Set priorities, assign responsibilities, and track every task from start to completion.",
    icon: ListChecks,
    tone: "sky",
    features: [
      "Task assignments",
      "Priority and status tracking",
      "Subtasks and due dates",
    ],
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description:
      "Bring your team together in one shared workspace. Keep project discussions, task ownership, and team activities organized.",
    icon: Users,
    tone: "violet",
    features: ["Team management", "Task comments", "Activity updates"],
  },
  {
    id: "agile-sprints",
    title: "Agile & Sprint Planning",
    description:
      "Help development teams organize their workflow, plan sprints, manage backlogs, and keep work aligned with sprint goals.",
    icon: CalendarRange,
    tone: "emerald",
    features: [
      "Sprint organization",
      "Task planning",
      "Sprint progress tracking",
    ],
  },
  {
    id: "reports-analytics",
    title: "Reports & Analytics",
    description:
      "Get a clearer view of project progress and task completion with useful insights that help your team understand its workload.",
    icon: ChartNoAxesCombined,
    tone: "amber",
    features: [
      "Project progress",
      "Task status summaries",
      "Completion insights",
    ],
  },
  {
    id: "workspace-access",
    title: "Workspace & Access Management",
    description:
      "Manage organizations, teams, and members with structured workspaces and role-based access control.",
    icon: ShieldCheck,
    tone: "pink",
    features: [
      "Organization management",
      "Member invitations",
      "Role-based permissions",
    ],
  },
];
