import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/content";
import { formatDate } from "@/lib/utils";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={styles.card}>
      <Link href={`/news/${article.slug}`} className={styles.media}>
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className={styles.meta}>
        <span>{article.category}</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </div>
      <h3 className={styles.title}>
        <Link href={`/news/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <Link href={`/news/${article.slug}`} className={styles.more}>
        Read More
      </Link>
    </article>
  );
}
