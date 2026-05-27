import { cookies } from "next/headers";
import { verifySession, type SessionPayload } from "@/modules/auth";

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  return verifySession(token);
}

export function hasRole(
  session: SessionPayload,
  role: string,
  venueId?: string
): boolean {
  return session.roles.some(
    (r) => r.role === role && (venueId === undefined || r.venueId === venueId || r.role === "ADMIN")
  );
}

export function hasAnyRole(session: SessionPayload, roles: string[]): boolean {
  return session.roles.some((r) => roles.includes(r.role));
}
