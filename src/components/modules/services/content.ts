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
      "Keep goals, milestones, and delivery progress visible from one project workspace.",
    icon: FolderKanban,
    tone: "indigo",
    features: ["Project organization", "Progress tracking", "Project overview"],
  },
  {
    id: "task-workflow",
    title: "Task & Workflow Management",
    description:
      "Turn complex work into clear tasks, owners, priorities, and deadlines.",
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
      "Keep decisions, ownership, and project activity connected to the work.",
    icon: Users,
    tone: "violet",
    features: ["Team management", "Task comments", "Activity updates"],
  },
  {
    id: "agile-sprints",
    title: "Agile & Sprint Planning",
    description:
      "Plan sprints, prioritize backlogs, and keep delivery aligned with team goals.",
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
      "Understand workload, project health, and team progress with actionable insights.",
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
      "Organize organizations and members with secure, role-based access control.",
    icon: ShieldCheck,
    tone: "pink",
    features: [
      "Organization management",
      "Member invitations",
      "Role-based permissions",
    ],
  },
];
