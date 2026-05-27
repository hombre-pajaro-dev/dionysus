import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { getBalance } from "@/modules/balance";
import { db } from "@/lib/db";

// GET /api/members/lookup?userId=X&venueId=Y
// For TOKEN_CASHIER / ORGANIZER / ADMIN to resolve a member from a scanned QR
export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const venueId = searchParams.get("venueId");

  if (!userId || !venueId) {
    return NextResponse.json({ error: "userId y venueId requeridos" }, { status: 400 });
  }

  const hasRole = session.roles.some(
    (r) =>
      (r.role === "TOKEN_CASHIER" || r.role === "ORGANIZER" || r.role === "ADMIN") &&
      (r.venueId === venueId || r.role === "ADMIN")
  );
  if (!hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const membership = await db.membership.findFirst({
    where: { userId, venueId, status: "ACTIVE" },
    include: { user: { select: { id: true, name: true, phone: true } } },
  });
  if (!membership) return NextResponse.json({ error: "Miembro no encontrado en este venue" }, { status: 404 });

  const balanceCents = await getBalance(membership.id);

  return NextResponse.json({
    membershipId: membership.id,
    member: membership.user,
    balanceCents,
    status: membership.status,
  });
}
