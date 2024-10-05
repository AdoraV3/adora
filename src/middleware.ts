import { NextResponse } from "next/server";

export function middleware() {
  // const authCookie = request.cookies.get("auth_session");

  // //   if (!authCookie?.value) {
  // //     return NextResponse.redirect(new URL("/login", request.url));
  // //   }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     "/",
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/verify-email",
//     "/reset-password",
//   ],
// };
