import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decideLegacyUrl } from "./lib/legacy-urls";

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Gone</title>
</head>
<body>
<p>This page has been removed.</p>
</body>
</html>`;

/**
 * Runs on the Node server (`next start` on SiteGround).
 * Returns 308 for old WordPress URLs that have a current page, and 410
 * for theme-demo and admin URLs, including the trailing-slash form Google indexed.
 * Also restores the default no-trailing-slash canonical redirect, because
 * next.config sets skipTrailingSlashRedirect so those indexed URLs are not
 * redirected once before this file can see them.
 */
export function proxy(request: NextRequest) {
  const decision = decideLegacyUrl(
    request.nextUrl.pathname,
    request.nextUrl.searchParams,
  );

  if (decision.action === "gone") {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  if (decision.action === "redirect") {
    // Use the standard URL, not nextUrl.clone(). NextURL keeps the incoming
    // trailingSlash flag and would turn /about-2/ into a redirect to /about/,
    // which then redirects to itself.
    const url = new URL(request.url);
    url.pathname = decision.pathname;
    // Drop the old WordPress search param so a redirect cannot land on /?s=.
    url.searchParams.delete("s");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images/|video/|favicon.ico).*)",
  ],
};
