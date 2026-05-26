import { SignJWT, jwtVerify } from "jose";
import { db } from "@/lib/db";

const OTP_TTL_MINUTES = 10;
const SESSION_TTL_DAYS = 30;
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function generateOtp(phone: string): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await db.otpCode.create({ data: { phone, code, expiresAt } });
  return code;
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const otp = await db.otpCode.findFirst({
    where: {
      phone,
      code,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) return false;

  await db.otpCode.update({ where: { id: otp.id }, data: { usedAt: new Date() } });
  return true;
}

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);
}

export async function verifySession(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.sub! };
  } catch {
    return null;
  }
}
