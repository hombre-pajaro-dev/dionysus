import { describe, beforeEach, it, expect } from "vitest";
import { confirmPayment } from "@/modules/donations";
import { getBalance } from "@/modules/balance";
import { db } from "@/lib/db";
import { cleanDb, createVenue, createMember, createEvent } from "@/test/helpers";

async function createPendingPayment(memberId: string, eventId?: string, amountCents = 25000) {
  return db.payment.create({
    data: {
      memberId,
      eventId,
      amountCents,
      provider: "stripe",
      providerPaymentId: `pi_test_${Math.random().toString(36).slice(2)}`,
      status: "PENDING",
      method: "card",
    },
  });
}

describe("Donations module", () => {
  let memberId: string;
  let venueId: string;

  beforeEach(async () => {
    await cleanDb();
    const venue = await createVenue();
    venueId = venue.id;
    const member = await createMember(venueId);
    memberId = member.id;
  });

  it("confirmPayment credits balance after payment confirmed", async () => {
    const payment = await createPendingPayment(memberId, undefined, 30000);
    await confirmPayment(payment.providerPaymentId!);
    expect(await getBalance(memberId)).toBe(30000);
  });

  it("confirmPayment is idempotent if already CONFIRMED", async () => {
    const payment = await createPendingPayment(memberId, undefined, 20000);
    await confirmPayment(payment.providerPaymentId!);
    await confirmPayment(payment.providerPaymentId!); // second call
    expect(await getBalance(memberId)).toBe(20000); // credited once
  });

  it("confirmPayment grants EventAccess when eventId is set", async () => {
    const member2 = await createMember(venueId);
    const event = await createEvent(venueId, member2.id);
    const payment = await createPendingPayment(memberId, event.id, 25000);

    await confirmPayment(payment.providerPaymentId!);

    const access = await db.eventAccess.findUnique({
      where: { memberId_eventId: { memberId, eventId: event.id } },
    });
    expect(access).not.toBeNull();
    expect(await getBalance(memberId)).toBe(25000);
  });
});
