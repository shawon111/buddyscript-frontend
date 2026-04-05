import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  // Has both tokens 
  if (accessToken && refreshToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Public path 
  if (isPublicPath) return NextResponse.next();

  // No tokens 
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};