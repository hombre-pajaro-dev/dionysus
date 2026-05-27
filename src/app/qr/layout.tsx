import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Mi QR" };

export default function QrLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
