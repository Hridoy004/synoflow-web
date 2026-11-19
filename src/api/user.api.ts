import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ChangePasswordInput,
  UpdateMyProfileInput,
  User,
} from "@/types";

export function updateMyProfile(payload: UpdateMyProfileInput) {
  return apiClient<ApiResponse<User>>("/user/me", {
    method: "PATCH",
    body: payload,
  });
}

export function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("profileImage", file);

  return apiClient<ApiResponse<User>>("/user/profile-image", {
    method: "PATCH",
    body: formData,
  });
}

export function changePassword(payload: ChangePasswordInput) {
  return apiClient<ApiResponse<null>>("/auth/change-password", {
    method: "POST",
    body: payload,
  });
}
