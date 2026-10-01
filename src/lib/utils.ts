export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

export function externalRel(href: string) {
  if (href.startsWith("http")) {
    return { target: "_blank" as const, rel: "noopener noreferrer" };
  }
  return {};
}
