import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <AuthGuard>{children}</AuthGuard>
    </TooltipProvider>
  );
}
