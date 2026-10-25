export type SystemRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: null | string;
  authProvider: string;
  emailVerified: boolean;
  systemRole: SystemRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: null | string;
  imagePublicId: null | string;
  isDeleted: boolean;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}
