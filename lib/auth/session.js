import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./token.js";

/**
 * Read and verify the current sales session from Next.js server cookies.
 */
export async function getSalesSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/**
 * Server Component / page guard for protected /admin/sales routes.
 */
export async function requireSalesSession() {
  const session = await getSalesSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

/**
 * API route handler guard for protected /api/admin/sales endpoints.
 */
export async function requireSalesApiSession() {
  const session = await getSalesSession();
  if (!session) {
    return {
      session: null,
      response: NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      ),
    };
  }
  return { session, response: null };
}
