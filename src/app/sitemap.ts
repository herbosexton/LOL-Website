import type { MetadataRoute } from "next";
import { serviceAreas } from "@/config/areas";
import { getAllArticles } from "@/lib/content/news";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/areas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pickup", priority: 0.8, changeFrequency: "monthly" },
  { path: "/delivery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/deals", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ai-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kulture", priority: 0.5, changeFrequency: "monthly" },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/review", priority: 0.4, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const areaEntries = serviceAreas.map((area) => ({
    url: absoluteUrl(`/areas/${area.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleEntries = getAllArticles().map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...areaEntries, ...articleEntries];
}
