import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article } from "@/types/content";

const newsDirectory = path.join(process.cwd(), "content/news");

/**
 * Content loader abstraction.
 * Swap the filesystem implementation later for Sanity/Contentful/Strapi
 * without changing ArticleCard or page components.
 */
function readArticleFiles() {
  if (!fs.existsSync(newsDirectory)) return [];
  return fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function parseArticle(filename: string): Article {
  const fullPath = path.join(newsDirectory, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = String(data.slug || filename.replace(/\.mdx?$/, ""));

  return {
    title: String(data.title || "Untitled"),
    slug,
    date: String(data.date || "1970-01-01"),
    category: String(data.category || "News"),
    excerpt: String(data.excerpt || ""),
    featuredImage: String(data.featuredImage || "/images/og-default.jpg"),
    featuredImageAlt: String(data.featuredImageAlt || data.title || "Article image"),
    author: String(data.author || "Legacy on Lark"),
    seoDescription: String(data.seoDescription || data.excerpt || ""),
    body: content.trim(),
  };
}

export function getAllArticles(): Article[] {
  return readArticleFiles()
    .map(parseArticle)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}
