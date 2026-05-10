import { db } from "@/lib/db";
import { MemberStatus } from "@prisma/client";

export type RegisterParams = {
  phone: string;
  name: string;
  city?: string;
  artPractice?: string;
  howHeard?: string;
  whyJoin?: string;
  inviteToken: string;
  venueId: string;
};

export async function register(params: RegisterParams) {
  const invite = await db.inviteLink.findUnique({
    where: { token: params.inviteToken },
  });

  if (!invite || invite.usedAt) {
    throw new Error("INVALID_INVITE");
  }

  const member = await db.$transaction(async (tx) => {
    const m = await tx.member.create({
      data: {
        phone: params.phone,
        name: params.name,
        city: params.city,
        artPractice: params.artPractice,
        howHeard: params.howHeard,
        whyJoin: params.whyJoin,
        venueId: params.venueId,
        referrerId: invite.generatedById,
        status: MemberStatus.PENDING,
      },
    });

    await tx.inviteLink.update({
      where: { id: invite.id },
      data: { usedByMemberId: m.id, usedAt: new Date() },
    });

    return m;
  });

  return member;
}

export async function acceptManifesto(memberId: string) {
  return db.member.update({
    where: { id: memberId },
    data: { manifestoAcceptedAt: new Date() },
  });
}

export async function approve(memberId: string, approvedById: string) {
  return db.member.update({
    where: { id: memberId },
    data: { status: MemberStatus.ACTIVE },
  });
}

export async function suspend(memberId: string) {
  return db.member.update({
    where: { id: memberId },
    data: { status: MemberStatus.SUSPENDED },
  });
}

export async function getPendingRequests(venueId: string) {
  return db.member.findMany({
    where: { venueId, status: MemberStatus.PENDING },
    include: { referrer: { select: { name: true, phone: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function generateInviteLink(memberId: string): Promise<string> {
  const invite = await db.inviteLink.create({
    data: { generatedById: memberId },
  });
  return invite.token;
}
