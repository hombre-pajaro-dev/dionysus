import { describe, beforeEach, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/pos/balance/route";
import { POST } from "@/app/api/pos/debit/route";
import { credit } from "@/modules/balance";
import { TransactionType } from "@prisma/client";
import { cleanDb, createVenue, createMember } from "@/test/helpers";

const API_KEY = process.env.POS_API_KEY!;

function balanceReq(memberId: string, apiKey = API_KEY) {
  return new NextRequest(`http://localhost/api/pos/balance?qr=${memberId}`, {
    headers: { "x-api-key": apiKey },
  });
}

function debitReq(body: object, apiKey = API_KEY) {
  return new NextRequest("http://localhost/api/pos/debit", {
    method: "POST",
    headers: { "x-api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POS API", () => {
  let memberId: string;

  beforeEach(async () => {
    await cleanDb();
    const venue = await createVenue();
    const member = await createMember(venue.id);
    memberId = member.id;
  });

  // ── GET /balance ───────────────────────────────────────────────

  it("GET balance returns member balance", async () => {
    await credit({ memberId, amountCents: 800, concept: "donativo", type: TransactionType.DONATION });
    const res = await GET(balanceReq(memberId));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.balanceCents).toBe(800);
    expect(data.balancePesos).toBe(8);
  });

  it("GET balance rejects missing API key", async () => {
    const res = await GET(balanceReq(memberId, "wrong-key"));
    expect(res.status).toBe(401);
  });

  it("GET balance returns 404 for unknown member", async () => {
    const res = await GET(balanceReq("nonexistent-id"));
    expect(res.status).toBe(404);
  });

  // ── POST /debit ────────────────────────────────────────────────

  it("POST debit reduces member balance", async () => {
    await credit({ memberId, amountCents: 1000, concept: "donativo", type: TransactionType.DONATION });
    const res = await POST(debitReq({ qr: memberId, amountCents: 300, concept: "consumo", transactionId: "pos-1" }));
    expect(res.status).toBe(200);
    const balRes = await GET(balanceReq(memberId));
    expect((await balRes.json()).balanceCents).toBe(700);
  });

  it("POST debit is idempotent on same transactionId", async () => {
    await credit({ memberId, amountCents: 1000, concept: "donativo", type: TransactionType.DONATION });
    const payload = { qr: memberId, amountCents: 300, concept: "consumo", transactionId: "pos-idem-1" };
    await POST(debitReq(payload));
    await POST(debitReq(payload)); // second call — same ID
    const balRes = await GET(balanceReq(memberId));
    expect((await balRes.json()).balanceCents).toBe(700); // debited once
  });

  it("POST debit returns 422 for insufficient balance", async () => {
    const res = await POST(debitReq({ qr: memberId, amountCents: 500, concept: "consumo", transactionId: "pos-2" }));
    expect(res.status).toBe(422);
  });
});
