import { changePassword, updateMyProfile, uploadProfileImage } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["user"] }),
  });
}
