import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/api/workspace.api";

const invalidate = (queryClient: ReturnType<typeof useQueryClient>, keys: readonly unknown[][]) =>
  Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
const mutation = (queryClient: ReturnType<typeof useQueryClient>, keys: readonly unknown[][], fn: (value: never) => Promise<unknown>) =>
  useMutation({
    mutationFn: (value?: object | string | null | File) => fn(value as never),
    onSuccess: () => invalidate(queryClient, keys),
  });

export function useTeams(orgId: string, params: object = {}, enabled = true) {
  return useQuery({ queryKey: ["teams", orgId, params], queryFn: () => api.getTeams(orgId, params), enabled: Boolean(orgId) && enabled });
}
export function useTeam(teamId: string) { return useQuery({ queryKey: ["team", teamId], queryFn: () => api.getTeam(teamId), enabled: Boolean(teamId) }); }
export function useCreateTeam(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["teams", orgId]], (value) => api.createTeam(orgId, value)); }
export function useUpdateTeam(teamId: string, orgId: string) { const qc = useQueryClient(); return mutation(qc, [["teams", orgId]], (value) => api.updateTeam(teamId, value)); }
export function useDeleteTeam(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["teams", orgId]], (teamId: string) => api.deleteTeam(teamId)); }
export function useTeamMembers(teamId: string, params: object = {}) { return useQuery({ queryKey: ["team-members", teamId, params], queryFn: () => api.getTeamMembers(teamId, params), enabled: Boolean(teamId), placeholderData: (previous) => previous }); }
export function useAddTeamMember(teamId: string, orgId: string) { const qc = useQueryClient(); return mutation(qc, [["team-members", teamId], ["teams", orgId]], (userId: string) => api.addTeamMember(teamId, { userId })); }
export function useRemoveTeamMember(teamId: string, orgId: string) { const qc = useQueryClient(); return mutation(qc, [["team-members", teamId], ["teams", orgId]], (userId: string) => api.removeTeamMember(teamId, userId)); }

export function useProjects(orgId: string, params: object = {}, enabled = true) { return useQuery({ queryKey: ["projects", orgId, params], queryFn: () => api.getProjects(orgId, params), enabled: Boolean(orgId) && enabled }); }
export function useProject(projectId: string) { return useQuery({ queryKey: ["project", projectId], queryFn: () => api.getProject(projectId), enabled: Boolean(projectId) }); }
export function useCreateProject(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["projects", orgId]], (value) => api.createProject(orgId, value)); }
export function useUpdateProject(projectId: string, orgId: string) { const qc = useQueryClient(); return mutation(qc, [["projects", orgId], ["project", projectId]], (value) => api.updateProject(projectId, value)); }
export function useDeleteProject(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["projects", orgId]], (projectId: string) => api.deleteProject(projectId)); }
export function useProjectMembers(projectId: string, params: object = {}) { return useQuery({ queryKey: ["project-members", projectId, params], queryFn: () => api.getProjectMembers(projectId, params), enabled: Boolean(projectId), placeholderData: (previous) => previous }); }
export function useAddProjectMember(projectId: string, _orgId: string) { const qc = useQueryClient(); return mutation(qc, [["project-members", projectId]], (userId: string) => api.addProjectMember(projectId, { userId })); }
export function useRemoveProjectMember(projectId: string, _orgId: string) { const qc = useQueryClient(); return mutation(qc, [["project-members", projectId]], (userId: string) => api.removeProjectMember(projectId, userId)); }

export function useSprints(projectId: string, params: object = {}) { return useQuery({ queryKey: ["sprints", projectId, params], queryFn: () => api.getSprints(projectId, params), enabled: Boolean(projectId) }); }
export function useSprint(sprintId: string) { return useQuery({ queryKey: ["sprint", sprintId], queryFn: () => api.getSprint(sprintId), enabled: Boolean(sprintId) }); }
export function useCreateSprint(projectId: string) { const qc = useQueryClient(); return mutation(qc, [["sprints", projectId]], (value) => api.createSprint(projectId, value)); }
export function useUpdateSprint(sprintId: string, projectId: string) { const qc = useQueryClient(); return mutation(qc, [["sprints", projectId]], (value) => api.updateSprint(sprintId, value)); }
export function useDeleteSprint(projectId: string) { const qc = useQueryClient(); return mutation(qc, [["sprints", projectId]], (id: string) => api.deleteSprint(id)); }
export function useStartSprint(sprintId: string, projectId: string) { const qc = useQueryClient(); return mutation(qc, [["sprints", projectId]], () => api.startSprint(sprintId)); }
export function useCompleteSprint(sprintId: string, projectId: string) { const qc = useQueryClient(); return mutation(qc, [["sprints", projectId]], () => api.completeSprint(sprintId)); }

