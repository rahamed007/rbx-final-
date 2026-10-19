import crypto from "crypto";
import { cookies } from "next/headers";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SESSION_COOKIE, SESSION_SECRET } from "./session";

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(value: string) {
  const mac = crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
  return `${value}.${mac}`;
}

function verify(signed: string | undefined): string | null {
  if (!signed) return null;
  const idx = signed.lastIndexOf(".");
  if (idx < 1) return null;
  const value = signed.slice(0, idx);
  const mac = signed.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const sep = value.lastIndexOf(":");
  const email = value.slice(0, sep);
  const exp = Number(value.slice(sep + 1));
  if (!email || !Number.isFinite(exp) || Date.now() > exp) return null;
  return email;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(test);
  const b = Buffer.from(hash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function login(email: string, password: string): Promise<boolean> {
  let user: typeof adminUsers.$inferSelect | undefined;
  try {
    [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase().trim()))
      .limit(1);
  } catch (error) {
    console.error("[auth] login failed:", error instanceof Error ? error.message : error);
    return false;
  }
  if (!user || !verifyPassword(password, user.passwordHash)) return false;

  const exp = Date.now() + MAX_AGE * 1000;
  const store = await cookies();
  store.set(SESSION_COOKIE, sign(`${user.email}:${exp}`), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  return verify(store.get(SESSION_COOKIE)?.value);
}
