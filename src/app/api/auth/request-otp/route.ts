import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOtp } from "@/modules/auth";
import { sendOtp } from "@/modules/notifications";

const schema = z.object({ phone: z.string().min(10).max(20) });

// In-memory rate limit: 1 request per phone per 60s
const rateLimitMap = new Map<string, number>();

function isRateLimited(phone: string): boolean {
  const last = rateLimitMap.get(phone);
  if (last && Date.now() - last < 60_000) return true;
  rateLimitMap.set(phone, Date.now());
  return false;
}

export async function POST(req: NextRequest) {
  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: "Número inválido" }, { status: 400 });
  }

  const { phone } = body.data;

  if (isRateLimited(phone)) {
    return NextResponse.json(
      { error: "Espera un minuto antes de pedir otro código" },
      { status: 429 }
    );
  }

  const code = await generateOtp(phone);
  await sendOtp(phone, code);

  return NextResponse.json({ ok: true });
}
