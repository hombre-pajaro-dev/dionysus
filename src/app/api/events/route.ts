import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { db } from "@/lib/db";

const createSchema = z.object({
  venueId: z.string().min(1),
  name: z.string().min(1),
  date: z.string().datetime(),
  durationMinutes: z.number().int().positive().optional(),
  description: z.string().optional(),
  minimumDonation: z.number().int().nonnegative(),
  visibility: z.enum(["PUBLIC", "MEMBERS_ONLY"]).default("MEMBERS_ONLY"),
});

// GET /api/events
// - Without auth + no venueId: returns PUBLIC events from PUBLIC venues only (discovery)
// - With venueId + auth: returns events of that venue the user is member of
export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");

  if (venueId) {
    if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

    // Verify user is active member or has role in this venue
    const isMember = await db.membership.findFirst({
      where: { userId: session.userId, venueId, status: "ACTIVE" },
    });
    const hasRole = session.roles.some((r) => r.venueId === venueId || r.role === "ADMIN");

    if (!isMember && !hasRole) {
      return NextResponse.json({ error: "Sin acceso a este venue" }, { status: 403 });
    }

    const events = await db.event.findMany({
      where: { venueId, cancelledAt: null },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  }

  // Public discovery — only events from PUBLIC venues, only PUBLIC visibility events
  const events = await db.event.findMany({
    where: {
      venue: { visibility: "PUBLIC" },
      visibility: "PUBLIC",
      cancelledAt: null,
    },
    include: { venue: { select: { name: true, slug: true } } },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(events);
}

// POST /api/events
export async function POST(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const { venueId, name, date, durationMinutes, description, minimumDonation, visibility } = parsed.data;

  const hasRole = session.roles.some(
    (r) =>
      (r.role === "ORGANIZER" || r.role === "ADMIN") &&
      (r.venueId === venueId || r.role === "ADMIN")
  );
  if (!hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const event = await db.event.create({
    data: {
      venueId,
      name,
      date: new Date(date),
      durationMinutes: durationMinutes ?? 180,
      description,
      minimumDonation,
      visibility,
      createdById: session.userId,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
