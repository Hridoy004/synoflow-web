import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.type";
import type {
  Label,
  Project,
  ProjectMember,
  Sprint,
  Task,
  TaskAttachment,
  TaskComment,
  TaskLabel,
  Team,
  WorkspaceActivity,
  WorkspaceMember,
} from "@/types/workspace.type";

const query = (params: object = {}) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  }
  const value = search.toString();
  return value ? `?${value}` : "";
};

export const getTeams = (orgId: string, params = {}): Promise<ApiResponse<Team[]>> => apiClient(`/organizations/${orgId}/teams${query(params)}`);
export const getTeam = (teamId: string): Promise<ApiResponse<Team>> => apiClient(`/teams/${teamId}`);
export const createTeam = (orgId: string, body: object) => apiClient(`/organizations/${orgId}/teams`, { method: "POST", body });
export const updateTeam = (teamId: string, body: object) => apiClient(`/teams/${teamId}`, { method: "PATCH", body });
export const deleteTeam = (teamId: string) => apiClient(`/teams/${teamId}`, { method: "DELETE" });
export const getTeamMembers = (teamId: string, params = {}): Promise<ApiResponse<WorkspaceMember[]>> => apiClient(`/teams/${teamId}/members${query(params)}`);
export const addTeamMember = (teamId: string, body: object) => apiClient(`/teams/${teamId}/members`, { method: "POST", body });
export const removeTeamMember = (teamId: string, userId: string) => apiClient(`/teams/${teamId}/members/${userId}`, { method: "DELETE" });

export const getProjects = (orgId: string, params = {}): Promise<ApiResponse<Project[]>> => apiClient(`/organizations/${orgId}/projects${query(params)}`);
export const getProject = (projectId: string): Promise<ApiResponse<Project>> => apiClient(`/projects/${projectId}`);
export const createProject = (orgId: string, body: object) => apiClient(`/organizations/${orgId}/projects`, { method: "POST", body });
export const updateProject = (projectId: string, body: object) => apiClient(`/projects/${projectId}`, { method: "PATCH", body });
export const deleteProject = (projectId: string) => apiClient(`/projects/${projectId}`, { method: "DELETE" });
export const getProjectMembers = (projectId: string, params = {}): Promise<ApiResponse<ProjectMember[]>> => apiClient(`/projects/${projectId}/members${query(params)}`);
export const addProjectMember = (projectId: string, body: object) => apiClient(`/projects/${projectId}/members`, { method: "POST", body });
export const removeProjectMember = (projectId: string, userId: string) => apiClient(`/projects/${projectId}/members/${userId}`, { method: "DELETE" });

export const getSprints = (projectId: string, params = {}): Promise<ApiResponse<Sprint[]>> => apiClient(`/projects/${projectId}/sprints${query(params)}`);
export const getSprint = (sprintId: string): Promise<ApiResponse<Sprint>> => apiClient(`/sprints/${sprintId}`);
export const createSprint = (projectId: string, body: object) => apiClient(`/projects/${projectId}/sprints`, { method: "POST", body });
export const updateSprint = (sprintId: string, body: object) => apiClient(`/sprints/${sprintId}`, { method: "PATCH", body });
export const deleteSprint = (sprintId: string) => apiClient(`/sprints/${sprintId}`, { method: "DELETE" });
export const startSprint = (sprintId: string) => apiClient(`/sprints/${sprintId}/start`, { method: "POST" });
export const completeSprint = (sprintId: string) => apiClient(`/sprints/${sprintId}/complete`, { method: "POST" });

export const getTasks = (projectId: string, params = {}): Promise<ApiResponse<Task[]>> => apiClient(`/projects/${projectId}/tasks${query(params)}`);
export const getTask = (taskId: string): Promise<ApiResponse<Task>> => apiClient(`/tasks/${taskId}`);
export const createTask = (projectId: string, body: object) => apiClient(`/projects/${projectId}/tasks`, { method: "POST", body });
export const createSubtask = (taskId: string, body: object) => apiClient(`/tasks/${taskId}/subtasks`, { method: "POST", body });
export const getSubtasks = (taskId: string, params = {}): Promise<ApiResponse<Task[]>> => apiClient(`/tasks/${taskId}/subtasks${query(params)}`);
export const updateTask = (taskId: string, body: object) => apiClient(`/tasks/${taskId}`, { method: "PATCH", body });
export const deleteTask = (taskId: string) => apiClient(`/tasks/${taskId}`, { method: "DELETE" });
export const moveTask = (taskId: string, body: object) => apiClient(`/tasks/${taskId}/move`, { method: "PATCH", body });
export const updateTaskStatus = (taskId: string, status: string) => apiClient(`/tasks/${taskId}/status`, { method: "PATCH", body: { status } });
export const updateTaskPriority = (taskId: string, priority: string) => apiClient(`/tasks/${taskId}/priority`, { method: "PATCH", body: { priority } });
export const updateTaskAssignee = (taskId: string, assigneeId: string | null) => apiClient(`/tasks/${taskId}/assignee`, { method: "PATCH", body: { assigneeId } });

export const getLabels = (orgId: string, params = {}): Promise<ApiResponse<Label[]>> => apiClient(`/organizations/${orgId}/labels${query(params)}`);
export const createLabel = (orgId: string, body: object) => apiClient(`/organizations/${orgId}/labels`, { method: "POST", body });
export const updateLabel = (labelId: string, body: object) => apiClient(`/labels/${labelId}`, { method: "PATCH", body });
export const deleteLabel = (labelId: string) => apiClient(`/labels/${labelId}`, { method: "DELETE" });
export const attachLabel = (taskId: string, labelId: string): Promise<ApiResponse<TaskLabel>> => apiClient(`/tasks/${taskId}/labels`, { method: "POST", body: { labelId } });

export const getTaskComments = (taskId: string, params = {}): Promise<ApiResponse<TaskComment[]>> => apiClient(`/tasks/${taskId}/comments${query(params)}`);
export const createTaskComment = (taskId: string, body: object) => apiClient(`/tasks/${taskId}/comments`, { method: "POST", body });
export const updateTaskComment = (commentId: string, body: object) => apiClient(`/comments/${commentId}`, { method: "PATCH", body });
export const deleteTaskComment = (commentId: string) => apiClient(`/comments/${commentId}`, { method: "DELETE" });

export const getTaskAttachments = (taskId: string, params = {}): Promise<ApiResponse<TaskAttachment[]>> => apiClient(`/tasks/${taskId}/attachments${query(params)}`);
export const uploadTaskAttachment = (taskId: string, file: File) => {
  const body = new FormData();
  body.append("attachment", file);
  return apiClient(`/tasks/${taskId}/attachments`, { method: "POST", body });
};
export const deleteTaskAttachment = (attachmentId: string) => apiClient(`/attachments/${attachmentId}`, { method: "DELETE" });
export const getTaskActivity = (taskId: string, params = {}): Promise<ApiResponse<WorkspaceActivity[]>> => apiClient(`/tasks/${taskId}/activities${query(params)}`);
export const getOrganizationActivity = (orgId: string, params = {}): Promise<ApiResponse<WorkspaceActivity[]>> => apiClient(`/organizations/${orgId}/activities${query(params)}`);