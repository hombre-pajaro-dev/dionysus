import { describe, beforeEach, it, expect } from "vitest";
import { generateOtp, verifyOtp, createSession, verifySession } from "@/modules/auth";
import { db } from "@/lib/db";
import { cleanDb, createVenue, createMember } from "@/test/helpers";

describe("Auth module", () => {
  beforeEach(async () => {
    await cleanDb();
  });

  // ── OTP ────────────────────────────────────────────────────────

  it("generateOtp + verifyOtp happy path", async () => {
    const venue = await createVenue();
    const member = await createMember(venue.id, { phone: "+5215512345678" });
    const code = await generateOtp(member.phone);
    expect(code).toMatch(/^\d{6}$/);
    expect(await verifyOtp(member.phone, code)).toBe(true);
  });

  it("verifyOtp rejects wrong code", async () => {
    const venue = await createVenue();
    const member = await createMember(venue.id, { phone: "+5215511111111" });
    await generateOtp(member.phone);
    expect(await verifyOtp(member.phone, "000000")).toBe(false);
  });

  it("verifyOtp rejects expired code", async () => {
    const venue = await createVenue();
    const member = await createMember(venue.id, { phone: "+5215522222222" });
    // Insert an already-expired OTP directly — tests verifyOtp's expiry check
    await db.otpCode.create({
      data: { phone: member.phone, code: "654321", expiresAt: new Date(Date.now() - 1000) },
    });
    expect(await verifyOtp(member.phone, "654321")).toBe(false);
  });

  it("verifyOtp rejects an already-used code", async () => {
    const venue = await createVenue();
    const member = await createMember(venue.id, { phone: "+5215533333333" });
    const code = await generateOtp(member.phone);
    await verifyOtp(member.phone, code); // first use — consumes it
    expect(await verifyOtp(member.phone, code)).toBe(false); // second use — rejected
  });

  // ── Session ────────────────────────────────────────────────────

  it("createSession + verifySession round-trip", async () => {
    const venue = await createVenue();
    const member = await createMember(venue.id);
    const token = await createSession(member.id);
    const session = await verifySession(token);
    expect(session?.memberId).toBe(member.id);
  });

  it("verifySession rejects a tampered token", async () => {
    const result = await verifySession("not.a.valid.jwt");
    expect(result).toBeNull();
  });
});
