import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { assignRole, getAllUsersWithRoles, isAdmin, RoleType } from "@/modules/roles";

// GET /api/admin/roles — list all users with their roles
export async function GET(req: NextRequest) {
  void req;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.userId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await getAllUsersWithRoles();
  return NextResponse.json(users);
}

const AssignSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(RoleType),
  venueId: z.string().nullable().optional(),
});

// POST /api/admin/roles — assign a role to a user
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.userId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = AssignSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { userId, role, venueId } = parsed.data;

  // ADMIN role must have venueId = null
  const resolvedVenueId = role === RoleType.ADMIN ? null : (venueId ?? null);

  const userRole = await assignRole(userId, role, resolvedVenueId, session.userId);
  return NextResponse.json(userRole, { status: 201 });
}
