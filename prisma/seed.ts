import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const adminPhone = process.env.SEED_ADMIN_PHONE;
  if (!adminPhone) {
    console.error("SEED_ADMIN_PHONE env var not set — skipping admin seed");
    return;
  }

  const user = await db.user.upsert({
    where: { phone: adminPhone },
    update: {},
    create: { phone: adminPhone, name: "Admin" },
  });

  const existing = await db.userRole.findFirst({
    where: { userId: user.id, role: "ADMIN", venueId: null },
  });

  if (!existing) {
    await db.userRole.create({
      data: { userId: user.id, role: "ADMIN", venueId: null },
    });
    console.log(`✓ ADMIN role assigned to ${adminPhone} (userId: ${user.id})`);
  } else {
    console.log(`✓ ${adminPhone} already has ADMIN role`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
