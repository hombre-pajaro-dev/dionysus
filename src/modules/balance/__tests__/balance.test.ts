import { describe, beforeEach, it, expect } from "vitest";
import { TransactionType } from "@prisma/client";
import { credit, debit, getBalance, getTransactionHistory, reverse } from "@/modules/balance";
import { cleanDb, createVenue, createMember } from "@/test/helpers";

describe("Balance module", () => {
  let memberId: string;

  beforeEach(async () => {
    await cleanDb();
    const venue = await createVenue();
    const member = await createMember(venue.id);
    memberId = member.id;
  });

  // ── Tracer bullet ──────────────────────────────────────────────
  it("credit → getBalance reflects credited amount", async () => {
    await credit({ memberId, amountCents: 500, concept: "donativo", type: TransactionType.DONATION });
    expect(await getBalance(memberId)).toBe(500);
  });

  it("debit reduces balance", async () => {
    await credit({ memberId, amountCents: 1000, concept: "donativo", type: TransactionType.DONATION });
    await debit({ memberId, amountCents: 300, concept: "consumo POS" });
    expect(await getBalance(memberId)).toBe(700);
  });

  it("debit with insufficient balance throws INSUFFICIENT_BALANCE", async () => {
    await credit({ memberId, amountCents: 100, concept: "donativo", type: TransactionType.DONATION });
    await expect(debit({ memberId, amountCents: 200, concept: "consumo POS" }))
      .rejects.toThrow("INSUFFICIENT_BALANCE");
    expect(await getBalance(memberId)).toBe(100); // unchanged
  });

  it("debit with duplicate externalReference is idempotent", async () => {
    await credit({ memberId, amountCents: 1000, concept: "donativo", type: TransactionType.DONATION });
    const ref = "pos-tx-abc123";
    await debit({ memberId, amountCents: 300, concept: "consumo POS", externalReference: ref });
    await debit({ memberId, amountCents: 300, concept: "consumo POS", externalReference: ref });
    expect(await getBalance(memberId)).toBe(700); // debited once, not twice
  });

  it("reverse credits back the original amount", async () => {
    await credit({ memberId, amountCents: 1000, concept: "donativo", type: TransactionType.DONATION });
    const tx = await debit({ memberId, amountCents: 400, concept: "consumo POS" });
    await reverse(tx.id, "error de cobro");
    expect(await getBalance(memberId)).toBe(1000); // fully restored
  });

  it("history is append-only and ordered newest-first", async () => {
    await credit({ memberId, amountCents: 500, concept: "donativo", type: TransactionType.DONATION });
    await debit({ memberId, amountCents: 100, concept: "consumo POS" });
    const history = await getTransactionHistory(memberId);
    expect(history).toHaveLength(2);
    expect(history[0].amountCents).toBe(-100); // debit is newest
    expect(history[1].amountCents).toBe(500);
    // Entries are immutable — no updatedAt field exists
    history.forEach((tx) => expect(tx).not.toHaveProperty("updatedAt"));
  });
});
