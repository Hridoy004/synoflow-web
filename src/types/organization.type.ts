export type OrganizationRole = "OWNER" | "MEMBER";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  role: OrganizationRole;
}

export interface OrganizationMemberUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface OrganizationMember {
  memberId: string;
  user: OrganizationMemberUser;
  role: OrganizationRole;
  createdAt: string;
  updatedAt?: string;
}

export interface OrganizationInvitation {
  id: string;
  email: string;
  status: "PENDING" | "ACCEPTED" | "CANCELLED" | "EXPIRED" | string;
  createdAt: string;
  expiresAt?: string;
}

export interface OrganizationActivityActor {
  id?: string;
  name?: string;
  email?: string;
}

export interface OrganizationActivity {
  id: string;
  type?: string;
  description?: string;
  actor?: OrganizationActivityActor | string | null;
  target?: string | null;
  createdAt: string;
}

export interface CreateOrganizationInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateOrganizationInput {
  name?: string;
  description?: string | null;
}

export interface AddOrganizationMemberInput {
  email: string;
  role?: OrganizationRole;
}

export interface InviteOrganizationMemberInput {
  email: string;
}

export interface UpdateOrganizationMemberInput {
  role: OrganizationRole;
}

export interface GetOrganizationsParams {
  page?: number;
  limit?: number;
}

export interface GetOrganizationMembersParams {
  page?: number;
  limit?: number;
}

export interface GetOrganizationActivitiesParams {
  page?: number;
  limit?: number;
}

export interface OrganizationPage {
  data: Organization[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type OrganizationListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrganizationPage;
};

export type OrganizationResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Organization;
};

export interface OrganizationMemberPage {
  data: OrganizationMember[];
}

export type OrganizationMemberListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrganizationMember[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type OrganizationMemberMutationResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrganizationMember;
};

export interface OrganizationActivityPage {
  data: OrganizationActivity[];
}

export type OrganizationActivityListResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrganizationActivity[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export type DeleteOrganizationResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
};

export interface AcceptInvitationInput {
  organizationId: string;
  token: string;
}
