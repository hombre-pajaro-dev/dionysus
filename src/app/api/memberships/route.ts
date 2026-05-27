import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { getBalance } from "@/modules/balance";
import { db } from "@/lib/db";

// GET /api/memberships — returns caller's own memberships with balance per venue
export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const memberships = await db.membership.findMany({
    where: { userId: session.userId },
    include: { venue: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "asc" },
  });

  const result = await Promise.all(
    memberships.map(async (m) => ({
      id: m.id,
      status: m.status,
      venue: m.venue,
      balanceCents: await getBalance(m.id),
    }))
  );

  return NextResponse.json(result);
}
