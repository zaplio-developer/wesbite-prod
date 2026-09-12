import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "zaplio_admin_session";

function getPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return password;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * The session token is an HMAC of a fixed string keyed by ADMIN_PASSWORD: it
 * can only be produced by someone who knows the password, so it doubles as a
 * session credential without needing a session store for a single shared
 * admin credential.
 */
export function createSessionToken(): string {
  return createHmac("sha256", getPassword()).update("zaplio-admin-session").digest("hex");
}

export function verifyPassword(password: string): boolean {
  return safeEqual(password, getPassword());
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return safeEqual(token, createSessionToken());
}
