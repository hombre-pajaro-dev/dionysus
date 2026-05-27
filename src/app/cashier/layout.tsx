import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Cajero" };

export default function CashierLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
