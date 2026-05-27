import { db } from "@/lib/db";
import { RoleType } from "@prisma/client";

export { RoleType };

export async function assignRole(
  userId: string,
  role: RoleType,
  venueId: string | null,
  assignedById?: string
) {
  // findFirst + create because @@unique with nullable venueId doesn't prevent
  // duplicate rows when venueId is NULL (PostgreSQL NULL != NULL in unique index).
  const existing = await db.userRole.findFirst({
    where: { userId, role, venueId },
  });
  if (existing) return existing;

  return db.userRole.create({
    data: { userId, role, venueId, assignedById },
  });
}

export async function revokeRole(userRoleId: string) {
  return db.userRole.delete({ where: { id: userRoleId } });
}

export async function getUserRoles(userId: string) {
  return db.userRole.findMany({
    where: { userId },
    include: { venue: { select: { id: true, name: true } } },
  });
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await db.userRole.findFirst({
    where: { userId, role: RoleType.ADMIN },
  });
  return role !== null;
}

export async function getAllUsersWithRoles() {
  return db.user.findMany({
    include: {
      roles: {
        include: { venue: { select: { id: true, name: true } } },
        orderBy: { assignedAt: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function seedAdmin(phone: string) {
  const user = await db.user.upsert({
    where: { phone },
    update: {},
    create: { phone, name: "Admin" },
  });

  await assignRole(user.id, RoleType.ADMIN, null);
  return user;
}
