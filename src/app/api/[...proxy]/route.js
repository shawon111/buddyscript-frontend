import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

async function handler(req) {
  // Remove "/api" prefix to get the actual backend path
  const path = req.nextUrl.pathname.replace("/api", "");
  const cookieHeader = req.headers.get("cookie") || "";

  const res = await fetch(`${backendUrl}${path}`, {
    method: req.method,
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    body: req.method !== "GET" ? req.body : undefined,
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  const response = NextResponse.json(data, { status: res.status });

  // Forward Set-Cookie from backend to browser
  res.headers.getSetCookie().forEach(cookie => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;