import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/", "/forgotPassword"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  //check url and token
  //redirect the user depending upon that
  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/resetPassword"))
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
