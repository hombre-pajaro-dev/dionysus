import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

export type BalanceOperation = {
  membershipId: string;
  amountCents: number;
  concept: string;
  externalReference?: string;
};

export async function getBalance(membershipId: string): Promise<number> {
  const result = await db.transaction.aggregate({
    where: { membershipId },
    _sum: { amountCents: true },
  });
  return result._sum.amountCents ?? 0;
}

export async function credit(op: BalanceOperation & { type: TransactionType }) {
  return db.transaction.create({
    data: {
      membershipId: op.membershipId,
      type: op.type,
      amountCents: Math.abs(op.amountCents),
      concept: op.concept,
      externalReference: op.externalReference,
    },
  });
}

export async function debit(op: BalanceOperation) {
  const current = await getBalance(op.membershipId);
  if (current < op.amountCents) {
    throw new Error("INSUFFICIENT_BALANCE");
  }
  return db.transaction.create({
    data: {
      membershipId: op.membershipId,
      type: TransactionType.POS_DEBIT,
      amountCents: -Math.abs(op.amountCents),
      concept: op.concept,
      externalReference: op.externalReference,
    },
  });
}

export async function reverse(originalTransactionId: string, concept: string) {
  const original = await db.transaction.findUniqueOrThrow({
    where: { id: originalTransactionId },
  });
  return db.transaction.create({
    data: {
      membershipId: original.membershipId,
      type: TransactionType.REVERSAL,
      amountCents: -original.amountCents,
      concept,
      reversalOfId: originalTransactionId,
    },
  });
}

export async function getTransactionHistory(membershipId: string) {
  return db.transaction.findMany({
    where: { membershipId },
    orderBy: { createdAt: "desc" },
  });
}
