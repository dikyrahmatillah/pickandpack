import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  if (!session) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/admin") &&
    !["ADMIN", "EDITOR", "VIEWER"].includes(session.user?.role)
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
