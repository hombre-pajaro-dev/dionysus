import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyOtp, createSession } from "@/modules/auth";

const schema = z.object({
  phone: z.string().min(7),
  code: z.string().length(6),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "phone y code requeridos" }, { status: 400 });
  }

  const { phone, code } = parsed.data;
  const valid = await verifyOtp(phone, code);

  if (!valid) {
    return NextResponse.json({ error: "Código inválido o expirado" }, { status: 401 });
  }

  const user = await db.user.upsert({
    where: { phone },
    update: {},
    create: { phone, name: phone },
  });

  const token = await createSession(user.id);

  const res = NextResponse.json({ ok: true, userId: user.id });
  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
