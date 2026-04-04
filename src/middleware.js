import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req) {    
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  // Logged-in user trying to visit login/register → send home
  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // No tokens at all → send to login 
  if (!accessToken && !refreshToken && !isPublicPath) { 
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Has refresh token but no access token - allow access to let the page refresh
  if (!accessToken && refreshToken && !isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};