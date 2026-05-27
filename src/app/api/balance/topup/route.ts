import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { credit } from "@/modules/balance";
import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

const schema = z.object({
  membershipId: z.string().min(1),
  amountCents: z.number().int().positive(),
  concept: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const { membershipId, amountCents, concept } = parsed.data;

  const membership = await db.membership.findUnique({ where: { id: membershipId } });
  if (!membership) return NextResponse.json({ error: "Membresía no encontrada" }, { status: 404 });

  const hasRole = session.roles.some(
    (r) =>
      (r.role === "TOKEN_CASHIER" || r.role === "ORGANIZER" || r.role === "ADMIN") &&
      (r.venueId === membership.venueId || r.role === "ADMIN")
  );
  if (!hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const tx = await credit({ membershipId, amountCents, concept, type: TransactionType.TOPUP });
  return NextResponse.json({ transactionId: tx.id, balanceCents: amountCents }, { status: 201 });
}
