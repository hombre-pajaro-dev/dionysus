import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Puerta" };

export default function DoorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
