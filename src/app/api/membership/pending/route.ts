import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { getPendingRequests } from "@/modules/membership";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");
  if (!venueId) return NextResponse.json({ error: "venueId requerido" }, { status: 400 });

  const hasAccess = session.roles.some(
    (r) => (r.role === "ORGANIZER" || r.role === "ADMIN") && (r.venueId === venueId || r.role === "ADMIN")
  );
  if (!hasAccess) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const pending = await getPendingRequests(venueId);
  return NextResponse.json(pending);
}
