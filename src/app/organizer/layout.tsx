import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Organizador" };

export default function OrganizerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
