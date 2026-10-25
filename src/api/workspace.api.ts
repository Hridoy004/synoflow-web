import apiClient from "@/lib/apiClient";
import type {
  ActivityFilters,
  ActivityListResponse,
  Label,
  LabelFilters,
  LabelInput,
  LabelListResponse,
  LabelResponse,
  PaginationParams,
  ProjectInput,
  ProjectListResponse,
  ProjectMember,
  ProjectMemberListResponse,
  ProjectResponse,
  SprintInput,
  SprintListResponse,
  SprintResponse,
  TaskAttachment,
  TaskAttachmentListResponse,
  TaskAttachmentResponse,
  TaskCommentInput,
  TaskCommentListResponse,
  TaskCommentResponse,
  TaskFilters,
  TaskInput,
  TaskListResponse,
  TaskMoveInput,
  TaskPriority,
  TaskResponse,
  TaskStatus,
  TeamInput,
  TeamListResponse,
  TeamMemberInput,
  TeamMemberListResponse,
  TeamResponse,
  WorkspaceActivity,
  WorkspaceMember,
  WorkspaceResponse,
} from "@/types";

const organizationPath = (organizationId: string) =>
  `/organizations/${encodeURIComponent(organizationId)}`;
const teamPath = (teamId: string) => `/teams/${encodeURIComponent(teamId)}`;
const projectPath = (projectId: string) =>
  `/projects/${encodeURIComponent(projectId)}`;
const sprintPath = (sprintId: string) =>
  `/sprints/${encodeURIComponent(sprintId)}`;
const taskPath = (taskId: string) => `/tasks/${encodeURIComponent(taskId)}`;
const labelPath = (labelId: string) => `/labels/${encodeURIComponent(labelId)}`;
const commentPath = (commentId: string) =>
  `/comments/${encodeURIComponent(commentId)}`;
const attachmentPath = (attachmentId: string) =>
  `/attachments/${encodeURIComponent(attachmentId)}`;

function queryString(filters: object): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (
      (typeof value === "string" || typeof value === "number") &&
      value !== ""
    ) {
      params.set(key, String(value));
    }
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getTeams(
  organizationId: string,
  filters: PaginationParams = {},
) {
  return apiClient<TeamListResponse>(
    `${organizationPath(organizationId)}/teams${queryString(filters)}`,
  );
}

export function getTeam(teamId: string) {
  return apiClient<TeamResponse>(teamPath(teamId));
}

export function createTeam(organizationId: string, payload: TeamInput) {
  return apiClient<TeamResponse>(`${organizationPath(organizationId)}/teams`, {
    method: "POST",
    body: payload,
  });
}

