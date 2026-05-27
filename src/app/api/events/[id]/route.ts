import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { db } from "@/lib/db";

const patchSchema = z.object({
  cancelled: z.boolean().optional(),
  name: z.string().min(1).optional(),
  date: z.string().datetime().optional(),
  minimumDonation: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  visibility: z.enum(["PUBLIC", "MEMBERS_ONLY"]).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });

  const hasRole = session.roles.some(
    (r) =>
      (r.role === "ORGANIZER" || r.role === "ADMIN") &&
      (r.venueId === event.venueId || r.role === "ADMIN")
  );
  if (!hasRole) return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const { cancelled, ...rest } = parsed.data;
  const updated = await db.event.update({
    where: { id },
    data: {
      ...rest,
      ...(rest.date ? { date: new Date(rest.date) } : {}),
      ...(cancelled === true ? { cancelledAt: new Date() } : {}),
      ...(cancelled === false ? { cancelledAt: null } : {}),
    },
  });

  return NextResponse.json(updated);
}
