import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div>super admin layout {children}</div>;
}
