import { db } from "@/lib/db";
import { MembershipStatus } from "@prisma/client";

export type RegisterParams = {
  phone: string;
  name: string;
  city?: string;
  artPractice?: string;
  howHeard?: string;
  whyJoin?: string;
  inviteToken: string;
};

export async function register(params: RegisterParams) {
  const invite = await db.inviteLink.findUnique({
    where: { token: params.inviteToken },
    include: { uses: true, venue: true },
  });

  if (!invite) throw new Error("INVALID_INVITE");

  if (invite.maxUses !== null && invite.uses.length >= invite.maxUses) {
    throw new Error("INVITE_EXHAUSTED");
  }

  return db.$transaction(async (tx) => {
    // Upsert user — phone is global identity; existing users just get a new membership
    const user = await tx.user.upsert({
      where: { phone: params.phone },
      update: {},
      create: {
        phone: params.phone,
        name: params.name,
        city: params.city,
        artPractice: params.artPractice,
      },
    });

    const membership = await tx.membership.create({
      data: {
        userId: user.id,
        venueId: invite.venueId,
        howHeard: params.howHeard,
        whyJoin: params.whyJoin,
        referrerId: invite.generatedById,
        status: invite.venue.visibility === "PRIVATE"
          ? MembershipStatus.PENDING
          : MembershipStatus.ACTIVE,
      },
    });

    await tx.inviteLinkUse.create({
      data: { inviteLinkId: invite.id, membershipId: membership.id },
    });

    return { user, membership };
  });
}

export async function acceptManifesto(membershipId: string) {
  return db.membership.update({
    where: { id: membershipId },
    data: { manifestoAcceptedAt: new Date() },
  });
}

export async function approve(membershipId: string) {
  return db.membership.update({
    where: { id: membershipId },
    data: { status: MembershipStatus.ACTIVE },
  });
}

export async function suspend(membershipId: string) {
  return db.membership.update({
    where: { id: membershipId },
    data: { status: MembershipStatus.SUSPENDED },
  });
}

export async function getPendingRequests(venueId: string) {
  return db.membership.findMany({
    where: { venueId, status: MembershipStatus.PENDING },
    include: {
      user: { select: { name: true, phone: true } },
      referrer: { select: { name: true, phone: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function generateInviteLink(
  userId: string,
  venueId: string,
  maxUses: number | null = 1
): Promise<string> {
  const invite = await db.inviteLink.create({
    data: { generatedById: userId, venueId, maxUses },
  });
  return invite.token;
}
