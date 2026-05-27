import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { generateInviteLink } from "@/modules/membership";

const schema = z.object({
  venueId: z.string().min(1),
  maxUses: z.number().int().positive().nullable().optional(),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "venueId requerido" }, { status: 400 });

  const { venueId, maxUses = 1 } = parsed.data;

  const hasAccess = session.roles.some(
    (r) => (r.role === "ORGANIZER" || r.role === "ADMIN") && (r.venueId === venueId || r.role === "ADMIN")
  );
  if (!hasAccess) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const token = await generateInviteLink(session.userId, venueId, maxUses ?? 1);
  return NextResponse.json({ token }, { status: 201 });
}
