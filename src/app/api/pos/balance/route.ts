import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBalance } from "@/modules/balance";

function isAuthorized(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.POS_API_KEY;
}

// GET /api/pos/balance?qr=<userId>
// POS_VENUE_ID env var identifies which venue this POS instance belongs to.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get("qr");
  if (!userId) {
    return NextResponse.json({ error: "Missing qr param" }, { status: 400 });
  }

  const venueId = process.env.POS_VENUE_ID!;

  const membership = await db.membership.findUnique({
    where: { userId_venueId: { userId, venueId } },
    include: { user: { select: { name: true } } },
  });

  if (!membership) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const balanceCents = await getBalance(membership.id);

  return NextResponse.json({
    userId,
    membershipId: membership.id,
    name: membership.user.name,
    status: membership.status,
    balanceCents,
    balancePesos: balanceCents / 100,
  });
}
