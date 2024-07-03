import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "./hooks/use-auth";
import { getCookie } from "./lib/queries";

export default async function middleware(req: NextRequest) {
  //rewrite for domains
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  let hostname = req.headers;

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  //if subdomain exists
  let customSubDomain = hostname
    .get("host")
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

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
