"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
}
