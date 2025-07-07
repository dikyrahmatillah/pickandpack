import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that require specific roles
const adminRoutes = ["/admin", "/admin/products", "/admin/users"];
const editorRoutes = ["/dashboard/create-journal", "/dashboard/edit-journal"];
const authRoutes = ["/dashboard", "/profile"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Check if the path is in any protected route list
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isEditorRoute = editorRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute =
    authRoutes.some((route) => pathname.startsWith(route)) ||
    isAdminRoute ||
    isEditorRoute;

  // Redirect to login if trying to access a protected route and not logged in
  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check role permissions
  if (token) {
    const userRole = token.role as string;

    // Admins can access everything
    if (userRole === "admin") return NextResponse.next();

    // Editors can access editor routes and auth routes but not admin routes
    if (userRole === "editor") {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // Viewers can only access general auth routes
    if (userRole === "viewer") {
      if (isAdminRoute || isEditorRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Configure matcher for protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
