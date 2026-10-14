import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/news/ArticleBody";
import { getAllArticles, getArticleBySlug } from "@/lib/content/news";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return createMetadata({
      title: "Article Not Found",
      description:
        "That article is not published on the Legacy on Lark site. Browse news from our Albany dispensary on Lark Street, or return home. Adults 21+.",
      path: `/news/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: article.title,
    description: article.seoDescription,
    path: `/news/${article.slug}`,
    image: article.featuredImage,
    imageAlt: article.featuredImageAlt,
    openGraphType: "article",
    publishedTime: article.date,
    authors: [article.author],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className={styles.page}>
      <div className={styles.heroMedia}>
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.article}>
        <div className={styles.meta}>
          <span>{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.author}</span>
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.body}>
          <ArticleBody source={article.body} />
        </div>
        <div className={styles.related}>
          <h2>More from Lark Street</h2>
          <nav className={styles.relatedLinks} aria-label="Related pages">
            <Link href="/news">All shop news</Link>
            <Link href="/ai-guide">Product guide</Link>
            <Link href="/shop">Shop the menu</Link>
            <Link href="/contact">Visit 260 Lark Street</Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
