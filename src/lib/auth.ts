import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback_dev_secret_change_me'
);

export interface SessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/** Sign a session JWT (valid 7 days). */
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

/** Set the session cookie on the response. */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Read + verify the current session. Returns null if not logged in. */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
