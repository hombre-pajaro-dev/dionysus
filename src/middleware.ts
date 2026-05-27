import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { SessionRole } from "@/modules/auth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Route prefixes that skip auth entirely
const PUBLIC_PREFIXES = [
  "/login",
  "/registro",
  "/403",
  "/api/auth",
  "/api/webhooks",
  "/api/pos",
  "/_next",
  "/favicon",
  "/manifest",
  "/icons",
];

const ROLE_RULES: Array<{ prefix: string; roles: string[] }> = [
  { prefix: "/admin", roles: ["ADMIN", "ORGANIZER"] },
  { prefix: "/puerta", roles: ["DOOR_OPERATOR", "ORGANIZER"] },
  { prefix: "/cajero", roles: ["TOKEN_CASHIER", "ORGANIZER"] },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let userId: string;
  let roles: SessionRole[] = [];

  try {
    const { payload } = await jwtVerify(token, secret);
    userId = payload.sub!;
    roles = (payload.roles as SessionRole[]) ?? [];
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }

  void userId; // used implicitly via roles check

  const rule = ROLE_RULES.find((r) => pathname.startsWith(r.prefix));
  if (rule) {
    const userRoleNames = roles.map((r) => r.role);
    const allowed = rule.roles.some((r) => userRoleNames.includes(r));
    if (!allowed) {
      return NextResponse.rewrite(new URL("/403", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|icons).*)"],
};
