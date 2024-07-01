import { NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";

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

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (customSubDomain) {
    // Check for the authToken in the main domain
    const authToken = getCookie("auth-session", {
      req,
      domain: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    });

    // If authToken exists, set it in the subdomain
    if (authToken) {
      setCookie("auth-session", authToken, {
        req,
        res: NextResponse.next(),
        domain: `${customSubDomain}.${process.env.NEXT_PUBLIC_DOMAIN}`,
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 2,
      });
    }

    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
