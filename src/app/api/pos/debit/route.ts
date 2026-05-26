import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { debit } from "@/modules/balance";
import { z } from "zod";

function isAuthorized(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.POS_API_KEY;
}

const schema = z.object({
  qr: z.string(),             // userId from QR scan
  amountCents: z.number().int().positive(),
  concept: z.string(),
  transactionId: z.string(),  // POS-side ID for idempotency
});

// POST /api/pos/debit
// POS_VENUE_ID env var identifies which venue this POS instance belongs to.
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload", details: body.error.issues }, { status: 400 });
  }

  const { qr: userId, amountCents, concept, transactionId } = body.data;
  const venueId = process.env.POS_VENUE_ID!;

  const membership = await db.membership.findUnique({
    where: { userId_venueId: { userId, venueId } },
  });

  if (!membership) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  try {
    const tx = await debit({
      membershipId: membership.id,
      amountCents,
      concept,
      externalReference: transactionId,
    });

    return NextResponse.json({ success: true, transactionId: tx.id });
  } catch (err) {
    if (err instanceof Error && err.message === "INSUFFICIENT_BALANCE") {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 422 });
    }
    throw err;
  }
}
