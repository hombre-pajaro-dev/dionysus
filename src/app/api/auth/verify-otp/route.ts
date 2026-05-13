import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOtp, createSession } from "@/modules/auth";
import { db } from "@/lib/db";
import { SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

const schema = z.object({
  phone: z.string().min(10).max(20),
  code: z.string().length(6),
});

export async function POST(req: NextRequest) {
  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { phone, code } = body.data;
  const valid = await verifyOtp(phone, code);

  if (!valid) {
    return NextResponse.json({ error: "Código incorrecto o expirado" }, { status: 401 });
  }

  const member = await db.member.findUnique({
    where: { phone },
    select: { id: true, status: true },
  });

  if (!member) {
    return NextResponse.json({ error: "Teléfono no registrado" }, { status: 404 });
  }

  const token = await createSession(member.id);

  const res = NextResponse.json({ ok: true, status: member.status });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
