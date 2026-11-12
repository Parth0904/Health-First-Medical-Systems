import { NextResponse } from "next/server";
import {
  getClearedSessionCookieOptions,
  revokeSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/token";

export const runtime = "nodejs";

export async function POST(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    revokeSessionToken(token);
  }

  const response = NextResponse.json(
    { authenticated: false },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );

  response.cookies.set(getClearedSessionCookieOptions(request));

  return response;
}

