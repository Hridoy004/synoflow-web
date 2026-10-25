import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  acceptOrganizationInvitation,
  addOrganizationMember,
  createOrganization,
  deleteOrganization,
  getOrganizationActivities,
  getOrganizationById,
  getOrganizationMembers,
  getOrganizations,
  inviteOrganizationMember,
  removeOrganizationMember,
  updateOrganization,
  updateOrganizationMemberRole,
} from "@/api";
import type {
  AddOrganizationMemberInput,
  GetOrganizationActivitiesParams,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  InviteOrganizationMemberInput,
  UpdateOrganizationInput,
  UpdateOrganizationMemberInput,
} from "@/types";

export const organizationKeys = {
  all: ["organizations"] as const,

  lists: () => [...organizationKeys.all, "list"] as const,
  list: (params: GetOrganizationsParams) =>
    [...organizationKeys.lists(), params] as const,

  details: () => [...organizationKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,

  members: (orgId: string) =>
    [...organizationKeys.all, "members", orgId] as const,
  memberList: (orgId: string, params: GetOrganizationMembersParams) =>
    [...organizationKeys.members(orgId), params] as const,

  activities: (orgId: string) =>
    [...organizationKeys.all, "activities", orgId] as const,
  activityList: (orgId: string, params: GetOrganizationActivitiesParams) =>
    [...organizationKeys.activities(orgId), params] as const,
};

export function useOrganizations(
  params: GetOrganizationsParams = {},
  enabled = true,
) {
  return useQuery({
    queryKey: organizationKeys.list(params),
    queryFn: () => getOrganizations(params),
    enabled,
    placeholderData: keepPreviousData,
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => getOrganizationById(id),
    enabled: Boolean(id),
  });
}

export function useOrganizationMembers(
  orgId: string,
  params: GetOrganizationMembersParams = {},
) {
  return useQuery({
    queryKey: organizationKeys.memberList(orgId, params),
    queryFn: () => getOrganizationMembers(orgId, params),
    enabled: Boolean(orgId),
    placeholderData: keepPreviousData,
  });
}

export function useOrganizationActivities(
  orgId: string,
  params: GetOrganizationActivitiesParams = {},
) {
  return useQuery({
    queryKey: organizationKeys.activityList(orgId, params),
    queryFn: () => getOrganizationActivities(orgId, params),
    enabled: Boolean(orgId),
    placeholderData: keepPreviousData,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() }),
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateOrganizationInput;
    }) => updateOrganization(id, payload),
    onSuccess: (_response, { id }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: organizationKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.detail(id),
        }),
      ]),
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,
    onSuccess: (_response, id) => {
      queryClient.removeQueries({ queryKey: organizationKeys.detail(id) });
      queryClient.removeQueries({ queryKey: organizationKeys.members(id) });
      queryClient.removeQueries({ queryKey: organizationKeys.activities(id) });
      return queryClient.invalidateQueries({
        queryKey: organizationKeys.lists(),
      });
    },
  });
}

function useInvalidateMemberData(orgId: string) {
  const queryClient = useQueryClient();

  return () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(orgId),
      }),
      queryClient.invalidateQueries({
        queryKey: organizationKeys.activities(orgId),
      }),
    ]);
}

export function useAddOrganizationMember(orgId: string) {
  const invalidateMemberData = useInvalidateMemberData(orgId);

  return useMutation({
    mutationFn: (payload: AddOrganizationMemberInput) =>
      addOrganizationMember(orgId, payload),
    onSuccess: invalidateMemberData,
  });
}

export function useInviteOrganizationMember(orgId: string) {
  const invalidateMemberData = useInvalidateMemberData(orgId);

  return useMutation({
    mutationFn: (payload: InviteOrganizationMemberInput) =>
      inviteOrganizationMember(orgId, payload),
    onSuccess: invalidateMemberData,
  });
}

export function useUpdateOrganizationMemberRole(orgId: string) {
  const invalidateMemberData = useInvalidateMemberData(orgId);

  return useMutation({
    mutationFn: ({
      memberId,
      role,
    }: {
      memberId: string;
      role: UpdateOrganizationMemberInput["role"];
    }) => updateOrganizationMemberRole(orgId, memberId, { role }),
    onSuccess: invalidateMemberData,
  });
}

export function useRemoveOrganizationMember(orgId: string) {
  const invalidateMemberData = useInvalidateMemberData(orgId);

  return useMutation({
    mutationFn: (memberId: string) => removeOrganizationMember(orgId, memberId),
    onSuccess: invalidateMemberData,
  });
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptOrganizationInvitation,
    onSuccess: (_response, { organizationId }) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: organizationKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.members(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.activities(organizationId),
        }),
      ]),
  });
}
