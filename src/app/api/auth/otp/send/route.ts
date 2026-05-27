import { NextResponse } from "next/server";
import { z } from "zod";
import { generateOtp } from "@/modules/auth";
import { sendOtp } from "@/modules/notifications";

const schema = z.object({
  phone: z.string().min(7),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "phone requerido" }, { status: 400 });
  }

  const { phone } = parsed.data;
  const code = await generateOtp(phone);
  await sendOtp(phone, code);

  return NextResponse.json({ ok: true });
}
