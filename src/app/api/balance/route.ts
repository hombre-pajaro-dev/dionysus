import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { getBalance, getTransactionHistory } from "@/modules/balance";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const membershipId = searchParams.get("membershipId");
  const includeHistory = searchParams.get("history") === "true";

  if (!membershipId) return NextResponse.json({ error: "membershipId requerido" }, { status: 400 });

  const membership = await db.membership.findUnique({ where: { id: membershipId } });
  if (!membership) return NextResponse.json({ error: "Membresía no encontrada" }, { status: 404 });

  // User can only see their own membership balance, unless ORGANIZER/ADMIN for that venue
  const isOwner = membership.userId === session.userId;
  const hasRole = session.roles.some(
    (r) =>
      (r.role === "ORGANIZER" || r.role === "ADMIN" || r.role === "TOKEN_CASHIER") &&
      (r.venueId === membership.venueId || r.role === "ADMIN")
  );
  if (!isOwner && !hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const balanceCents = await getBalance(membershipId);

  if (includeHistory) {
    const transactions = await getTransactionHistory(membershipId);
    return NextResponse.json({ balanceCents, transactions });
  }

  return NextResponse.json({ balanceCents });
}
