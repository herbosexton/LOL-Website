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
  title: "Albany Cannabis Dispensary on Lark Street",
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
                title="Your spot on Lark"
                subtitle="Adult-use cannabis in Center Square. Good product, clear answers, and a crew that treats you like a neighbor."
              />
              <p>
                Come in for flower, edibles, vapes, drinks, and more. Stay for
                straight talk and a shop that feels like home, not a hard sell.
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
              eyebrow="Product Guide"
              title="Not sure what to get?"
              subtitle="Quick primers on product types and terpenes, plus a short quiz if you want a starting point."
            />
            <Button href="/ai-guide" variant="primary">
              Open the guide
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
              title="Smell first"
              subtitle="These aroma notes show up a lot on our shelves. Swipe through a few."
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
              Local culture, history, and creativity from Albany&apos;s point of view.
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
              title="Ask better questions"
              subtitle="Short reads for adults shopping cannabis in Albany."
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
              title="From the shop"
              subtitle="Practical notes from Legacy on Lark."
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
              title="260 Lark Street"
              subtitle="Center Square, Albany. Pickup in-store, delivery across the Capital Region."
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
          title="Ready when you are"
          copy="Browse the live menu, or come see us at 260 Lark Street."
          primary={{
            label: "Shop Now",
            href: menuHref,
            external: isExternalMenu(),
          }}
          secondary={{ label: "Get directions", href: "/contact" }}
        />
      </Reveal>
    </>
  );
}
