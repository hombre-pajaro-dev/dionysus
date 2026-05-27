import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const eventId = searchParams.get("eventId");

  if (!userId || !eventId) {
    return NextResponse.json({ error: "userId y eventId requeridos" }, { status: 400 });
  }

  // Resolve event → venueId, then check caller has DOOR_OPERATOR or ORGANIZER in that venue
  const event = await db.event.findUnique({ where: { id: eventId } });
  if (!event) return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });

  const hasRole = session.roles.some(
    (r) =>
      (r.role === "DOOR_OPERATOR" || r.role === "ORGANIZER" || r.role === "ADMIN") &&
      (r.venueId === event.venueId || r.role === "ADMIN")
  );
  if (!hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  // Look up the member by userId in this venue
  const membership = await db.membership.findFirst({
    where: { userId, venueId: event.venueId, status: "ACTIVE" },
    include: { user: { select: { id: true, name: true, phone: true } } },
  });
  if (!membership) return NextResponse.json({ error: "Miembro no encontrado en este venue" }, { status: 404 });

  // Check EventAccess
  const access = await db.eventAccess.findUnique({
    where: { membershipId_eventId: { membershipId: membership.id, eventId } },
  });

  // Balance = sum of transactions for this membership
  const agg = await db.transaction.aggregate({
    where: { membershipId: membership.id },
    _sum: { amountCents: true },
  });
  const balanceCents = agg._sum.amountCents ?? 0;

  return NextResponse.json({
    hasAccess: access !== null,
    member: { id: membership.user.id, name: membership.user.name, phone: membership.user.phone },
    balanceCents,
    event: { id: event.id, name: event.name, date: event.date },
  });
}
