import { NextRequest, NextResponse } from "next/server";

// Exclude public routes
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
  "/pricing",
  "/contact-us",
  "/about",
  "/terms",
  "/privacy",
];

const authRoutes = ["/login", "/register"];
const PUBLIC_FILE = /\.(.*)$/;
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  const authCookie = req.cookies.get("adora-auth-cookie");
  if (!authCookie?.value && !publicRoutes.includes(pathname)) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authRoutes.includes(pathname) && authCookie?.value) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/",
    // "/login",
    // "/register",
    // "/forgot-password",
    // "/verify-email",
    // "/reset-password",
    // "/profile",
  ],
};
