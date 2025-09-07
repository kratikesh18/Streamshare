import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signin",
    "/signup",
    "/",
    "/forgotPassword",
    "/mymemberships",
  ],
};

const authRoutes = ["/signin", "/signup", "/resetPassword"];
const protectedRoutes = ["/dashboard", "/mymemberships"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token && authRoutes.some((r) => url.pathname.startsWith(r))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!token && protectedRoutes.some((r) => url.pathname.startsWith(r))) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
