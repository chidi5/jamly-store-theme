import { NextRequest, NextResponse } from "next/server";
import { getCookie, getDomainByCustomDomain, getStore } from "./lib/queries";

async function fetchStoreDetails(storeId: string) {
  try {
    const response = await getStore(storeId);
    return response;
  } catch (error) {
    console.error("Error fetching store details:", error);
    return null;
  }
}

async function getStoreIdFromCustomDomain(
  domain: string
): Promise<string | null> {
  const customDomain = await getDomainByCustomDomain(domain);
  return customDomain ? customDomain.storeId : null;
}

function extractStoreIdFromHost(host: string): string | null {
  // const parts = host.split(".");
  // if (parts.length > 2 && parts[1] === "jamly" && parts[2] === "shop") {
  //   return parts[0];
  // }
  const customSubDomain = host
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    const parts = customSubDomain.split(".");
    if (parts.length >= 2) {
      return parts[0];
    }
  }
  return null;
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host");

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  let storeId: string | null = null;

  if (hostname === `www.${process.env.NEXT_PUBLIC_DOMAIN}`) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}`);
  }

  if (hostname === process.env.NEXT_PUBLIC_DOMAIN && url.pathname !== "/site") {
    console.log("Redirecting to /site");
    const newUrl = new URL("/site", req.url);
    newUrl.search = searchParams;
    return NextResponse.rewrite(newUrl);
  }

  if (hostname) {
    storeId = await getStoreIdFromCustomDomain(hostname);
    if (!storeId) {
      storeId = extractStoreIdFromHost(hostname);
    }
  }

  if (storeId) {
    const storeDetails = await fetchStoreDetails(storeId);
    console.log({ storeDetails });

    if (!storeDetails) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_DOMAIN}`, req.url)
      );
    }

    const response = NextResponse.next();
    response.headers.set("x-store-details", JSON.stringify(storeDetails));
    return response;
  }

  const user = await getCookie("auth-session-token");

  // If the user is authenticated and trying to access the sign-in page, redirect to the home page
  if (user && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    console.log("Redirecting authenticated user to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle rewriting /site to appear as /
  if (url.pathname === "/site") {
    const newUrl = new URL("/", req.url);
    newUrl.search = searchParams;
    return NextResponse.rewrite(newUrl);
  }

  if (!storeId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
