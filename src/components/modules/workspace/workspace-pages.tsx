"use client";

import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  FileText,
  FolderKanban,
  Layers3,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast as toastManager } from "@/components/ui/toast";
import {
  useAddProjectMember,
  useAddTeamMember,
  useAttachLabel,
  useCompleteSprint,
  useCreateLabel,
  useCreateProject,
  useCreateSprint,
  useCreateSubtask,
  useCreateTask,
  useCreateTaskComment,
  useCreateTeam,
  useDeleteLabel,
  useDeleteProject,
  useDeleteSprint,
  useDeleteTask,
  useDeleteTaskAttachment,
  useDeleteTaskComment,
  useDeleteTeam,
  useGetMe,
  useLabels,
  useMoveTask,
  useMoveTaskStatus,
  useOrganization,
  useOrganizationActivity,
  useOrganizationMembers,
  useProject,
  useProjectMembers,
  useProjects,
  useRemoveProjectMember,
  useRemoveTeamMember,
  useSprints,
  useStartSprint,
  useSubtasks,
  useTaskActivity,
  useTaskAssignee,
  useTaskAttachments,
  useTaskComments,
  useTaskPriority,
  useTaskStatus,
  useTasks,
  useTeam,
  useTeamMembers,
  useTeams,
  useUpdateLabel,
  useUpdateProject,
  useUpdateSprint,
  useUpdateTask,
  useUpdateTaskComment,
  useUpdateTeam,
  useUploadTaskAttachment,
} from "@/hooks";
import { formatDate } from "@/lib/format";
import type {
  Label,
  Project,
  Sprint,
  Task,
  TaskPriority,
  TaskStatus,
  Team,
  WorkspaceActivity,
} from "@/types";

const fieldClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
const panelClass = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const toast = {
  success: (title: string) => toastManager.add({ title, type: "success" }),
  error: (description: string) =>
    toastManager.add({ title: "Action failed", description, type: "error" }),
};
const TASK_STATUSES: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
  "CANCELLED",
];

function WorkspaceError({ error }: { error: Error | null }) {
  return (
    <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
      {error?.message ?? "Something went wrong. Please try again."}
    </p>
  );
}

function WorkspaceLoading({ label = "Loading workspace" }: { label?: string }) {
  return (
    <output
      aria-label={label}
      className="block h-32 animate-pulse rounded-2xl bg-slate-100"
    />
  );
}

function WorkspaceHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-[0.18em] text-indigo-600 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function WorkspaceLinks({ orgId, active }: { orgId: string; active: string }) {
  const links = [
    {
      key: "overview",
      label: "Overview",
      href: `/user/organizations/${orgId}`,
    },
    {
      key: "teams",
      label: "Teams",
      href: `/user/organizations/${orgId}/teams`,
    },
    {
      key: "projects",
      label: "Projects",
      href: `/user/organizations/${orgId}/projects`,
    },
    {
      key: "labels",
      label: "Labels",
      href: `/user/organizations/${orgId}/labels`,
    },
    {
      key: "activity",
      label: "Activity",
      href: `/user/organizations/${orgId}/activity`,
    },
  ];
  return (
    <nav
      aria-label="Organization workspace"
      className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1"
    >
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          aria-current={active === link.key ? "page" : undefined}
          className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
            active === link.key
              ? "bg-indigo-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function OrganizationWorkspace({
  orgId,
  active,
  children,
}: {
  orgId: string;
  active: string;
  children: ReactNode;
}) {
  const { data, isPending, isError, error } = useOrganization(orgId);
  if (isPending) return <WorkspaceLoading label="Loading organization" />;
  if (isError || !data?.data) return <WorkspaceError error={error} />;
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
          <Layers3 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-slate-950">
            {data.data.name}
          </p>
          <p className="truncate text-sm text-slate-500">
            Organization workspace · {data.data.role}
          </p>
        </div>
        <Link
          href={`/user/organizations/${orgId}`}
          className="ml-auto hidden text-sm font-medium text-indigo-700 hover:underline sm:inline"
        >
          Organization settings
        </Link>
      </div>
      <WorkspaceLinks orgId={orgId} active={active} />
      {children}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FolderKanban;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
      <Icon className="mx-auto size-8 text-slate-400" />
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function TeamCard({ team, orgId }: { team: Team; orgId: string }) {
  return (
    <Link
      href={`/user/organizations/${orgId}/teams/${team.id}`}
      className={`${panelClass} group block p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
          <Users className="size-5" />
        </div>
        <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-indigo-600" />
      </div>
      <h3 className="mt-4 font-semibold text-slate-950">{team.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
        {team.description || "No description added yet."}
      </p>
      <p className="mt-4 text-xs font-medium text-indigo-700">Open team</p>
    </Link>
  );
}

export function TeamsWorkspace({ orgId }: { orgId: string }) {
  const organization = useOrganization(orgId);
  const canManage = organization.data?.data.role === "OWNER";
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const teams = useTeams(orgId, { page: 1, limit: 100 });
  const createTeam = useCreateTeam(orgId);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createTeam.mutateAsync({
        name: name.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
      setName("");
      setDescription("");
      setShowForm(false);
      toast.success("Team created");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create team",
      );
    }
  }
  return (
    <OrganizationWorkspace orgId={orgId} active="teams">
      <WorkspaceHeading
        eyebrow="People"
        title="Teams"
        description="Organize members into focused teams and connect them to projects."
        action={
          canManage ? (
            <Button onClick={() => setShowForm((value) => !value)}>
              <Plus className="size-4" /> Create team
            </Button>
          ) : undefined
        }
      />
      {canManage && showForm && (
        <form
          onSubmit={submit}
          className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
        >
          <Input
            required
            minLength={2}
            maxLength={50}
            placeholder="Team name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            maxLength={500}
            placeholder="Short description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" disabled={createTeam.isPending}>
              {createTeam.isPending ? "Creating..." : "Create team"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {teams.isPending ? (
        <WorkspaceLoading label="Loading teams" />
      ) : teams.isError ? (
        <WorkspaceError error={teams.error} />
      ) : teams.data?.data.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teams.data.data.map((team) => (
            <TeamCard key={team.id} team={team} orgId={orgId} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No teams yet"
          description="Create your first team to bring the right people together."
        />
      )}
    </OrganizationWorkspace>
  );
}

export function TeamDetailWorkspace({
  orgId,
  teamId,
}: {
  orgId: string;
  teamId: string;
}) {
  const organization = useOrganization(orgId);
  const canManage = organization.data?.data.role === "OWNER";
  const teamQuery = useTeam(teamId);
  const members = useTeamMembers(teamId, { page: 1, limit: 100 });
  const organizationMembers = useOrganizationMembers(orgId, {
    page: 1,
    limit: 100,
  });
  const [userId, setUserId] = useState("");
  const add = useAddTeamMember(teamId, orgId);
  const remove = useRemoveTeamMember(teamId, orgId);
  const deleteTeam = useDeleteTeam(orgId);
  const updateTeam = useUpdateTeam(teamId, orgId);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const team = teamQuery.data?.data;
  const memberIds = new Set(
    members.data?.data.map((member) => member.userId) ?? [],
  );
  const eligible =
    organizationMembers.data?.data.filter(
      (member) => !memberIds.has(member.user.id),
    ) ?? [];
  async function addMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId) return;
    try {
      await add.mutateAsync(userId);
      setUserId("");
      toast.success("Member added to team");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add member",
      );
    }
  }
  if (teamQuery.isPending) return <WorkspaceLoading label="Loading team" />;
  if (teamQuery.isError || !team)
    return <WorkspaceError error={teamQuery.error} />;
  return (
    <OrganizationWorkspace orgId={orgId} active="teams">
      <div className="space-y-5">
        <WorkspaceHeading
          eyebrow="Team"
          title={team.name}
          description={
            team.description || "Manage this team's organization members."
          }
          action={
            canManage ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEdit((value) => !value)}
                >
                  Edit team
                </Button>
                {confirmDelete ? (
                  <>
                    <Button
                      variant="destructive"
                      disabled={deleteTeam.isPending}
                      onClick={async () => {
                        try {
                          await deleteTeam.mutateAsync(team.id);
                          toast.success("Team deleted");
                          window.location.assign(
                            `/user/organizations/${orgId}/teams`,
                          );
                        } catch (error) {
                          toast.error(
                            error instanceof Error
                              ? error.message
                              : "Could not delete team",
                          );
                        }
                      }}
                    >
                      Confirm delete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <Trash2 className="size-4" /> Delete team
                  </Button>
                )}
              </div>
            ) : undefined
          }
        />
        {canManage && showEdit && (
          <form
            className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                await updateTeam.mutateAsync({
                  name: String(formData.get("name") ?? "").trim(),
                  description: String(formData.get("description") ?? "").trim(),
                });
                setShowEdit(false);
                toast.success("Team updated");
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Could not update team",
                );
              }
            }}
          >
            <Input
              name="name"
              required
              minLength={2}
              maxLength={150}
              defaultValue={team.name}
              aria-label="Team name"
            />
            <Input
              name="description"
              maxLength={500}
              defaultValue={team.description ?? ""}
              aria-label="Team description"
              placeholder="Description"
            />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={updateTeam.isPending}>
                Save team
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {canManage && (
          <form
            onSubmit={addMember}
            className={`${panelClass} flex flex-col gap-3 p-4 sm:flex-row`}
          >
            <select
              className={fieldClass}
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
              aria-label="Organization member to add"
            >
              <option value="">Select an organization member</option>
              {eligible.map(({ user }) => (
                <option key={user.id} value={user.id}>
                  {user.name} · {user.email}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              disabled={add.isPending || eligible.length === 0}
            >
              <Plus className="size-4" /> Add member
            </Button>
          </form>
        )}
        {members.isError && <WorkspaceError error={members.error} />}
        <div className={`${panelClass} divide-y divide-slate-100`}>
          <div className="p-5">
            <h2 className="font-semibold text-slate-950">
              Members{" "}
              <span className="text-slate-400">
                {members.data?.data.length ?? ""}
              </span>
            </h2>
          </div>
          {members.data?.data.map((member) => (
            <div key={member.userId} className="flex items-center gap-3 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">
                {member.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {member.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {member.email}
                </p>
              </div>
              {canManage && (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={remove.isPending}
                  aria-label={`Remove ${member.name}`}
                  onClick={async () => {
                    try {
                      await remove.mutateAsync(member.userId);
                      toast.success("Member removed");
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Could not remove member",
                      );
                    }
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {!members.isPending && !members.data?.data.length && (
            <p className="p-8 text-center text-sm text-slate-500">
              This team has no members yet.
            </p>
          )}
        </div>
      </div>
    </OrganizationWorkspace>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/user/projects/${project.id}`}
      className={`${panelClass} group block p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
          {project.key}
        </span>
        <Badge variant="secondary">{project.status.replaceAll("_", " ")}</Badge>
      </div>
      <h3 className="mt-4 font-semibold text-slate-950">{project.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
        {project.description || "A new project in your workspace."}
      </p>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500">
        <span>{project.team?.name ?? "Organization project"}</span>
        <span>
          {project.dueDate
            ? `Due ${formatDate(project.dueDate)}`
            : "No due date"}
        </span>
      </div>
    </Link>
  );
}

export function ProjectsWorkspace({ orgId }: { orgId: string }) {
  const organization = useOrganization(orgId);
  const canManage = organization.data?.data.role === "OWNER";
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [teamId, setTeamId] = useState("");
  const [description, setDescription] = useState("");
  const projects = useProjects(orgId, { page: 1, limit: 100 });
  const teams = useTeams(orgId, { page: 1, limit: 100 });
  const createProject = useCreateProject(orgId);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createProject.mutateAsync({
        name: name.trim(),
        key: key.trim().toUpperCase(),
        ...(teamId ? { teamId } : {}),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
      setName("");
      setKey("");
      setDescription("");
      setTeamId("");
      setShowForm(false);
      toast.success("Project created");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create project",
      );
    }
  }
  return (
    <OrganizationWorkspace orgId={orgId} active="projects">
      <WorkspaceHeading
        eyebrow="Delivery"
        title="Projects"
        description="Plan work, create tasks, and keep every project moving."
        action={
          canManage ? (
            <Button onClick={() => setShowForm((value) => !value)}>
              <Plus className="size-4" /> New project
            </Button>
          ) : undefined
        }
      />
      {canManage && showForm && (
        <form
          onSubmit={submit}
          className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
        >
          <Input
            required
            minLength={2}
            maxLength={100}
            placeholder="Project name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            required
            minLength={2}
            maxLength={10}
            placeholder="Project key (e.g. APP)"
            value={key}
            onChange={(event) =>
              setKey(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
            }
          />
          <select
            className={fieldClass}
            value={teamId}
            onChange={(event) => setTeamId(event.target.value)}
          >
            <option value="">No team (organization project)</option>
            {teams.data?.data.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <Input
            maxLength={2000}
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" disabled={createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {projects.isPending ? (
        <WorkspaceLoading label="Loading projects" />
      ) : projects.isError ? (
        <WorkspaceError error={projects.error} />
      ) : projects.data?.data.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.data.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create a project to start tracking tasks, milestones, and team progress."
        />
      )}
    </OrganizationWorkspace>
  );
}

function TaskDetails({
  task,
  project,
  canManage,
  draggable = false,
  onDragStart,
}: {
  task: Task;
  project: Project;
  canManage: boolean;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLButtonElement>) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [comment, setComment] = useState("");
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [labelId, setLabelId] = useState("");
  const status = useTaskStatus(project.id, task.id);
  const updateTask = useUpdateTask(project.id, task.id);
  const priority = useTaskPriority(project.id, task.id);
  const assignee = useTaskAssignee(project.id, task.id);
  const move = useMoveTask(project.id, task.id);
  const projectMembers = useProjectMembers(project.id, { page: 1, limit: 100 });
  const sprints = useSprints(project.id, { page: 1, limit: 100 });
  const labels = useLabels(project.organizationId, { page: 1, limit: 100 });
  const attachLabel = useAttachLabel(project.id, task.id);
  const comments = useTaskComments(task.id, { page: 1, limit: 50 });
  const createComment = useCreateTaskComment(task.id);
  const attachments = useTaskAttachments(task.id, { page: 1, limit: 50 });
  const upload = useUploadTaskAttachment(task.id);
  const deleteAttachment = useDeleteTaskAttachment(task.id);
  const subtasks = useSubtasks(task.id, { page: 1, limit: 50 });
  const createSubtask = useCreateSubtask(task.id, project.id);
  const activities = useTaskActivity(task.id, { page: 1, limit: 10 });
  async function addComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createComment.mutateAsync({ content: comment.trim() });
      setComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add comment",
      );
    }
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex w-full items-center gap-3 p-4">
        <button
          type="button"
          draggable={draggable}
          onDragStart={onDragStart}
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className={`flex min-w-0 flex-1 items-center gap-3 text-left ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          <ChevronDown
            className={`size-4 shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`}
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-slate-900">
              {task.title}
            </span>
            <span className="mt-1 block truncate text-xs text-slate-500">
              {task.description || "No description"}
              {task.assignee ? ` · ${task.assignee.name}` : ""}
            </span>
          </span>
        </button>
        <Badge variant="secondary">{task.priority}</Badge>
        <select
          className="max-w-36 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
          value={task.status}
          aria-label={`Status for ${task.title}`}
          onChange={async (event) => {
            try {
              await status.mutateAsync(event.target.value as TaskStatus);
              toast.success("Task status updated");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Status transition was rejected",
              );
            }
          }}
        >
          {TASK_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      {expanded && (
        <div className="space-y-5 border-t border-slate-100 p-4">
          {canManage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEdit((value) => !value)}
            >
              Edit task details
            </Button>
          )}
          {canManage && showEdit && (
            <form
              className="grid gap-2 sm:grid-cols-2"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                try {
                  await updateTask.mutateAsync({
                    title: String(formData.get("title") ?? "").trim(),
                    description: String(
                      formData.get("description") ?? "",
                    ).trim(),
                  });
                  setShowEdit(false);
                  toast.success("Task details updated");
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Could not update task",
                  );
                }
              }}
            >
              <Input
                name="title"
                required
                minLength={2}
                maxLength={200}
                defaultValue={task.title}
                aria-label="Task title"
              />
              <Textarea
                name="description"
                maxLength={5000}
                defaultValue={task.description ?? ""}
                placeholder="Description"
                className="sm:col-span-2"
              />
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" size="sm" disabled={updateTask.isPending}>
                  Save changes
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
          {task.description && (
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="space-y-1 text-xs font-medium text-slate-500">
              <span className="block">Priority</span>
              {canManage ? (
                <select
                  className={fieldClass}
                  value={task.priority}
                  onChange={async (event) => {
                    try {
                      await priority.mutateAsync(
                        event.target.value as TaskPriority,
                      );
                      toast.success("Task priority updated");
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Could not update priority",
                      );
                    }
                  }}
                >
                  {(["LOW", "MEDIUM", "HIGH", "URGENT"] as const).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <span className="block pt-2 text-sm text-slate-800">
                  {task.priority}
                </span>
              )}
            </div>
            <div className="space-y-1 text-xs font-medium text-slate-500">
              <span className="block">Assignee</span>
              {canManage ? (
                <select
                  className={fieldClass}
                  value={task.assigneeId ?? ""}
                  onChange={async (event) => {
                    try {
                      await assignee.mutateAsync(event.target.value || null);
                      toast.success("Task assignee updated");
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Could not update assignee",
                      );
                    }
                  }}
                >
                  <option value="">Unassigned</option>
                  {projectMembers.data?.data.map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="block pt-2 text-sm text-slate-800">
                  {task.assignee?.name ?? "Unassigned"}
                </span>
              )}
            </div>
            <div className="space-y-1 text-xs font-medium text-slate-500">
              <span className="block">Sprint</span>
              {canManage ? (
                <select
                  className={fieldClass}
                  value={task.sprintId ?? ""}
                  onChange={async (event) => {
                    try {
                      await move.mutateAsync({
                        sprintId: event.target.value || null,
                      });
                      toast.success("Task moved");
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Could not move task",
                      );
                    }
                  }}
                >
                  <option value="">Backlog</option>
                  {sprints.data?.data.map((sprint) => (
                    <option key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="block pt-2 text-sm text-slate-800">
                  {task.sprint?.name ?? "Backlog"}
                </span>
              )}
            </div>
          </div>
          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">
              Subtasks
            </h4>
            {subtasks.data?.data.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-2 py-1.5 text-sm text-slate-700"
              >
                <Check
                  className={`size-4 ${subtask.status === "DONE" ? "text-emerald-600" : "text-slate-300"}`}
                />
                <span className="min-w-0 flex-1 truncate">{subtask.title}</span>
                <span className="text-xs text-slate-400">
                  {subtask.status.replaceAll("_", " ")}
                </span>
              </div>
            ))}
            {canManage && (
              <form
                className="mt-2 flex gap-2"
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    await createSubtask.mutateAsync({
                      title: subtaskTitle.trim(),
                    });
                    setSubtaskTitle("");
                    toast.success("Subtask added");
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "Could not create subtask",
                    );
                  }
                }}
              >
                <Input
                  required
                  minLength={2}
                  maxLength={200}
                  value={subtaskTitle}
                  onChange={(event) => setSubtaskTitle(event.target.value)}
                  placeholder="Add a subtask"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={createSubtask.isPending}
                >
                  <Plus className="size-4" /> Add
                </Button>
              </form>
            )}
          </section>
          <section>
            <h4 className="text-sm font-semibold text-slate-900">
              Attach a label
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              The API does not currently expose task-label assignments for
              reading, so existing assignments cannot be shown here.
            </p>
            {canManage && (
              <form
                className="mt-2 flex flex-col gap-2 sm:flex-row"
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    await attachLabel.mutateAsync(labelId);
                    setLabelId("");
                    toast.success("Label attached to task");
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "Could not attach label",
                    );
                  }
                }}
              >
                <select
                  className={fieldClass}
                  value={labelId}
                  onChange={(event) => setLabelId(event.target.value)}
                  required
                >
                  <option value="">Choose an organization label</option>
                  {labels.data?.data.map((label) => (
                    <option key={label.id} value={label.id}>
                      {label.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  disabled={!labelId || attachLabel.isPending}
                >
                  Attach label
                </Button>
              </form>
            )}
          </section>
          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">
              Comments
            </h4>
            <div className="space-y-2">
              {comments.data?.data.map((item) => (
                <TaskCommentRow key={item.id} item={item} taskId={task.id} />
              ))}
            </div>
            <form
              onSubmit={addComment}
              className="mt-2 flex flex-col gap-2 sm:flex-row"
            >
              <Textarea
                required
                maxLength={5000}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write a comment..."
                className="min-h-10 flex-1"
              />
              <Button type="submit" disabled={createComment.isPending}>
                Comment
              </Button>
            </form>
          </section>
          <section>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-slate-900">
                Attachments
              </h4>
              {canManage && (
                <label className="cursor-pointer text-xs font-semibold text-indigo-700 hover:underline">
                  Upload file
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png,image/webp,application/pdf,.doc,.docx,.xls,.xlsx"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      if (file.size > 100 * 1024 * 1024) {
                        toast.error(
                          "Files must be 100 MB or smaller. Your plan may have a lower limit.",
                        );
                        event.target.value = "";
                        return;
                      }
                      try {
                        await upload.mutateAsync(file);
                        toast.success("File uploaded");
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : "Could not upload file",
                        );
                      } finally {
                        event.target.value = "";
                      }
                    }}
                  />
                </label>
              )}
            </div>
            {attachments.data?.data.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 border-t border-slate-100 py-2 text-sm"
              >
                <FileText className="size-4 shrink-0 text-slate-400" />
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 truncate text-indigo-700 hover:underline"
                >
                  {file.fileName}
                </a>
                <span className="text-xs text-slate-400">
                  {(file.fileSize / (1024 * 1024)).toFixed(1)} MB
                </span>
                {canManage && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${file.fileName}`}
                    disabled={deleteAttachment.isPending}
                    onClick={async () => {
                      try {
                        await deleteAttachment.mutateAsync(file.id);
                        toast.success("Attachment deleted");
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : "Could not delete attachment",
                        );
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </section>
          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">
              Task activity
            </h4>
            <div className="space-y-2">
              {activities.data?.data.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
              {!activities.isPending && !activities.data?.data.length && (
                <p className="text-xs text-slate-500">
                  No activity recorded yet.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function TaskCommentRow({
  item,
  taskId,
}: {
  item: {
    id: string;
    content: string;
    createdAt: string;
    author: { id: string; name: string };
  };
  taskId: string;
}) {
  const currentUser = useGetMe();
  const update = useUpdateTaskComment(taskId, item.id);
  const remove = useDeleteTaskComment(taskId);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const canEdit =
    currentUser.data?.data.id === item.author.id ||
    currentUser.data?.data.systemRole === "ADMIN" ||
    currentUser.data?.data.systemRole === "SUPER_ADMIN";
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-800">{item.author.name}</span>
        <time>{formatDate(item.createdAt)}</time>
      </div>
      {editing ? (
        <form
          className="mt-2 space-y-2"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await update.mutateAsync({ content: content.trim() });
              setEditing(false);
              toast.success("Comment updated");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Could not update comment",
              );
            }
          }}
        >
          <Textarea
            required
            maxLength={5000}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={update.isPending}>
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setContent(item.content);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
          {item.content}
        </p>
      )}
      {canEdit && !editing && (
        <div className="mt-2 flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={remove.isPending}
            onClick={async () => {
              if (!window.confirm("Delete this comment?")) return;
              try {
                await remove.mutateAsync(item.id);
                toast.success("Comment deleted");
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Could not delete comment",
                );
              }
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

function ActivityRow({ item }: { item: WorkspaceActivity }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <Activity className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-700">
          <span className="font-medium">{item.actor?.name ?? "A member"}</span>{" "}
          · {item.action.replaceAll("_", " ").toLowerCase()}
        </p>
        <time className="text-xs text-slate-400">
          {formatDate(item.createdAt)}
        </time>
      </div>
    </div>
  );
}

function ProjectTasks({
  project,
  canManage,
}: {
  project: Project;
  canManage: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("MEDIUM");
  const [newAssigneeId, setNewAssigneeId] = useState("");
  const [newSprintId, setNewSprintId] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sprintFilter, setSprintFilter] = useState("");
  const [view, setView] = useState<"list" | "board">("list");
  const projectMembers = useProjectMembers(project.id, { page: 1, limit: 100 });
  const tasks = useTasks(project.id, {
    page: 1,
    limit: 100,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(statusFilter ? { status: statusFilter as TaskStatus } : {}),
    ...(priorityFilter ? { priority: priorityFilter as TaskPriority } : {}),
    ...(sprintFilter ? { sprintId: sprintFilter } : {}),
  });
  const createTask = useCreateTask(project.id);
  const deleteTask = useDeleteTask(project.id);
  const moveTaskStatus = useMoveTaskStatus(project.id);
  const sprints = useSprints(project.id, { page: 1, limit: 100 });
  return (
    <section className="space-y-4">
      {canManage && (
        <form
          className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await createTask.mutateAsync({
                title: title.trim(),
                ...(description.trim()
                  ? { description: description.trim() }
                  : {}),
                priority: newPriority,
                ...(newAssigneeId ? { assigneeId: newAssigneeId } : {}),
                ...(newSprintId ? { sprintId: newSprintId } : {}),
                ...(newDueDate
                  ? {
                      dueDate: new Date(`${newDueDate}T00:00:00`).toISOString(),
                    }
                  : {}),
              });
              setTitle("");
              setDescription("");
              setNewPriority("MEDIUM");
              setNewAssigneeId("");
              setNewSprintId("");
              setNewDueDate("");
              toast.success("Task created");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Could not create task",
              );
            }
          }}
        >
          <Input
            required
            minLength={2}
            maxLength={200}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
          />
          <select
            className={fieldClass}
            value={newPriority}
            onChange={(event) =>
              setNewPriority(event.target.value as TaskPriority)
            }
            aria-label="Task priority"
          >
            {(["LOW", "MEDIUM", "HIGH", "URGENT"] as const).map((value) => (
              <option key={value} value={value}>
                {value} priority
              </option>
            ))}
          </select>
          <Textarea
            maxLength={5000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Task description (optional)"
            className="sm:col-span-2"
          />
          <select
            className={fieldClass}
            value={newAssigneeId}
            onChange={(event) => setNewAssigneeId(event.target.value)}
            aria-label="Task assignee"
          >
            <option value="">Unassigned</option>
            {projectMembers.data?.data.map((member) => (
              <option key={member.userId} value={member.userId}>
                {member.name}
              </option>
            ))}
          </select>
          <select
            className={fieldClass}
            value={newSprintId}
            onChange={(event) => setNewSprintId(event.target.value)}
            aria-label="Task sprint"
          >
            <option value="">Backlog</option>
            {sprints.data?.data.map((sprint) => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.name}
              </option>
            ))}
          </select>
          <div className="text-xs font-medium text-slate-500">
            <span className="block">Due date</span>
            <Input
              type="date"
              className="mt-1"
              value={newDueDate}
              onChange={(event) => setNewDueDate(event.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={createTask.isPending}>
              <Plus className="size-4" /> Add task
            </Button>
          </div>
        </form>
      )}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
        <select
          className={fieldClass}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <select
          className={fieldClass}
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {(["LOW", "MEDIUM", "HIGH", "URGENT"] as const).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <select
          className={fieldClass}
          value={sprintFilter}
          onChange={(event) => setSprintFilter(event.target.value)}
          aria-label="Filter by sprint"
        >
          <option value="">All sprints</option>
          {sprints.data?.data.map((sprint) => (
            <option key={sprint.id} value={sprint.id}>
              {sprint.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-1">
        {(["list", "board"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={view === mode}
            onClick={() => setView(mode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ${
              view === mode
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
      {tasks.isPending ? (
        <WorkspaceLoading label="Loading tasks" />
      ) : tasks.isError ? (
        <WorkspaceError error={tasks.error} />
      ) : tasks.data?.data.length ? (
        view === "list" ? (
          <div className="space-y-2">
            {tasks.data.data.map((task) => (
              <div key={task.id} className="space-y-2">
                <TaskDetails
                  task={task}
                  project={project}
                  canManage={canManage}
                />
                {canManage && (
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deleteTask.isPending}
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Delete "${task.title}"? This cannot be undone.`,
                          )
                        )
                          return;
                        try {
                          await deleteTask.mutateAsync(task.id);
                          toast.success("Task deleted");
                        } catch (error) {
                          toast.error(
                            error instanceof Error
                              ? error.message
                              : "Could not delete task",
                          );
                        }
                      }}
                    >
                      <Trash2 className="size-3.5" /> Delete task
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
            {TASK_STATUSES.map((status) => {
              const statusTasks = tasks.data.data.filter(
                (task) => task.status === status,
              );
              return (
                <section
                  key={status}
                  aria-label={`Drop tasks in ${status.replaceAll("_", " ")}`}
                  className="w-[min(84vw,340px)] shrink-0 snap-start rounded-xl bg-slate-100/80 p-3"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={async (event) => {
                    event.preventDefault();
                    const taskId = event.dataTransfer.getData("text/task-id");
                    if (!taskId) return;
                    const draggedTask = tasks.data.data.find(
                      (task) => task.id === taskId,
                    );
                    if (!draggedTask || draggedTask.status === status) return;
                    try {
                      await moveTaskStatus.mutateAsync({ taskId, status });
                      toast.success("Task moved");
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Could not move task",
                      );
                    }
                  }}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {status.replaceAll("_", " ")}
                    </h3>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">
                      {statusTasks.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {statusTasks.map((task) => (
                      <TaskDetails
                        key={task.id}
                        task={task}
                        project={project}
                        canManage={canManage}
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/task-id", task.id);
                        }}
                      />
                    ))}
                    {!statusTasks.length && (
                      <p className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">
                        No tasks in this status
                      </p>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )
      ) : (
        <EmptyState
          icon={CircleDot}
          title="Nothing on the board yet"
          description="Add your first task, or adjust the filters to see more work."
        />
      )}
      <p className="text-xs text-slate-400">
        Task status changes are checked by the server; invalid transitions are
        reported here.
      </p>
    </section>
  );
}

