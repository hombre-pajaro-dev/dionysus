import type { ReactNode } from "react";
import "@/styles/design-system.css";

export const metadata = { title: "Dionysus — Mi Perfil" };

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
