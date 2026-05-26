import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Design Gallery" };

export default function DesignLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
