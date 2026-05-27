import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { initiatePayment } from "@/modules/donations";
import { db } from "@/lib/db";

const schema = z.object({
  membershipId: z.string().min(1),
  eventId: z.string().optional(),
  amountCents: z.number().int().positive(),
  method: z.enum(["card", "oxxo"]),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const { membershipId, eventId, amountCents, method } = parsed.data;

  const membership = await db.membership.findUnique({ where: { id: membershipId } });
  if (!membership) return NextResponse.json({ error: "Membresía no encontrada" }, { status: 404 });
  if (membership.userId !== session.userId) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }
  if (membership.status !== "ACTIVE") {
    return NextResponse.json({ error: "Membresía no activa" }, { status: 403 });
  }

  const result = await initiatePayment({
    userId: session.userId,
    membershipId,
    eventId,
    amountCents,
    method,
  });

  return NextResponse.json(result, { status: 201 });
}
