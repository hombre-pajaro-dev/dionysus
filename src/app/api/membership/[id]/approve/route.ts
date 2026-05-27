import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { approve } from "@/modules/membership";
import { db } from "@/lib/db";
import { sendWelcome } from "@/modules/notifications";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const membership = await db.membership.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!membership) return NextResponse.json({ error: "Membresía no encontrada" }, { status: 404 });

  const hasAccess = session.roles.some(
    (r) =>
      (r.role === "ORGANIZER" || r.role === "DOOR_OPERATOR" || r.role === "ADMIN") &&
      (r.venueId === membership.venueId || r.role === "ADMIN")
  );
  if (!hasAccess) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const updated = await approve(id);
  await sendWelcome(membership.user.phone, membership.user.name).catch(() => {});

  return NextResponse.json({ membershipId: updated.id, status: updated.status });
}
