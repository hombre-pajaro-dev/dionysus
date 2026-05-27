import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Mi Comunidad" };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
