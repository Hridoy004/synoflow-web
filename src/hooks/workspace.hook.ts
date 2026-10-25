import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addProjectMember,
  addTeamMember,
  attachLabel,
  completeSprint,
  createLabel,
  createProject,
  createSprint,
  createSubtask,
  createTask,
  createTaskComment,
  createTeam,
  deleteLabel,
  deleteProject,
  deleteSprint,
  deleteTask,
  deleteTaskAttachment,
  deleteTaskComment,
  deleteTeam,
  detachLabel,
  getLabels,
  getOrganizationActivity,
  getProject,
  getProjectMembers,
  getProjects,
  getSprint,
  getSprints,
  getSubtasks,
  getTask,
  getTaskActivity,
  getTaskAttachments,
  getTaskComments,
  getTasks,
  getTeam,
  getTeamMembers,
  getTeams,
  moveTask,
  removeProjectMember,
  removeTeamMember,
  startSprint,
  updateLabel,
  updateProject,
  updateSprint,
  updateTask,
  updateTaskAssignee,
  updateTaskComment,
  updateTaskPriority,
  updateTaskStatus,
  updateTeam,
  uploadTaskAttachment,
} from "@/api";
import type {
  ActivityFilters,
  LabelFilters,
  LabelInput,
  ProjectInput,
  SprintInput,
  TaskCommentInput,
  TaskFilters,
  TaskInput,
  TaskMoveInput,
  TaskPriority,
  TaskStatus,
  TeamInput,
} from "@/types";

export const workspaceKeys = {
  all: ["workspace"] as const,
  teams: (organizationId: string) =>
    [...workspaceKeys.all, "teams", organizationId] as const,
  teamList: (
    organizationId: string,
    filters: { page: number; limit: number },
  ) => [...workspaceKeys.teams(organizationId), filters] as const,
  team: (teamId: string) => [...workspaceKeys.all, "team", teamId] as const,
  teamMembers: (teamId: string, page: number, limit: number) =>
    [...workspaceKeys.team(teamId), "members", { page, limit }] as const,
  projects: (organizationId: string) =>
    [...workspaceKeys.all, "projects", organizationId] as const,
  projectList: (
    organizationId: string,
    filters: { page: number; limit: number; search?: string },
  ) => [...workspaceKeys.projects(organizationId), filters] as const,
  project: (projectId: string) =>
    [...workspaceKeys.all, "project", projectId] as const,
  projectMembers: (projectId: string, page: number, limit: number) =>
    [...workspaceKeys.project(projectId), "members", { page, limit }] as const,
  sprints: (projectId: string) =>
    [...workspaceKeys.all, "sprints", projectId] as const,
  sprintList: (projectId: string, page: number, limit: number) =>
    [...workspaceKeys.sprints(projectId), { page, limit }] as const,
  sprint: (sprintId: string) =>
    [...workspaceKeys.all, "sprint", sprintId] as const,
  tasks: (projectId: string) =>
    [...workspaceKeys.all, "tasks", projectId] as const,
  taskList: (projectId: string, filters: TaskFilters) =>
    [...workspaceKeys.tasks(projectId), filters] as const,
  task: (taskId: string) => [...workspaceKeys.all, "task", taskId] as const,
  subtasks: (taskId: string, filters: TaskFilters) =>
    [...workspaceKeys.task(taskId), "subtasks", filters] as const,
  labels: (organizationId: string) =>
    [...workspaceKeys.all, "labels", organizationId] as const,
  labelList: (organizationId: string, filters: LabelFilters) =>
    [...workspaceKeys.labels(organizationId), filters] as const,
  comments: (taskId: string) =>
    [...workspaceKeys.task(taskId), "comments"] as const,
  commentList: (taskId: string, page: number, limit: number) =>
    [...workspaceKeys.comments(taskId), { page, limit }] as const,
  attachments: (taskId: string) =>
    [...workspaceKeys.task(taskId), "attachments"] as const,
  attachmentList: (taskId: string, page: number, limit: number) =>
    [...workspaceKeys.attachments(taskId), { page, limit }] as const,
  organizationActivity: (organizationId: string, filters: ActivityFilters) =>
    [
      ...workspaceKeys.all,
      "organization-activity",
      organizationId,
      filters,
    ] as const,
  taskActivity: (taskId: string, filters: ActivityFilters) =>
    [...workspaceKeys.task(taskId), "activity", filters] as const,
};

const DEFAULT_LIST = { page: 1, limit: 20 };

export function useTeams(
  organizationId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 10 };
  return useQuery({
    queryKey: workspaceKeys.teamList(organizationId, normalized),
    queryFn: () => getTeams(organizationId, normalized),
    enabled: Boolean(organizationId),
    placeholderData: keepPreviousData,
  });
}