function ProjectSprints({
  projectId,
  canManage,
}: {
  projectId: string;
  canManage: boolean;
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const sprints = useSprints(projectId, { page: 1, limit: 100 });
  const create = useCreateSprint(projectId);
  const remove = useDeleteSprint(projectId);
  return (
    <section className="space-y-4">
      {canManage && (
        <form
          className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await create.mutateAsync({
                name: name.trim(),
                ...(goal.trim() ? { goal: goal.trim() } : {}),
              });
              setName("");
              setGoal("");
              toast.success("Sprint created");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Could not create sprint",
              );
            }
          }}
        >
          <Input
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Sprint name"
          />
          <Input
            maxLength={1000}
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="Sprint goal (optional)"
          />
          <div>
            <Button type="submit" disabled={create.isPending}>
              <Plus className="size-4" /> Create sprint
            </Button>
          </div>
        </form>
      )}
      {sprints.isPending ? (
        <WorkspaceLoading label="Loading sprints" />
      ) : sprints.isError ? (
        <WorkspaceError error={sprints.error} />
      ) : sprints.data?.data.length ? (
        <div className="space-y-3">
          {sprints.data.data.map((sprint) => (
            <SprintCard
              key={sprint.id}
              sprint={sprint}
              projectId={projectId}
              remove={remove}
              canManage={canManage}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Layers3}
          title="No sprints planned"
          description="Create a sprint to group work into a time-boxed delivery cycle."
        />
      )}
    </section>
  );
}

