import { NextRequest, NextResponse } from "next/server";
import { debit } from "@/modules/balance";
import { z } from "zod";

function isAuthorized(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  return key === process.env.POS_API_KEY;
}

const schema = z.object({
  qr: z.string(),
  amountCents: z.number().int().positive(),
  concept: z.string(),
  transactionId: z.string(), // POS-side ID for idempotency
});

// POST /api/pos/debit
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload", details: body.error.issues }, { status: 400 });
  }

  const { qr, amountCents, concept, transactionId } = body.data;

  try {
    const tx = await debit({
      memberId: qr,
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
