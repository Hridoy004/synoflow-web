import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
  User,
  VerifyAccountPayload,
} from "@/types";

type AuthResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export function userLogin(payload: LoginPayload) {
  return apiClient<AuthResponse<{ authenticated: boolean }>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient<AuthResponse<{ authenticated: boolean }>>(
    "/auth/verify-email",
    { method: "POST", body: payload },
  );
}

export function userRegistration(payload: RegistrationPayload) {
  return apiClient<AuthResponse<null>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient<AuthResponse<null>>("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient<ApiResponse<User>>("/auth/me");
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient<AuthResponse<{ authenticated: boolean }>>("/auth/google", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient<AuthResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient<AuthResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
