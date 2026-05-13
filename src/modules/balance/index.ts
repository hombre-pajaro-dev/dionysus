import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

export type BalanceOperation = {
  memberId: string;
  amountCents: number;
  concept: string;
  externalReference?: string;
};

export async function getBalance(memberId: string): Promise<number> {
  const result = await db.transaction.aggregate({
    where: { memberId },
    _sum: { amountCents: true },
  });
  return result._sum.amountCents ?? 0;
}

export async function credit(op: BalanceOperation & { type: TransactionType }) {
  return db.transaction.create({
    data: {
      memberId: op.memberId,
      type: op.type,
      amountCents: Math.abs(op.amountCents),
      concept: op.concept,
      externalReference: op.externalReference,
    },
  });
}

export async function debit(op: BalanceOperation) {
  if (op.externalReference) {
    const existing = await db.transaction.findFirst({
      where: { externalReference: op.externalReference, memberId: op.memberId },
    });
    if (existing) return existing;
  }

  const current = await getBalance(op.memberId);
  if (current < op.amountCents) {
    throw new Error("INSUFFICIENT_BALANCE");
  }
  return db.transaction.create({
    data: {
      memberId: op.memberId,
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
      memberId: original.memberId,
      type: TransactionType.REVERSAL,
      amountCents: -original.amountCents,
      concept,
      reversalOfId: originalTransactionId,
    },
  });
}

export async function getTransactionHistory(memberId: string) {
  return db.transaction.findMany({
    where: { memberId },
    orderBy: { createdAt: "desc" },
  });
}
