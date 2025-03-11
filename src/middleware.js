import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { jwtVerify } from "jose";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;

  // admin
  const token = request.cookies.get("token")?.value;

  // user
  const verify = request.cookies.get("otp")?.value;
  const password = request.cookies.get("password")?.value;
  const profile = request.cookies.get("profile")?.value;

  if (!verify && path === "/user/otpverify") {
    return NextResponse.redirect(new URL("/user/registration", request.url));
  }

  if (!password && path === "/user/passwordset") {
    return NextResponse.redirect(new URL("/user/registration", request.url));
  }

  if (!profile && path === "/user/landing") {
    return NextResponse.redirect(new URL("/user/registration", request.url));
  }

  if (profile && path === "/user/registration") {
    return NextResponse.redirect(new URL("/user/landing", request.url));
  }

  // admin 
  if (!token && path === "/components/fill-form") {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!token && path === "/dakhila-print") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/office", request.url));
  }

  if (token && path === '/office') {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
};

export const config = {
  matcher: [
    "/components/fill-form",
    "/dakhila-print",
    "/dashboard/:path*",
    "/office",
    "/user/otpverify",
    "/user/passwordset",
    "/user/landing",
    "/user/registration"
  ],
  runtime: "nodejs"
};