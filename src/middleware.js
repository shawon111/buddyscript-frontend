import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  // Logged-in user trying to visit login/register
  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // No tokens at all 
  if (!accessToken && !refreshToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Has refresh token but no access token
  if (!accessToken && refreshToken && !isPublicPath) {
    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (!refreshRes.ok) throw new Error("Refresh failed");

      // Forward the Set-Cookie headers 
      const response = NextResponse.next();
      refreshRes.headers.getSetCookie().forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
      return response;

    } catch {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};