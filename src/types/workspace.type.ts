import type { ApiResponse, Meta, PaginationParams } from "@/types";

export type WorkspaceResponse<T> = Omit<ApiResponse<T>, "meta"> & {
  meta?: Meta;
};

export type WorkspaceListResponse<T> = WorkspaceResponse<T[]> & {
  meta: Meta;
};

export interface Team {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: { id: string; name: string; slug: string };
}

export interface WorkspaceMember {
  userId: string;
  name: string;
  email: string;
  avatar: string | null;
  createdAt?: string;
}

export interface TeamInput {
  name: string;
  description?: string;
}

export interface TeamMemberInput {
  userId: string;
}

export interface Project {
  id: string;
  organizationId: string;
  teamId: string | null;
  createdById: string;
  name: string;
  key: string;
  description: string | null;
  status: ProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  organization?: { id: string; name: string; slug: string };
  team?: { id: string; name: string } | null;
}

export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

export interface ProjectInput {
  name: string;
  key: string;
  description?: string;
  teamId?: string | null;
  startDate?: string | null;
  dueDate?: string | null;
}

export interface ProjectMember extends WorkspaceMember {
  createdAt: string;
}

export type SprintStatus = "PLANNED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  status: SprintStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SprintInput {
  name: string;
  goal?: string;
  startDate?: string | null;
  endDate?: string | null;
}

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskSortField =
  | "createdAt"
  | "updatedAt"
  | "title"
  | "priority"
  | "status"
  | "dueDate";

export interface Task {
  id: string;
  projectId?: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  sprintId: string | null;
  dueDate: string | null;
  position?: number;
  creatorId?: string;
  parentTaskId?: string | null;
  createdAt: string;
  updatedAt: string;
  assignee: { id: string; name: string; avatar: string | null } | null;
  sprint: { id: string; name: string } | null;
  creator?: { id: string; name: string; avatar: string | null } | null;
  project?: {
    id: string;
    name: string;
    key: string;
    organizationId: string;
  } | null;
  parentTask?: { id: string; title: string; status: TaskStatus } | null;
  subtasksCount?: number;
}

export interface TaskFilters extends PaginationParams {
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  sprintId?: string;
  search?: string;
  sortBy?: TaskSortField;
  sortOrder?: "asc" | "desc";
}

export interface TaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string | null;
  sprintId?: string | null;
  dueDate?: string | null;
  position?: number;
}

export interface TaskMoveInput {
  status?: TaskStatus;
  sprintId?: string | null;
  position?: number;
}

export interface Label {
  id: string;
  organizationId: string;
  name: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TaskLabel {
  id?: string;
  taskId?: string;
  labelId?: string;
  label: Label;
}

export interface LabelInput {
  name: string;
  color?: string | null;
}

export interface LabelFilters extends PaginationParams {
  search?: string;
  sortBy?: "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface TaskComment {
  id: string;
  taskId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; avatar: string | null };
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  uploader: { id: string; name: string; avatar: string | null };
}

export interface WorkspaceActivity {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: unknown;
  createdAt: string;
  actor: { id: string; name: string; avatar: string | null };
}

export interface ActivityFilters extends PaginationParams {
  actorId?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
}

export interface TaskCommentInput {
  content: string;
}

export type TeamListResponse = WorkspaceListResponse<Team>;
export type TeamResponse = WorkspaceResponse<Team>;
export type TeamMemberListResponse = WorkspaceListResponse<WorkspaceMember>;
export type ProjectListResponse = WorkspaceListResponse<Project>;
export type ProjectResponse = WorkspaceResponse<Project>;
export type ProjectMemberListResponse = WorkspaceListResponse<ProjectMember>;
export type SprintListResponse = WorkspaceListResponse<Sprint>;
export type SprintResponse = WorkspaceResponse<Sprint>;
export type TaskListResponse = WorkspaceListResponse<Task>;
export type TaskResponse = WorkspaceResponse<Task>;
export type LabelListResponse = WorkspaceListResponse<Label>;
export type LabelResponse = WorkspaceResponse<Label>;
export type TaskCommentListResponse = WorkspaceListResponse<TaskComment>;
export type TaskCommentResponse = WorkspaceResponse<TaskComment>;
export type TaskAttachmentListResponse = WorkspaceListResponse<TaskAttachment>;
export type TaskAttachmentResponse = WorkspaceResponse<TaskAttachment>;
export type ActivityListResponse = WorkspaceListResponse<WorkspaceActivity>;