export function useTeam(teamId: string) {
  return useQuery({
    queryKey: workspaceKeys.team(teamId),
    queryFn: () => getTeam(teamId),
    enabled: Boolean(teamId),
  });
}

export function useTeamMembers(
  teamId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 10 };
  return useQuery({
    queryKey: workspaceKeys.teamMembers(
      teamId,
      normalized.page,
      normalized.limit,
    ),
    queryFn: () => getTeamMembers(teamId, normalized),
    enabled: Boolean(teamId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTeam(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TeamInput) => createTeam(organizationId, payload),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: workspaceKeys.teams(organizationId),
      }),
  });
}

export function useUpdateTeam(teamId: string, organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<TeamInput>) => updateTeam(teamId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.team(teamId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.teams(organizationId),
        }),
      ]),
  });
}

export function useDeleteTeam(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: (_result, teamId) =>
      Promise.all([
        client.removeQueries({ queryKey: workspaceKeys.team(teamId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.teams(organizationId),
        }),
      ]),
  });
}

export function useAddTeamMember(teamId: string, organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => addTeamMember(teamId, { userId }),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.team(teamId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.teamMembers(teamId, 1, 10),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.teams(organizationId),
        }),
      ]),
  });
}

export function useRemoveTeamMember(teamId: string, organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeTeamMember(teamId, userId),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.teamMembers(teamId, 1, 10),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.teams(organizationId),
        }),
      ]),
  });
}

export function useProjects(
  organizationId: string,
  filters: { page?: number; limit?: number; search?: string } = {},
) {
  const normalized = {
    page: filters.page ?? 1,
    limit: filters.limit ?? 10,
    ...(filters.search ? { search: filters.search } : {}),
  };
  return useQuery({
    queryKey: workspaceKeys.projectList(organizationId, normalized),
    queryFn: () => getProjects(organizationId, normalized),
    enabled: Boolean(organizationId),
    placeholderData: keepPreviousData,
  });
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: workspaceKeys.project(projectId),
    queryFn: () => getProject(projectId),
    enabled: Boolean(projectId),
  });
}

export function useProjectMembers(
  projectId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 10 };
  return useQuery({
    queryKey: workspaceKeys.projectMembers(
      projectId,
      normalized.page,
      normalized.limit,
    ),
    queryFn: () => getProjectMembers(projectId, normalized),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateProject(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProjectInput) =>
      createProject(organizationId, payload),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: workspaceKeys.projects(organizationId),
      }),
  });
}

export function useUpdateProject(projectId: string, organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ProjectInput>) =>
      updateProject(projectId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.project(projectId),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.projects(organizationId),
        }),
      ]),
  });
}

export function useDeleteProject(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_result, projectId) =>
      Promise.all([
        client.removeQueries({ queryKey: workspaceKeys.project(projectId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.projects(organizationId),
        }),
      ]),
  });
}

export function useAddProjectMember(projectId: string, organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => addProjectMember(projectId, { userId }),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.projectMembers(projectId, 1, 10),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.projects(organizationId),
        }),
      ]),
  });
}

export function useRemoveProjectMember(
  projectId: string,
  organizationId: string,
) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => removeProjectMember(projectId, userId),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.projectMembers(projectId, 1, 10),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.projects(organizationId),
        }),
      ]),
  });
}

export function useSprints(
  projectId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 10 };
  return useQuery({
    queryKey: workspaceKeys.sprintList(
      projectId,
      normalized.page,
      normalized.limit,
    ),
    queryFn: () => getSprints(projectId, normalized),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}

export function useSprint(sprintId: string) {
  return useQuery({
    queryKey: workspaceKeys.sprint(sprintId),
    queryFn: () => getSprint(sprintId),
    enabled: Boolean(sprintId),
  });
}

export function useCreateSprint(projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: SprintInput) => createSprint(projectId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useUpdateSprint(sprintId: string, projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SprintInput>) =>
      updateSprint(sprintId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.sprint(sprintId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
      ]),
  });
}

