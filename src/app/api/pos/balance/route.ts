import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBalance } from "@/modules/balance";

function isAuthorized(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.POS_API_KEY;
}

// GET /api/pos/balance?qr=<memberId>
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberId = req.nextUrl.searchParams.get("qr");
  if (!memberId) {
    return NextResponse.json({ error: "Missing qr param" }, { status: 400 });
  }

  const member = await db.member.findUnique({
    where: { id: memberId },
    select: { id: true, name: true, status: true },
  });

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const balanceCents = await getBalance(memberId);

  return NextResponse.json({
    memberId: member.id,
    name: member.name,
    status: member.status,
    balanceCents,
    balancePesos: balanceCents / 100,
  });
}
