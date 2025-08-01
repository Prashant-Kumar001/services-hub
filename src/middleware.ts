import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!$|_next|static|favicon.ico|.*\\..*).*)"], // Protect everything except "/"
};
