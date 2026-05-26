import Stripe from "stripe";
import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

// Payment provider abstraction — add MercadoPago adapter here in the future
export type PaymentProvider = "stripe";

export type InitiatePaymentParams = {
  userId: string;
  membershipId: string;
  eventId?: string;
  amountCents: number;
  method: "card" | "oxxo";
  provider?: PaymentProvider;
};

export type PaymentResult = {
  paymentId: string;
  clientSecret: string;
  status: "pending" | "confirmed";
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function initiatePayment(params: InitiatePaymentParams): Promise<PaymentResult> {
  const { userId, membershipId, eventId, amountCents, method } = params;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "mxn",
    payment_method_types: method === "oxxo" ? ["oxxo"] : ["card"],
    metadata: { userId, membershipId, eventId: eventId ?? "" },
  });

  const payment = await db.payment.create({
    data: {
      userId,
      membershipId,
      eventId,
      amountCents,
      provider: "stripe",
      providerPaymentId: paymentIntent.id,
      method,
      status: "PENDING",
    },
  });

  return {
    paymentId: payment.id,
    clientSecret: paymentIntent.client_secret!,
    status: "pending",
  };
}

// Called from Stripe webhook after payment confirmation
export async function confirmPayment(stripePaymentIntentId: string) {
  const payment = await db.payment.findUniqueOrThrow({
    where: { providerPaymentId: stripePaymentIntentId },
  });

  if (payment.status === "CONFIRMED") return; // Idempotent

  await db.payment.update({
    where: { id: payment.id },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });

  await db.$transaction(async (tx) => {
    await tx.transaction.create({
      data: {
        membershipId: payment.membershipId,
        type: TransactionType.DONATION,
        amountCents: payment.amountCents,
        concept: payment.eventId ? `Donativo evento` : "Recarga de tokens",
        externalReference: stripePaymentIntentId,
      },
    });

    if (payment.eventId) {
      await tx.eventAccess.upsert({
        where: { membershipId_eventId: { membershipId: payment.membershipId, eventId: payment.eventId } },
        create: { membershipId: payment.membershipId, eventId: payment.eventId, paymentId: payment.id },
        update: {},
      });
    }
  });
}
