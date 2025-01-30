import { NextRequest, NextResponse } from "next/server";

// Exclude public routes
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
  "/pricing",
  "/contact-us",
  "/about-us",
  "/terms",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // if (publicRoutes.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // const authCookie = req.cookies.get("adora-auth-cookie");
  // if (!authCookie?.value) {
  //   // Redirect unauthenticated users to login
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
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