export function useStartSprint(sprintId: string, projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => startSprint(sprintId),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.sprint(sprintId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useCompleteSprint(sprintId: string, projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => completeSprint(sprintId),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.sprint(sprintId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useDeleteSprint(projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteSprint,
    onSuccess: (_result, sprintId) =>
      Promise.all([
        client.removeQueries({ queryKey: workspaceKeys.sprint(sprintId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useTasks(projectId: string, filters: TaskFilters = {}) {
  const normalized = { page: 1, limit: 20, ...filters };
  return useQuery({
    queryKey: workspaceKeys.taskList(projectId, normalized),
    queryFn: () => getTasks(projectId, normalized),
    enabled: Boolean(projectId),
    placeholderData: keepPreviousData,
  });
}

export function useTask(taskId: string) {
  return useQuery({
    queryKey: workspaceKeys.task(taskId),
    queryFn: () => getTask(taskId),
    enabled: Boolean(taskId),
  });
}

export function useCreateTask(projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskInput) => createTask(projectId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.sprints(projectId),
        }),
      ]),
  });
}

export function useUpdateTask(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<TaskInput>) => updateTask(taskId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useDeleteTask(projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_result, taskId) =>
      Promise.all([
        client.removeQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useTaskStatus(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (status: TaskStatus) => updateTaskStatus(taskId, status),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useMoveTaskStatus(projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatus(taskId, status),
    onSuccess: (_result, { taskId }) =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useTaskPriority(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (priority: TaskPriority) =>
      updateTaskPriority(taskId, priority),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useTaskAssignee(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (assigneeId: string | null) =>
      updateTaskAssignee(taskId, assigneeId),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useMoveTask(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskMoveInput) => moveTask(taskId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useSubtasks(taskId: string, filters: TaskFilters = {}) {
  const normalized = { page: 1, limit: 20, ...filters };
  return useQuery({
    queryKey: workspaceKeys.subtasks(taskId, normalized),
    queryFn: () => getSubtasks(taskId, normalized),
    enabled: Boolean(taskId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateSubtask(taskId: string, projectId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<TaskInput, "sprintId">) =>
      createSubtask(taskId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.task(taskId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.subtasks(taskId, {}),
        }),
        client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
      ]),
  });
}

export function useLabels(organizationId: string, filters: LabelFilters = {}) {
  const normalized = { page: 1, limit: 20, ...filters };
  return useQuery({
    queryKey: workspaceKeys.labelList(organizationId, normalized),
    queryFn: () => getLabels(organizationId, normalized),
    enabled: Boolean(organizationId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateLabel(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: LabelInput) => createLabel(organizationId, payload),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: workspaceKeys.labels(organizationId),
      }),
  });
}

export function useUpdateLabel(organizationId: string, labelId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<LabelInput>) => updateLabel(labelId, payload),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: workspaceKeys.labels(organizationId),
      }),
  });
}

export function useDeleteLabel(organizationId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteLabel,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: workspaceKeys.labels(organizationId),
      }),
  });
}

export function useAttachLabel(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (labelId: string) => attachLabel(taskId, labelId),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
  });
}

export function useDetachLabel(projectId: string, taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (labelId: string) => detachLabel(taskId, labelId),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: workspaceKeys.tasks(projectId) }),
  });
}

export function useTaskComments(
  taskId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 20 };
  return useQuery({
    queryKey: workspaceKeys.commentList(
      taskId,
      normalized.page,
      normalized.limit,
    ),
    queryFn: () => getTaskComments(taskId, normalized),
    enabled: Boolean(taskId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTaskComment(taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskCommentInput) =>
      createTaskComment(taskId, payload),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.comments(taskId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useUpdateTaskComment(taskId: string, commentId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskCommentInput) =>
      updateTaskComment(commentId, payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: workspaceKeys.comments(taskId) }),
  });
}

export function useDeleteTaskComment(taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskComment,
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({ queryKey: workspaceKeys.comments(taskId) }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useTaskAttachments(
  taskId: string,
  filters: { page?: number; limit?: number } = DEFAULT_LIST,
) {
  const normalized = { page: filters.page ?? 1, limit: filters.limit ?? 20 };
  return useQuery({
    queryKey: workspaceKeys.attachmentList(
      taskId,
      normalized.page,
      normalized.limit,
    ),
    queryFn: () => getTaskAttachments(taskId, normalized),
    enabled: Boolean(taskId),
    placeholderData: keepPreviousData,
  });
}

export function useUploadTaskAttachment(taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadTaskAttachment(taskId, file),
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.attachments(taskId),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useDeleteTaskAttachment(taskId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskAttachment,
    onSuccess: () =>
      Promise.all([
        client.invalidateQueries({
          queryKey: workspaceKeys.attachments(taskId),
        }),
        client.invalidateQueries({
          queryKey: workspaceKeys.taskActivity(taskId, {}),
        }),
      ]),
  });
}

export function useOrganizationActivity(
  organizationId: string,
  filters: ActivityFilters = {},
) {
  const normalized = { page: 1, limit: 20, ...filters };
  return useQuery({
    queryKey: workspaceKeys.organizationActivity(organizationId, normalized),
    queryFn: () => getOrganizationActivity(organizationId, normalized),
    enabled: Boolean(organizationId),
    placeholderData: keepPreviousData,
  });
}

export function useTaskActivity(taskId: string, filters: ActivityFilters = {}) {
  const normalized = { page: 1, limit: 20, ...filters };
  return useQuery({
    queryKey: workspaceKeys.taskActivity(taskId, normalized),
    queryFn: () => getTaskActivity(taskId, normalized),
    enabled: Boolean(taskId),
    placeholderData: keepPreviousData,
  });
}
