import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content/news";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes = [
  "/",
  "/about",
  "/ai-guide",
  "/kulture",
  "/news",
  "/contact",
  "/shop",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
  }));

  const articleEntries = getAllArticles().map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: new Date(article.date),
  }));

  return [...staticEntries, ...articleEntries];
}
