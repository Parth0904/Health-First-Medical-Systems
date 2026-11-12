import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/token";

// Only static PWA metadata/icon files needed by browsers for install/update are exempt.
const PUBLIC_SALES_PWA_ASSETS = new Set([
  "/admin/sales/manifest.webmanifest",
  "/admin/sales/sw.js",
  "/admin/sales/icon-192.png",
  "/admin/sales/icon-512.png",
  "/admin/sales/icon-maskable-512.png",
  "/admin/sales/apple-touch-icon.png",
]);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_SALES_PWA_ASSETS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    if (pathname.startsWith("/api/admin/sales")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Keep authenticated Sales Assistant sessions inside the /admin/sales/ PWA scope.
  if (pathname === "/admin/sales") {
    const scopedUrl = new URL("/admin/sales/", request.url);
    scopedUrl.search = request.nextUrl.search;
    return NextResponse.redirect(scopedUrl);
  }

  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  response.headers.set("Pragma", "no-cache");
  return response;
}

export const config = {
  matcher: ["/admin/sales/:path*", "/api/admin/sales/:path*"],
};
