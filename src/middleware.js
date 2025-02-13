import { NextResponse } from "next/server";

export const middleware = (request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  // console.log('Your token is : ', token)

  if (!token && path == "/components/fill-form") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path == "/dakhila-print") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/office", request.url));
  }
  
  if (token && path == '/office') {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
};

export const config = {
  matcher: [
    "/components/fill-form",
    "/dakhila-print",
    "/dashboard/:path*",
    "/office"
  ],
};
