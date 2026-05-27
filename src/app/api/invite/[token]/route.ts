import { NextResponse } from "next/server";
import { z } from "zod";
import { register } from "@/modules/membership";
import { sendPendingApprovalAlert } from "@/modules/notifications";
import { db } from "@/lib/db";

// Public — returns venue info from invite token (no auth needed)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const invite = await db.inviteLink.findUnique({
    where: { token },
    include: { venue: { select: { id: true, name: true, description: true, manifesto: true, visibility: true } } },
  });
  if (!invite) return NextResponse.json({ error: "Liga no encontrada" }, { status: 404 });

  // Check if exhausted
  const useCount = await db.inviteLinkUse.count({ where: { inviteLinkId: invite.id } });
  const exhausted = invite.maxUses !== null && useCount >= invite.maxUses;

  return NextResponse.json({
    venue: invite.venue,
    exhausted,
  });
}

const schema = z.object({
  phone: z.string().min(7),
  name: z.string().min(1),
  howHeard: z.string().optional(),
  whyJoin: z.string().optional(),
  artPractice: z.string().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const { membership } = await register({ ...parsed.data, inviteToken: token });

    if (membership.status === "PENDING") {
      const organizers = await db.userRole.findMany({
        where: { venueId: membership.venueId, role: "ORGANIZER" },
        include: { user: true },
      });
      await Promise.allSettled(
        organizers.map((r) =>
          sendPendingApprovalAlert(r.user.phone, {
            name: parsed.data.name,
            artPractice: parsed.data.artPractice,
            whyJoin: parsed.data.whyJoin,
          })
        )
      );
    }

    return NextResponse.json({ membershipId: membership.id }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "ERROR";
    if (msg === "INVALID_INVITE") return NextResponse.json({ error: msg }, { status: 404 });
    if (msg === "INVITE_EXHAUSTED") return NextResponse.json({ error: msg }, { status: 409 });
    throw err;
  }
}
