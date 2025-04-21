/* eslint-disable @typescript-eslint/no-use-before-define */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ADORA_AUTH_COOKIE_NAME } from "./modules/commons/utils/constant";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
];

const publicRoutes = [
  "/",
  "/pricing",
  "/contact-us",
  "/about",
  "/terms",
  "/privacy",
  ...authRoutes,
];

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const authCookie = req.cookies.get(ADORA_AUTH_COOKIE_NAME);

  if (!authCookie?.value && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authCookie?.value && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  try {
    const session = await verifySession(req);

    if (!session.valid) {
      return handleInvalidSession(req);
    }

    if (session.userId && !pathname.startsWith("/pricing")) {
      const business = await fetchBusinessData(req);

      if (business) {
        const redirectUrl = handleBusinessLogic(business);
        if (redirectUrl) {
          return NextResponse.redirect(new URL(redirectUrl, req.url));
        }
      }
    }
  } catch (error) {
    return handleInvalidSession(req);
  }

  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

function isPublicRoute(pathname: string): boolean {
  return (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  );
}

async function verifySession(req: NextRequest) {
  const { origin } = req.nextUrl;
  const verifyRequest = await fetch(`${origin}/api/auth/verify-session`, {
    headers: { Cookie: cookies().toString() },
  });

  if (!verifyRequest.ok) {
    throw new Error("Invalid session");
  }

  return verifyRequest.json();
}

function handleInvalidSession(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete(ADORA_AUTH_COOKIE_NAME);
  return response;
}

async function fetchBusinessData(req: NextRequest) {
  const { origin } = req.nextUrl;
  const businessResponse = await fetch(`${origin}/api/auth/business`, {
    headers: { Cookie: req.cookies.toString() },
  });

  if (businessResponse.ok) {
    return businessResponse.json();
  }

  return null;
}

function handleBusinessLogic(business: any): string | null {
  const endDate = business?.subscriptionEndDate
    ? new Date(business.subscriptionEndDate)
    : null;
  const daysLeft = endDate
    ? Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  if (!business.isProfileCompleted) {
    return "/profile";
  }

  if (!endDate || daysLeft <= 0) {
    return "/pricing";
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/reset-password",
    "/profile",
  ],
};
