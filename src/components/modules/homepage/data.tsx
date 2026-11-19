import {
  BarChart3,
  Code2,
  GanttChartSquare,
  Layers3,
  ListTodo,
  type LucideIcon,
  Megaphone,
  Palette,
  Target,
} from "lucide-react";

export const WORKFLOW: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Layers3,
    title: "Plan your work",
    text: "Create a project, organize the backlog, and turn ideas into clear tasks.",
  },
  {
    icon: ListTodo,
    title: "Move work forward",
    text: "Assign owners, discuss issues, and follow progress on the board.",
  },
  {
    icon: BarChart3,
    title: "Review and improve",
    text: "Review project activity, identify blockers, and plan what comes next.",
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
    text: "Plan sprints, manage issues, and keep delivery work visible to the team.",
    chipClass: "bg-primary/10 text-primary",
  },
  {
    icon: Palette,
    title: "Design",
    text: "Coordinate briefs, reviews, and handoffs alongside the work they support.",
    chipClass: "bg-primary/10 text-primary",
  },
  {
    icon: Target,
    title: "Product",
    text: "Prioritize the backlog and share project status with stakeholders.",
    chipClass: "bg-primary/10 text-primary",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    text: "Coordinate campaign work and deadlines with your cross-functional team.",
    chipClass: "bg-primary/10 text-primary",
  },
];

export const FAQS = [
  {
    q: "Can I plan sprints and keep a backlog?",
    a: "Yes. Organize work in a backlog, plan sprints, and follow progress on project boards.",
  },
  {
    q: "How do I see where a project stands?",
    a: "Use the project board and activity views to follow status and recent changes.",
  },
  {
    q: "Can my whole team work in one workspace?",
    a: "Add members to your organization, assign work, and discuss tasks in context.",
  },
  {
    q: "Where can I get help?",
    a: "Use the contact form to send a support request to Synoflow.",
  },
];

export const FEATURE_AREAS = [
  {
    title: "Backlog and sprint planning",
    description:
      "Prioritize incoming work and organize selected tasks into a sprint.",
    capabilities: ["Project backlogs", "Sprint planning", "Task priorities"],
  },
  {
    title: "Project progress",
    description:
      "Follow project status across tasks, sprints, and team activity.",
    capabilities: ["Task status", "Sprint activity", "Project timeline"],
  },
  {
    title: "Team collaboration",
    description:
      "Keep task discussions and changes connected to the work.",
    capabilities: ["Task comments", "Team membership", "Activity history"],
  },
  {
    title: "Shared roadmaps",
    description:
      "Coordinate project work with due dates and shared milestones.",
    capabilities: ["Project due dates", "Sprints", "Organization workspaces"],
  },
];

export const PRODUCT_AREAS = [
  {
    icon: Layers3,
    title: "Plan",
    text: "Organize initiatives into projects and backlogs.",
  },
  {
    icon: GanttChartSquare,
    title: "Coordinate",
    text: "Connect teams, tasks, and sprint schedules.",
  },
  {
    icon: BarChart3,
    title: "Review",
    text: "Use project activity to guide the next step.",
  },
];
