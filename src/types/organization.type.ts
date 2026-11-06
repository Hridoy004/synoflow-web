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

export interface AcceptInvitationInput {
  organizationId: string;
  token: string;
}
