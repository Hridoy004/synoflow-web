import apiClient from "@/lib/apiClient";
import type {
  AcceptInvitationInput,
  AddOrganizationMemberInput,
  CreateOrganizationInput,
  DeleteOrganizationResponse,
  GetOrganizationActivitiesParams,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  InviteOrganizationMemberInput,
  OrganizationActivityListResponse,
  OrganizationListResponse,
  OrganizationMemberListResponse,
  OrganizationMemberMutationResponse,
  OrganizationResponse,
  UpdateOrganizationInput,
  UpdateOrganizationMemberInput,
} from "@/types";

const ORGANIZATIONS_URL = "/organizations";

const organizationUrl = (orgId: string) =>
  `${ORGANIZATIONS_URL}/${encodeURIComponent(orgId)}`;

const DEFAULT_PAGE = 1;
const DEFAULT_ACTIVITIES_LIMIT = 20;

function toQueryString(params: object) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) searchParams.set(key, String(value));
  }
  const query = searchParams.toString();
  return query ? query : "";
}

const membersUrl = (orgId: string) => `${organizationUrl(orgId)}/members`;

const memberUrl = (orgId: string, memberId: string) =>
  `${membersUrl(orgId)}/${encodeURIComponent(memberId)}`;

const activitiesUrl = (orgId: string) => `${organizationUrl(orgId)}/activities`;

export function getOrganizations(params: GetOrganizationsParams = {}) {
  return apiClient<OrganizationListResponse>(
    `${ORGANIZATIONS_URL}?${toQueryString(params)}`,
    {
    method: "GET",
    },
  );
}

export function getOrganizationById(id: string) {
  return apiClient<OrganizationResponse>(organizationUrl(id), {
    method: "GET",
  });
}

export function createOrganization(payload: CreateOrganizationInput) {
  return apiClient<OrganizationResponse>(ORGANIZATIONS_URL, {
    method: "POST",
    body: payload,
  });
}

export function updateOrganization(
  id: string,
  payload: UpdateOrganizationInput,
) {
  return apiClient<OrganizationResponse>(organizationUrl(id), {
    method: "PATCH",
    body: payload,
  });
}

export function deleteOrganization(id: string) {
  return apiClient<DeleteOrganizationResponse>(organizationUrl(id), {
    method: "DELETE",
  });
}

export function getOrganizationMembers(
  orgId: string,
  params: GetOrganizationMembersParams = {},
) {
  return apiClient<OrganizationMemberListResponse>(
    `${membersUrl(orgId)}?${toQueryString(params)}`,
    { method: "GET" },
  );
}

export function addOrganizationMember(
  orgId: string,
  payload: AddOrganizationMemberInput,
) {
  return apiClient<OrganizationMemberMutationResponse>(membersUrl(orgId), {
    method: "POST",
    body: payload,
  });
}

export function inviteOrganizationMember(
  orgId: string,
  payload: InviteOrganizationMemberInput,
) {
  return apiClient<OrganizationMemberMutationResponse>(
    `${membersUrl(orgId)}/invite`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export function updateOrganizationMemberRole(
  orgId: string,
  memberId: string,
  payload: UpdateOrganizationMemberInput,
) {
  return apiClient<OrganizationMemberMutationResponse>(
    memberUrl(orgId, memberId),
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function removeOrganizationMember(orgId: string, memberId: string) {
  return apiClient<DeleteOrganizationResponse>(memberUrl(orgId, memberId), {
    method: "DELETE",
  });
}

export function getOrganizationActivities(
  orgId: string,
  {
    page = DEFAULT_PAGE,
    limit = DEFAULT_ACTIVITIES_LIMIT,
  }: GetOrganizationActivitiesParams = {},
) {
  return apiClient<OrganizationActivityListResponse>(
    `${activitiesUrl(orgId)}?${toQueryString({ page, limit })}`,
    { method: "GET" },
  );
}

export function acceptOrganizationInvitation({
  organizationId,
  token,
}: AcceptInvitationInput) {
  return apiClient(`${organizationUrl(organizationId)}/members/accept`, {
    method: "POST",
    body: { token },
  });
}