function SprintCard({
  sprint,
  projectId,
  remove,
  canManage,
}: {
  sprint: Sprint;
  projectId: string;
  remove: ReturnType<typeof useDeleteSprint>;
  canManage: boolean;
}) {
  const start = useStartSprint(sprint.id, projectId);
  const complete = useCompleteSprint(sprint.id, projectId);
  const update = useUpdateSprint(sprint.id, projectId);
  const [showEdit, setShowEdit] = useState(false);
  async function run(action: "start" | "complete" | "delete") {
    try {
      if (action === "start") await start.mutateAsync();
      if (action === "complete") await complete.mutateAsync();
      if (action === "delete") await remove.mutateAsync(sprint.id);
      toast.success(
        action === "delete"
          ? "Sprint deleted"
          : `Sprint ${action === "start" ? "started" : "completed"}`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Sprint action could not be completed",
      );
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle className="text-base">{sprint.name}</CardTitle>
          {sprint.goal && (
            <p className="mt-1 text-sm text-slate-500">{sprint.goal}</p>
          )}
        </div>
        <Badge variant={sprint.status === "ACTIVE" ? "default" : "secondary"}>
          {sprint.status}
        </Badge>
      </CardHeader>
      {canManage && sprint.status === "PLANNED" && showEdit && (
        <CardContent>
          <form
            className="grid gap-2 sm:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                await update.mutateAsync({
                  name: String(formData.get("name") ?? "").trim(),
                  goal: String(formData.get("goal") ?? "").trim(),
                  startDate: String(formData.get("startDate") ?? "") || null,
                  endDate: String(formData.get("endDate") ?? "") || null,
                });
                setShowEdit(false);
                toast.success("Sprint updated");
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Could not update sprint",
                );
              }
            }}
          >
            <Input
              name="name"
              required
              minLength={2}
              maxLength={100}
              defaultValue={sprint.name}
              aria-label="Sprint name"
            />
            <Input
              name="goal"
              maxLength={1000}
              defaultValue={sprint.goal ?? ""}
              placeholder="Sprint goal"
            />
            <Input
              name="startDate"
              type="date"
              defaultValue={sprint.startDate?.slice(0, 10) ?? ""}
              aria-label="Sprint start date"
            />
            <Input
              name="endDate"
              type="date"
              defaultValue={sprint.endDate?.slice(0, 10) ?? ""}
              aria-label="Sprint end date"
            />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" size="sm" disabled={update.isPending}>
                Save sprint
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
      <CardContent className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          {sprint.startDate ? formatDate(sprint.startDate) : "No start date"}
          {" – "}
          {sprint.endDate ? formatDate(sprint.endDate) : "No end date"}
        </p>
        <div className="flex gap-2">
          {canManage && sprint.status === "PLANNED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowEdit((value) => !value)}
            >
              Edit
            </Button>
          )}
          {canManage && sprint.status === "PLANNED" && (
            <Button
              size="sm"
              onClick={() => void run("start")}
              disabled={start.isPending}
            >
              Start sprint
            </Button>
          )}
          {canManage && sprint.status === "ACTIVE" && (
            <Button
              size="sm"
              onClick={() => void run("complete")}
              disabled={complete.isPending}
            >
              Complete sprint
            </Button>
          )}
          {canManage && sprint.status === "PLANNED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => void run("delete")}
              disabled={remove.isPending}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectPeople({
  project,
  orgId,
}: {
  project: Project;
  orgId: string;
}) {
  const members = useProjectMembers(project.id, { page: 1, limit: 100 });
  const organizationMembers = useOrganizationMembers(orgId, {
    page: 1,
    limit: 100,
  });
  const [userId, setUserId] = useState("");
  const add = useAddProjectMember(project.id, orgId);
  const remove = useRemoveProjectMember(project.id, orgId);
  const currentIds = new Set(
    members.data?.data.map((member) => member.userId) ?? [],
  );
  const available =
    organizationMembers.data?.data.filter(
      (member) => !currentIds.has(member.user.id),
    ) ?? [];
  return (
    <section className="space-y-4">
      <form
        className={`${panelClass} flex flex-col gap-3 p-4 sm:flex-row`}
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await add.mutateAsync(userId);
            setUserId("");
            toast.success("Project member added");
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Could not add project member",
            );
          }
        }}
      >
        <select
          className={fieldClass}
          required
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        >
          <option value="">Select an organization member</option>
          {available.map(({ user }) => (
            <option key={user.id} value={user.id}>
              {user.name} · {user.email}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={add.isPending || !available.length}>
          <Plus className="size-4" /> Add member
        </Button>
      </form>
      {members.isError && <WorkspaceError error={members.error} />}
      <div className={`${panelClass} divide-y divide-slate-100`}>
        {members.data?.data.map((member) => (
          <div key={member.userId} className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">
              {member.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="truncate text-xs text-slate-500">{member.email}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              disabled={remove.isPending}
              onClick={async () => {
                try {
                  await remove.mutateAsync(member.userId);
                  toast.success("Project member removed");
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Could not remove project member",
                  );
                }
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        {!members.isPending && !members.data?.data.length && (
          <p className="p-8 text-center text-sm text-slate-500">
            No project members have been added yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectWorkspace({
  project,
  orgId,
  initialTab = "tasks",
}: {
  project: Project;
  orgId: string;
  initialTab?: "tasks" | "sprints";
}) {
  const organization = useOrganization(orgId);
  const canManage = organization.data?.data.role === "OWNER";
  const [tab, setTab] = useState<"tasks" | "sprints" | "members" | "activity">(
    initialTab,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const removeProject = useDeleteProject(orgId);
  const updateProject = useUpdateProject(project.id, orgId);
  const teams = useTeams(orgId, { page: 1, limit: 100 });
  const tabs = [
    { id: "tasks", label: "Tasks" },
    { id: "sprints", label: "Sprints" },
    ...(canManage ? [{ id: "members" as const, label: "Members" }] : []),
    { id: "activity", label: "Activity" },
  ] as const;
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <Link
            href={`/user/organizations/${orgId}/projects`}
            className="text-sm font-medium text-indigo-700 hover:underline"
          >
            ← All projects
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700">
              {project.key}
            </span>
            <Badge variant="secondary">
              {project.status.replaceAll("_", " ")}
            </Badge>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {project.name}
          </h1>
          {project.description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {project.description}
            </p>
          )}
        </div>
        {canManage && (
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => setShowEdit((value) => !value)}
          >
            Edit details
          </Button>
        )}
        {canManage && confirmDelete ? (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="destructive"
              disabled={removeProject.isPending}
              onClick={async () => {
                try {
                  await removeProject.mutateAsync(project.id);
                  toast.success("Project deleted");
                  window.location.assign(
                    `/user/organizations/${orgId}/projects`,
                  );
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Could not delete project",
                  );
                }
              }}
            >
              Confirm delete
            </Button>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </div>
        ) : canManage ? (
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Delete project</span>
          </Button>
        ) : null}
      </div>
      {canManage && showEdit && (
        <form
          className={`${panelClass} grid gap-3 p-4 sm:grid-cols-2`}
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const dateValue = (name: string) =>
              String(formData.get(name) ?? "") || null;
            try {
              await updateProject.mutateAsync({
                name: String(formData.get("name") ?? "").trim(),
                description: String(formData.get("description") ?? "").trim(),
                teamId: String(formData.get("teamId") ?? "") || null,
                startDate: dateValue("startDate"),
                dueDate: dateValue("dueDate"),
              });
              setShowEdit(false);
              toast.success("Project updated");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Could not update project",
              );
            }
          }}
        >
          <Input
            name="name"
            required
            minLength={2}
            maxLength={150}
            defaultValue={project.name}
            aria-label="Project name"
          />
          <Input
            value={project.key}
            readOnly
            aria-label="Project key (cannot be changed)"
          />
          <Textarea
            name="description"
            maxLength={2000}
            defaultValue={project.description ?? ""}
            placeholder="Description"
            className="sm:col-span-2"
          />
          <select
            className={fieldClass}
            name="teamId"
            defaultValue={project.teamId ?? ""}
            aria-label="Project team"
          >
            <option value="">No team</option>
            {teams.data?.data.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <Input
              name="startDate"
              type="date"
              defaultValue={project.startDate?.slice(0, 10) ?? ""}
              aria-label="Project start date"
            />
            <Input
              name="dueDate"
              type="date"
              defaultValue={project.dueDate?.slice(0, 10) ?? ""}
              aria-label="Project due date"
            />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" disabled={updateProject.isPending}>
              Save project
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      <nav
        aria-label="Project sections"
        className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1"
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-current={tab === id ? "page" : undefined}
            onClick={() => setTab(id)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${tab === id ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      {tab === "tasks" && (
        <ProjectTasks project={project} canManage={canManage} />
      )}
      {tab === "sprints" && (
        <ProjectSprints projectId={project.id} canManage={canManage} />
      )}
      {tab === "members" && canManage && (
        <ProjectPeople project={project} orgId={orgId} />
      )}
      {tab === "activity" && (
        <OrganizationActivityFeed
          orgId={orgId}
          entityType="PROJECT"
          entityId={project.id}
        />
      )}
    </div>
  );
}

export function ProjectDetailWorkspace({ projectId }: { projectId: string }) {
  const projectQuery = useProject(projectId);
  const project = projectQuery.data?.data;
  if (projectQuery.isPending)
    return <WorkspaceLoading label="Loading project" />;
  if (projectQuery.isError || !project)
    return <WorkspaceError error={projectQuery.error} />;
  return <ProjectWorkspace project={project} orgId={project.organizationId} />;
}

export function ProjectSprintWorkspace({ projectId }: { projectId: string }) {
  return <ProjectWorkspaceRoute projectId={projectId} initialTab="sprints" />;
}

function ProjectWorkspaceRoute({
  projectId,
  initialTab,
}: {
  projectId: string;
  initialTab: "tasks" | "sprints";
}) {
  const projectQuery = useProject(projectId);
  if (projectQuery.isPending)
    return <WorkspaceLoading label="Loading project" />;
  if (projectQuery.isError || !projectQuery.data?.data)
    return <WorkspaceError error={projectQuery.error} />;
  return (
    <ProjectWorkspace
      project={projectQuery.data.data}
      orgId={projectQuery.data.data.organizationId}
      initialTab={initialTab}
    />
  );
}

export function OrganizationLabelsWorkspace({ orgId }: { orgId: string }) {
  const organization = useOrganization(orgId);
  const canManage = organization.data?.data.role === "OWNER";
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [search, setSearch] = useState("");
  const labels = useLabelsForWorkspace(orgId, search);
  const create = useCreateLabel(orgId);
  const remove = useDeleteLabel(orgId);
  return (
    <OrganizationWorkspace orgId={orgId} active="labels">
      <WorkspaceHeading
        eyebrow="Taxonomy"
        title="Labels"
        description="Create organization-wide labels to categorize and find work."
      />
      {canManage && (
        <form
          className={`${panelClass} flex flex-col gap-3 p-4 sm:flex-row`}
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await create.mutateAsync({ name: name.trim(), color });
              setName("");
              toast.success("Label created");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Could not create label",
              );
            }
          }}
        >
          <Input
            required
            minLength={1}
            maxLength={50}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="New label name"
          />
          <input
            aria-label="Label color"
            type="color"
            className="h-10 w-16 cursor-pointer rounded border border-slate-200 p-1"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
          <Button type="submit" disabled={create.isPending}>
            <Plus className="size-4" /> Create label
          </Button>
        </form>
      )}
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search labels..."
        aria-label="Search labels"
      />
      {labels.isPending ? (
        <WorkspaceLoading label="Loading labels" />
      ) : labels.isError ? (
        <WorkspaceError error={labels.error} />
      ) : labels.data?.data.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {labels.data.data.map((label) => (
            <LabelCard
              key={label.id}
              label={label}
              remove={remove}
              canManage={canManage}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Layers3}
          title="No labels found"
          description="Labels help everyone use the same categories across the organization."
        />
      )}
    </OrganizationWorkspace>
  );
}

function useLabelsForWorkspace(orgId: string, search: string) {
  const labelsQuery = useLabels(orgId, {
    page: 1,
    limit: 100,
    ...(search.trim() ? { search: search.trim() } : {}),
  });
  return labelsQuery;
}

function LabelCard({
  label,
  remove,
  canManage,
}: {
  label: Label;
  remove: ReturnType<typeof useDeleteLabel>;
  canManage: boolean;
}) {
  const update = useUpdateLabel(label.organizationId, label.id);
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState(label.color ?? "#6366f1");
  if (editing) {
    return (
      <form
        className={`${panelClass} flex flex-col gap-2 p-4 sm:flex-row`}
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          try {
            await update.mutateAsync({
              name: String(formData.get("name") ?? "").trim(),
              color,
            });
            setEditing(false);
            toast.success("Label updated");
          } catch (error) {
            toast.error(
              error instanceof Error ? error.message : "Could not update label",
            );
          }
        }}
      >
        <Input
          name="name"
          required
          minLength={1}
          maxLength={100}
          defaultValue={label.name}
          aria-label="Label name"
        />
        <input
          aria-label="Label color"
          type="color"
          className="h-10 w-16 cursor-pointer rounded border border-slate-200 p-1"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <Button type="submit" size="sm" disabled={update.isPending}>
          Save
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setEditing(false)}
        >
          Cancel
        </Button>
      </form>
    );
  }
  return (
    <div className={`${panelClass} flex items-center gap-3 p-4`}>
      <span
        className="size-3 shrink-0 rounded-full"
        style={{ backgroundColor: label.color || "#94a3b8" }}
      />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">
        {label.name}
      </span>
      <span className="text-xs text-slate-400">
        {label.color || "No color"}
      </span>
      {canManage && (
        <>
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${label.name}`}
            disabled={remove.isPending}
            onClick={async () => {
              if (!window.confirm(`Delete label "${label.name}"?`)) return;
              try {
                await remove.mutateAsync(label.id);
                toast.success("Label deleted");
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Could not delete label",
                );
              }
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}

export function OrganizationActivityWorkspace({ orgId }: { orgId: string }) {
  return (
    <OrganizationWorkspace orgId={orgId} active="activity">
      <WorkspaceHeading
        eyebrow="Timeline"
        title="Organization activity"
        description="A chronological view of changes recorded across this organization."
      />
      <OrganizationActivityFeed orgId={orgId} />
    </OrganizationWorkspace>
  );
}

function OrganizationActivityFeed({
  orgId,
  entityType,
  entityId,
}: {
  orgId: string;
  entityType?: string;
  entityId?: string;
}) {
  const filters = {
    page: 1,
    limit: 50,
    ...(entityType ? { entityType } : {}),
    ...(entityId ? { entityId } : {}),
  };
  const activity = useOrganizationActivity(orgId, filters);
  if (activity.isPending) return <WorkspaceLoading label="Loading activity" />;
  if (activity.isError) return <WorkspaceError error={activity.error} />;
  if (!activity.data?.data.length)
    return (
      <EmptyState
        icon={Activity}
        title="No activity yet"
        description="Updates and events will appear here as your team works."
      />
    );
  return (
    <div className={`${panelClass} divide-y divide-slate-100 p-4 sm:p-6`}>
      {activity.data.data.map((item) => (
        <ActivityRow key={item.id} item={item} />
      ))}
    </div>
  );
}
