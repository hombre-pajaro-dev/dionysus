import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isAdmin, revokeRole } from "@/modules/roles";

// DELETE /api/admin/roles/[id] — revoke a role
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void req;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isAdmin(session.userId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await revokeRole(id);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Role not found" }, { status: 404 });
  }
}
