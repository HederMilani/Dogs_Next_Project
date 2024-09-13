import { NextRequest, NextResponse } from "next/server";
import verifyToken from "@/functions/verify-token";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // const authenticated = !!token;
  const authenticated = await verifyToken(token);

  if (!authenticated && request.nextUrl.pathname.startsWith("/conta")) {
    return NextResponse.redirect(new URL("/login", request.nextUrl).toString());
  }
  if (authenticated && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/conta", request.nextUrl).toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/conta/:path*", "/login/:path*"],
};
