import Link from "next/link";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllArticles } from "@/lib/content/news";
import { imageAlt } from "@/lib/image-alts";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "News from Lark Street",
  description:
    "Education and community stories from Legacy on Lark, the adult-use dispensary at 260 Lark Street in Center Square, Albany, NY. For adults 21+.",
  path: "/news",
});

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <ImageHero
        eyebrow="News"
        title="Stories Worth Sharing"
        copy="Educational articles and community notes, automatically listed from our content library."
        image="/images/blog/cannabis-fundamentals.jpg"
        alt={imageAlt.budOverJarOnWood}
        compact
      />
      <div className={styles.listHeader}>
        <SectionHeading
          title="From the shop"
          subtitle="Notes on cannabis basics, terpenes, and responsible use for adults in Albany."
        />
        <p>
          New to the menu? Start with the{" "}
          <Link className="text-link" href="/ai-guide">
            product guide
          </Link>
          , or{" "}
          <Link className="text-link" href="/contact">
            visit 260 Lark Street
          </Link>
          .
        </p>
      </div>
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
