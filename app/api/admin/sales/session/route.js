import { NextResponse } from "next/server";
import { requireSalesApiSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET() {
  const { session, response } = await requireSalesApiSession();
  if (response) {
    return response;
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        username: session.username,
        email: session.email,
        name: session.name,
        expiresAt: session.expiresAt,
      },
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