export function useTasks(projectId: string, params = {}, enabled = true) { return useQuery({ queryKey: ["tasks", projectId, params], queryFn: () => api.getTasks(projectId, params), enabled: Boolean(projectId) && enabled, placeholderData: (previous) => previous }); }
export function useTask(taskId: string) { return useQuery({ queryKey: ["task", taskId], queryFn: () => api.getTask(taskId), enabled: Boolean(taskId) }); }
export function useCreateTask(projectId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (value) => api.createTask(projectId, value)); }
export function useCreateSubtask(taskId: string, projectId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (value) => api.createSubtask(taskId, value)); }
export function useSubtasks(taskId: string, params: object = {}) { return useQuery({ queryKey: ["subtasks", taskId, params], queryFn: () => api.getSubtasks(taskId, params), enabled: Boolean(taskId) }); }
export function useUpdateTask(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId], ["task", taskId]], (value) => api.updateTask(taskId, value)); }
export function useDeleteTask(projectId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (id: string) => api.deleteTask(id)); }
export function useMoveTask(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (value) => api.moveTask(taskId, value)); }
export function useMoveTaskStatus(projectId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], ({ taskId, status }: { taskId: string; status: string }) => api.updateTaskStatus(taskId, status)); }
export function useTaskStatus(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (status: string) => api.updateTaskStatus(taskId, status)); }
export function useTaskPriority(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (priority: string) => api.updateTaskPriority(taskId, priority)); }
export function useTaskAssignee(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (assigneeId: string | null) => api.updateTaskAssignee(taskId, assigneeId)); }

export function useLabels(orgId: string, params = {}) { return useQuery({ queryKey: ["labels", orgId, params], queryFn: () => api.getLabels(orgId, params), enabled: Boolean(orgId) }); }
export function useCreateLabel(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["labels", orgId]], (value) => api.createLabel(orgId, value)); }
export function useUpdateLabel(orgId: string, labelId: string) { const qc = useQueryClient(); return mutation(qc, [["labels", orgId]], (value) => api.updateLabel(labelId, value)); }
export function useDeleteLabel(orgId: string) { const qc = useQueryClient(); return mutation(qc, [["labels", orgId]], (id: string) => api.deleteLabel(id)); }
export function useAttachLabel(projectId: string, taskId: string) { const qc = useQueryClient(); return mutation(qc, [["tasks", projectId]], (labelId: string) => api.attachLabel(taskId, labelId)); }

export function useTaskComments(taskId: string, params: object = {}) { return useQuery({ queryKey: ["task-comments", taskId, params], queryFn: () => api.getTaskComments(taskId, params), enabled: Boolean(taskId) }); }
export function useCreateTaskComment(taskId: string) { const qc = useQueryClient(); return mutation(qc, [["task-comments", taskId]], (value) => api.createTaskComment(taskId, value)); }
export function useUpdateTaskComment(taskId: string, commentId: string) { const qc = useQueryClient(); return mutation(qc, [["task-comments", taskId]], (value) => api.updateTaskComment(commentId, value)); }
export function useDeleteTaskComment(taskId: string) { const qc = useQueryClient(); return mutation(qc, [["task-comments", taskId]], (id: string) => api.deleteTaskComment(id)); }

export function useTaskAttachments(taskId: string, params: object = {}) { return useQuery({ queryKey: ["task-attachments", taskId], queryFn: () => api.getTaskAttachments(taskId, params), enabled: Boolean(taskId) }); }
export function useUploadTaskAttachment(taskId: string) { const qc = useQueryClient(); return mutation(qc, [["task-attachments", taskId]], (file: File) => api.uploadTaskAttachment(taskId, file)); }
export function useDeleteTaskAttachment(taskId: string) { const qc = useQueryClient(); return mutation(qc, [["task-attachments", taskId]], (id: string) => api.deleteTaskAttachment(id)); }
export function useTaskActivity(taskId: string, params: object = {}) { return useQuery({ queryKey: ["task-activity", taskId, params], queryFn: () => api.getTaskActivity(taskId, params), enabled: Boolean(taskId) }); }
export function useOrganizationActivity(orgId: string, params: object = {}) { return useQuery({ queryKey: ["organization-activity", orgId, params], queryFn: () => api.getOrganizationActivity(orgId, params), enabled: Boolean(orgId) }); }
