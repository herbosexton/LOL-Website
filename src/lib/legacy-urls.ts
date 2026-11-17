/**
 * Legacy WordPress URLs still indexed for loldispensary.com.
 *
 * Live App Router pages are never redirected. Old URLs with a real
 * equivalent permanent-redirect (308) to that page. Unrelated theme-demo
 * and WordPress admin URLs are marked gone (410) instead of sent home.
 * Matching ignores a trailing slash and letter case.
 */

export type LegacyDecision =
  | { action: "gone" }
  | { action: "redirect"; pathname: string }
  | { action: "next" };

/** Current pages. A request for one of these must stay on that page. */
const LIVE_EXACT = new Set([
  "/",
  "/shop",
  "/delivery",
  "/contact",
  "/about",
  "/ai-guide",
  "/kulture",
  "/news",
  "/review",
  "/careers",
  "/privacy",
  "/terms",
  "/accessibility",
]);

/** Old path (no trailing slash) to the current equivalent. */
const REDIRECTS: Record<string, string> = {
  "/about-2": "/about",
  "/home": "/",
  "/weed-delivery-near": "/delivery",
  // The old blog listing is now the news section.
  "/blog-2": "/news",
};

const GONE_EXACT = new Set([
  "/interior-design-news",
  "/20-home-design-trends-for-2020",
  "/lax-awards-winners-announced",
]);

function stripTrailingSlashes(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const stripped = pathname.replace(/\/+$/, "");
    return stripped === "" ? "/" : stripped;
  }
  return pathname;
}

function isGonePath(pathname: string): boolean {
  if (GONE_EXACT.has(pathname)) return true;
  if (pathname === "/category" || pathname.startsWith("/category/")) return true;
  if (pathname === "/wp-admin" || pathname.startsWith("/wp-admin/")) return true;
  return false;
}

function redirectTarget(pathname: string): string | null {
  const exact = REDIRECTS[pathname];
  if (exact) return exact;
  // Old events calendar, including /events/month/ and /events/list/.
  if (pathname === "/events" || pathname.startsWith("/events/")) return "/";
  return null;
}

export function decideLegacyUrl(
  pathname: string,
  searchParams: { has(name: string): boolean },
): LegacyDecision {
  const bare = stripTrailingSlashes(pathname);
  const key = bare.toLowerCase();

  // WordPress search URLs (/?s=query). The homepage itself is unchanged.
  if (key === "/" && searchParams.has("s")) {
    return { action: "gone" };
  }

  if (!LIVE_EXACT.has(key) && isGonePath(key)) {
    return { action: "gone" };
  }

  if (!LIVE_EXACT.has(key)) {
    const target = redirectTarget(key);
    if (target) return { action: "redirect", pathname: target };
  }

  if (bare !== pathname) {
    return { action: "redirect", pathname: bare };
  }

  return { action: "next" };
}
