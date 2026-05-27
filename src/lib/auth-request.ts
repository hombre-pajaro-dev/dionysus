import { verifySession, type SessionPayload } from "@/modules/auth";

export async function getSessionFromRequest(req: Request): Promise<SessionPayload | null> {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return null;
  return verifySession(match[1]);
}
