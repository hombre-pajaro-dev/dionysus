import { db } from "@/lib/db";
import { MemberStatus } from "@prisma/client";

let counter = 0;
function uid() { return `${Date.now()}-${++counter}`; }

export async function cleanDb() {
  await db.eventAccess.deleteMany();
  await db.transaction.deleteMany();
  await db.payment.deleteMany();
  await db.otpCode.deleteMany();
  await db.memberRole.deleteMany();
  await db.inviteLink.deleteMany();
  // Null out self-referential FK before deleting members
  await db.member.updateMany({ data: { referrerId: null } });
  await db.member.deleteMany();
  await db.event.deleteMany();
  await db.venue.deleteMany();
}

export async function createVenue(overrides?: { name?: string; slug?: string }) {
  const slug = overrides?.slug ?? `venue-${uid()}`;
  return db.venue.create({
    data: { name: overrides?.name ?? "Test Venue", slug },
  });
}

export async function createMember(
  venueId: string,
  overrides?: { phone?: string; name?: string; status?: MemberStatus }
) {
  return db.member.create({
    data: {
      name:    overrides?.name   ?? "Test Member",
      phone:   overrides?.phone  ?? `+5219${uid().replace(/\D/g, "").slice(0, 10).padEnd(10, "0")}`,
      venueId,
      status:  overrides?.status ?? MemberStatus.ACTIVE,
    },
  });
}

export async function createEvent(venueId: string, createdById: string) {
  return db.event.create({
    data: {
      venueId,
      name: `Test Event ${uid()}`,
      date: new Date(Date.now() + 86_400_000),
      minimumDonation: 25000,
      createdById,
    },
  });
}