export function updateTeam(teamId: string, payload: Partial<TeamInput>) {
  return apiClient<TeamResponse>(teamPath(teamId), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteTeam(teamId: string) {
  return apiClient<WorkspaceResponse<null>>(teamPath(teamId), {
    method: "DELETE",
  });
}

export function getTeamMembers(teamId: string, filters: PaginationParams = {}) {
  return apiClient<TeamMemberListResponse>(
    `${teamPath(teamId)}/members${queryString(filters)}`,
  );
}

export function addTeamMember(teamId: string, payload: TeamMemberInput) {
  return apiClient<WorkspaceResponse<WorkspaceMember>>(
    `${teamPath(teamId)}/members`,
    { method: "POST", body: payload },
  );
}

export function removeTeamMember(teamId: string, userId: string) {
  return apiClient<WorkspaceResponse<null>>(
    `${teamPath(teamId)}/members/${encodeURIComponent(userId)}`,
    { method: "DELETE" },
  );
}

export function getProjects(
  organizationId: string,
  filters: { page?: number; limit?: number; search?: string } = {},
) {
  return apiClient<ProjectListResponse>(
    `${organizationPath(organizationId)}/projects${queryString(filters)}`,
  );
}

export function getProject(projectId: string) {
  return apiClient<ProjectResponse>(projectPath(projectId));
}

export function createProject(organizationId: string, payload: ProjectInput) {
  return apiClient<ProjectResponse>(
    `${organizationPath(organizationId)}/projects`,
    { method: "POST", body: payload },
  );
}

export function updateProject(
  projectId: string,
  payload: Partial<ProjectInput>,
) {
  return apiClient<ProjectResponse>(projectPath(projectId), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteProject(projectId: string) {
  return apiClient<WorkspaceResponse<null>>(projectPath(projectId), {
    method: "DELETE",
  });
}

export function getProjectMembers(
  projectId: string,
  filters: PaginationParams = {},
) {
  return apiClient<ProjectMemberListResponse>(
    `${projectPath(projectId)}/members${queryString(filters)}`,
  );
}

export function addProjectMember(projectId: string, payload: TeamMemberInput) {
  return apiClient<WorkspaceResponse<ProjectMember>>(
    `${projectPath(projectId)}/members`,
    { method: "POST", body: payload },
  );
}

export function removeProjectMember(projectId: string, userId: string) {
  return apiClient<WorkspaceResponse<null>>(
    `${projectPath(projectId)}/members/${encodeURIComponent(userId)}`,
    { method: "DELETE" },
  );
}

export function getSprints(
  projectId: string,
  filters: { page?: number; limit?: number } = {},
) {
  return apiClient<SprintListResponse>(
    `${projectPath(projectId)}/sprints${queryString(filters)}`,
  );
}

export function getSprint(sprintId: string) {
  return apiClient<SprintResponse>(sprintPath(sprintId));
}

export function createSprint(projectId: string, payload: SprintInput) {
  return apiClient<SprintResponse>(`${projectPath(projectId)}/sprints`, {
    method: "POST",
    body: payload,
  });
}

export function updateSprint(sprintId: string, payload: Partial<SprintInput>) {
  return apiClient<SprintResponse>(sprintPath(sprintId), {
    method: "PATCH",
    body: payload,
  });
}

export function startSprint(sprintId: string) {
  return apiClient<SprintResponse>(`${sprintPath(sprintId)}/start`, {
    method: "POST",
  });
}

export function completeSprint(sprintId: string) {
  return apiClient<SprintResponse>(`${sprintPath(sprintId)}/complete`, {
    method: "POST",
  });
}

export function deleteSprint(sprintId: string) {
  return apiClient<WorkspaceResponse<null>>(sprintPath(sprintId), {
    method: "DELETE",
  });
}

export function getTasks(projectId: string, filters: TaskFilters = {}) {
  return apiClient<TaskListResponse>(
    `${projectPath(projectId)}/tasks${queryString(filters)}`,
  );
}

export function getTask(taskId: string) {
  return apiClient<TaskResponse>(taskPath(taskId));
}

export function createTask(projectId: string, payload: TaskInput) {
  return apiClient<TaskResponse>(`${projectPath(projectId)}/tasks`, {
    method: "POST",
    body: payload,
  });
}

export function updateTask(taskId: string, payload: Partial<TaskInput>) {
  return apiClient<TaskResponse>(taskPath(taskId), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteTask(taskId: string) {
  return apiClient<WorkspaceResponse<null>>(taskPath(taskId), {
    method: "DELETE",
  });
}

export function updateTaskStatus(taskId: string, status: TaskStatus) {
  return apiClient<TaskResponse>(`${taskPath(taskId)}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export function updateTaskPriority(taskId: string, priority: TaskPriority) {
  return apiClient<TaskResponse>(`${taskPath(taskId)}/priority`, {
    method: "PATCH",
    body: { priority },
  });
}

export function updateTaskAssignee(taskId: string, assigneeId: string | null) {
  return apiClient<TaskResponse>(`${taskPath(taskId)}/assignee`, {
    method: "PATCH",
    body: { assigneeId },
  });
}

export function moveTask(taskId: string, payload: TaskMoveInput) {
  return apiClient<TaskResponse>(`${taskPath(taskId)}/move`, {
    method: "PATCH",
    body: payload,
  });
}

export function getSubtasks(taskId: string, filters: TaskFilters = {}) {
  return apiClient<TaskListResponse>(
    `${taskPath(taskId)}/subtasks${queryString(filters)}`,
  );
}

export function createSubtask(
  taskId: string,
  payload: Omit<TaskInput, "sprintId">,
) {
  return apiClient<TaskResponse>(`${taskPath(taskId)}/subtasks`, {
    method: "POST",
    body: payload,
  });
}

export function getLabels(organizationId: string, filters: LabelFilters = {}) {
  return apiClient<LabelListResponse>(
    `${organizationPath(organizationId)}/labels${queryString(filters)}`,
  );
}

export function createLabel(organizationId: string, payload: LabelInput) {
  return apiClient<LabelResponse>(
    `${organizationPath(organizationId)}/labels`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export function updateLabel(labelId: string, payload: Partial<LabelInput>) {
  return apiClient<LabelResponse>(labelPath(labelId), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteLabel(labelId: string) {
  return apiClient<WorkspaceResponse<null>>(labelPath(labelId), {
    method: "DELETE",
  });
}

export function attachLabel(taskId: string, labelId: string) {
  return apiClient<WorkspaceResponse<{ label: Label }>>(
    `${taskPath(taskId)}/labels`,
    { method: "POST", body: { labelId } },
  );
}

export function detachLabel(taskId: string, labelId: string) {
  return apiClient<WorkspaceResponse<null>>(
    `${taskPath(taskId)}/labels/${encodeURIComponent(labelId)}`,
    { method: "DELETE" },
  );
}

export function getTaskComments(
  taskId: string,
  filters: { page?: number; limit?: number } = {},
) {
  return apiClient<TaskCommentListResponse>(
    `${taskPath(taskId)}/comments${queryString(filters)}`,
  );
}

export function createTaskComment(taskId: string, payload: TaskCommentInput) {
  return apiClient<TaskCommentResponse>(`${taskPath(taskId)}/comments`, {
    method: "POST",
    body: payload,
  });
}

export function updateTaskComment(
  commentId: string,
  payload: TaskCommentInput,
) {
  return apiClient<TaskCommentResponse>(commentPath(commentId), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteTaskComment(commentId: string) {
  return apiClient<WorkspaceResponse<null>>(commentPath(commentId), {
    method: "DELETE",
  });
}

export function getTaskAttachments(
  taskId: string,
  filters: { page?: number; limit?: number } = {},
) {
  return apiClient<TaskAttachmentListResponse>(
    `${taskPath(taskId)}/attachments${queryString(filters)}`,
  );
}

export function uploadTaskAttachment(taskId: string, file: File) {
  const body = new FormData();
  body.set("file", file);
  return apiClient<TaskAttachmentResponse>(`${taskPath(taskId)}/attachments`, {
    method: "POST",
    body,
  });
}

export function deleteTaskAttachment(attachmentId: string) {
  return apiClient<WorkspaceResponse<null>>(attachmentPath(attachmentId), {
    method: "DELETE",
  });
}

export function getOrganizationActivity(
  organizationId: string,
  filters: ActivityFilters = {},
) {
  return apiClient<ActivityListResponse>(
    `${organizationPath(organizationId)}/activities${queryString(filters)}`,
  );
}

export function getTaskActivity(taskId: string, filters: ActivityFilters = {}) {
  return apiClient<ActivityListResponse>(
    `${taskPath(taskId)}/activities${queryString(filters)}`,
  );
}

export type { TaskAttachment, WorkspaceActivity };
