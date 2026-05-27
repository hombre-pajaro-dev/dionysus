import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { generateQrDataUrl } from "@/modules/qr";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const dataUrl = await generateQrDataUrl(session.userId);
  return NextResponse.json({ userId: session.userId, dataUrl });
}
