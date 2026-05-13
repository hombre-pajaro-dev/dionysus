import { cookies } from "next/headers";
import { verifySession } from "@/modules/auth";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getServerSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  const member = await db.member.findUnique({
    where: { id: session.memberId },
    select: { id: true, name: true, phone: true, status: true, venueId: true },
  });

  return member ?? null;
}
