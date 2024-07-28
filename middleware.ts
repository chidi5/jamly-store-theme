import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/queries";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host");

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Extract custom subdomain
  let customSubDomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    const parts = customSubDomain.split(".");
    if (parts.length >= 2) {
      customSubDomain = parts[0];
    }
  }

  const user = await getCookie("auth-session-token");

  // If the user is authenticated and trying to access the sign-in page, redirect to the home page
  if (user && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle subdomain routing
  if (customSubDomain) {
    const newUrl = new URL(
      `/${customSubDomain}${pathWithSearchParams}`,
      req.url
    );
    if (newUrl.toString() !== req.url) {
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
