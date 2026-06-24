import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("google-site-verification: google0efcdd8577e942f1.html", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
