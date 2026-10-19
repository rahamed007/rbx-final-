import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { SESSION_COOKIE, SESSION_SECRET } from "@/lib/session";

/**
 * Request proxy (Next.js 16 replacement for middleware). Runs on the Node.js
 * runtime and guards every /admin route behind a signed session cookie.
 */
function isValid(token: string | undefined): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 1) return false;
  const value = token.slice(0, idx);
  const mac = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const sep = value.lastIndexOf(":");
  const exp = Number(value.slice(sep + 1));
  return Number.isFinite(exp) && Date.now() <= exp;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isValid(req.cookies.get(SESSION_COOKIE)?.value)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
