import Stripe from "stripe";
import { db } from "@/lib/db";
import { credit } from "@/modules/balance";
import { TransactionType } from "@prisma/client";

// Payment provider abstraction — add MercadoPago adapter here in the future
export type PaymentProvider = "stripe";

export type InitiatePaymentParams = {
  memberId: string;
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

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });
}

export async function initiatePayment(params: InitiatePaymentParams): Promise<PaymentResult> {
  const { memberId, eventId, amountCents, method } = params;

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: "mxn",
    payment_method_types: method === "oxxo" ? ["oxxo"] : ["card"],
    metadata: { memberId, eventId: eventId ?? "" },
  });

  const payment = await db.payment.create({
    data: {
      memberId,
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

  // Credit balance and grant event access atomically
  await db.$transaction(async (tx) => {
    await tx.transaction.create({
      data: {
        memberId: payment.memberId,
        type: TransactionType.DONATION,
        amountCents: payment.amountCents,
        concept: payment.eventId ? `Donativo evento` : "Recarga de tokens",
        externalReference: stripePaymentIntentId,
      },
    });

    if (payment.eventId) {
      await tx.eventAccess.upsert({
        where: { memberId_eventId: { memberId: payment.memberId, eventId: payment.eventId } },
        create: { memberId: payment.memberId, eventId: payment.eventId, paymentId: payment.id },
        update: {},
      });
    }
  });
}
