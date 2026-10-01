import Image from "next/image";
import Link from "next/link";
import { CategoryMosaic } from "@/components/home/CategoryMosaic";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreInfo } from "@/components/ui/StoreInfo";
import { TerpeneCard } from "@/components/ui/TerpeneCard";
import { VideoHero } from "@/components/ui/VideoHero";
import { siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/content/news";
import { getMenuHref, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3);
  const menuHref = getMenuHref();

  return (
    <>
      <VideoHero />

      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <Reveal variant="left">
            <div className={styles.introMedia}>
              <Image
                src="/images/about/welcome.jpg"
                alt="Budtender and guest exploring cannabis flower together at Legacy on Lark"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </div>
          </Reveal>
          <Reveal variant="right" delay={2}>
            <div className={styles.introCopy}>
              <SectionHeading
                eyebrow="Welcome"
                title="More than a dispensary"
                subtitle="Cannabis, culture, community, education, and human connection, woven into one inviting house on Lark."
              />
              <p>
                Beautiful. Warm. Confident. The feeling of walking into the cool,
                successful aunt&apos;s home, premium without pretension.
              </p>
              <Button href="/about" variant="outline">
                Our story
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal variant="scale">
        <CategoryMosaic />
      </Reveal>

      <section className={styles.ai}>
        <Reveal>
          <div className={styles.aiInner}>
            <SectionHeading
              align="center"
              eyebrow="AI Guide"
              title="Find what fits you"
              subtitle="Learn the fundamentals, from terpenes to effects, then explore a calm, guided matching experience."
            />
            <Button href="/ai-guide" variant="primary">
              Explore AI Guide
            </Button>
          </div>
        </Reveal>
      </section>

      <section className={styles.terpenes} aria-labelledby="terpenes-heading">
        <Reveal>
          <div className={styles.terpenesHeader}>
            <SectionHeading
              align="center"
              eyebrow="Terpenes"
              title="Aroma with intention"
              subtitle="Swipe through the notes that help you describe what you love."
            />
            <h2 id="terpenes-heading" className="sr-only">
              Terpene explorer
            </h2>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <HorizontalScroller label="Terpene cards">
            {siteConfig.terpenes.map((item) => (
              <TerpeneCard key={item.id} item={item} />
            ))}
          </HorizontalScroller>
        </Reveal>
      </section>

      <Reveal variant="scale">
        <section className={styles.kulture}>
          <div className={styles.kultureMedia} data-parallax="0.12">
            <Image
              src="/images/kulture/hero.jpg"
              alt="Cinematic dark atmosphere representing Kulture at Legacy on Lark"
              fill
              sizes="100vw"
            />
          </div>
          <div className={styles.kultureOverlay} aria-hidden />
          <div className={styles.kultureContent}>
            <p className="eyebrow" style={{ color: "var(--lol-gold)" }}>
              Editorial
            </p>
            <h2 className={styles.kultureTitle}>Kulture</h2>
            <p>
              History, creativity, ownership, and joy, told with quiet confidence.
            </p>
            <Button href="/kulture" variant="gold">
              Explore Kulture
            </Button>
          </div>
        </section>
      </Reveal>

      <section className={styles.education}>
        <Reveal>
          <div className={styles.educationHeader}>
            <SectionHeading
              align="center"
              eyebrow="Learn"
              title="Clarity before choice"
              subtitle="Simple guidance for curious adults exploring cannabis in Albany."
            />
          </div>
        </Reveal>
        <div className={styles.educationGrid}>
          {siteConfig.educationTopics.map((topic, index) => (
            <Reveal key={topic.id} delay={(Math.min(index, 4) || 0) as 0 | 1 | 2 | 3 | 4}>
              <Link href={topic.href} className={styles.topic}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.news}>
        <Reveal>
          <div className={styles.newsHeader}>
            <SectionHeading
              eyebrow="Journal"
              title="Fresh from Legacy"
              subtitle="Education-first stories worth a slow read."
            />
            <Button href="/news" variant="outline">
              View all
            </Button>
          </div>
        </Reveal>
        {articles.length > 0 ? (
          <div className={styles.newsGrid}>
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={(Math.min(index + 1, 4) as 1 | 2 | 3 | 4)}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className={styles.emptyNews}>Articles will appear here as they are published.</p>
        )}
      </section>

      <section className={styles.visit}>
        <div className={styles.visitInner}>
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Visit"
              title="Come see us on Lark"
              subtitle="A premium cannabis dispensary in the heart of Albany, ready when you are."
            />
          </Reveal>
          <Reveal variant="right" delay={2}>
            <StoreInfo />
          </Reveal>
        </div>
        <Reveal delay={2}>
          <div className={styles.visitMap}>
            <MapEmbed tall />
          </div>
        </Reveal>
      </section>

      <Reveal variant="scale">
        <CTASection
          title="Come as you are. Leave elevated."
          copy="Browse the menu or stop by 260 Lark Street."
          primary={{
            label: "Shop",
            href: menuHref,
            external: isExternalMenu(),
          }}
          secondary={{ label: "Visit us", href: "/contact" }}
        />
      </Reveal>
    </>
  );
}
