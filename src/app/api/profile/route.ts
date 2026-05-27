import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth-request";
import { db } from "@/lib/db";

const patchSchema = z.object({
  name: z.string().min(1).optional(),
  city: z.string().optional(),
  artPractice: z.string().optional(),
});

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, phone: true, name: true, city: true, artPractice: true, createdAt: true },
  });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const user = await db.user.update({
    where: { id: session.userId },
    data: parsed.data,
    select: { id: true, phone: true, name: true, city: true, artPractice: true },
  });

  return NextResponse.json(user);
}
