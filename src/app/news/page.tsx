import { ArticleCard } from "@/components/ui/ArticleCard";
import { ImageHero } from "@/components/ui/ImageHero";
import { getAllArticles } from "@/lib/content/news";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "News",
  description:
    "Education and community stories from Legacy on Lark, Albany’s premium cannabis dispensary.",
  path: "/news",
});

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <ImageHero
        eyebrow="News"
        title="Stories Worth Sharing"
        copy="Educational articles and community notes—automatically listed from our content library."
        image="/images/blog/cannabis-fundamentals.jpg"
        alt="Editorial imagery introducing Legacy on Lark news"
        compact
      />
      {articles.length > 0 ? (
        <div className={styles.list}>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No articles published yet.</p>
      )}
    </div>
  );
}
