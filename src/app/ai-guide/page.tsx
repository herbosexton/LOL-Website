import { PreferenceGuide } from "@/components/ai/PreferenceGuide";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerpeneCard } from "@/components/ui/TerpeneCard";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "AI Guide",
  description:
    "Learn cannabis fundamentals and explore Legacy on Lark’s AI-powered matching experience. Educational guidance for adults 21+ in Albany, NY.",
  path: "/ai-guide",
});

export default function AiGuidePage() {
  return (
    <>
      <ImageHero
        eyebrow="AI Guide"
        title="Find What Fits You"
        copy="Technology-forward education inside the Legacy visual world, clear, warm, and never cyberpunk for its own sake."
        image="/images/ai-guide/hero.jpg"
        alt="Soft gold atmosphere introducing the Legacy AI Guide"
      />

      <section className={styles.section} id="fundamentals">
        <div className={styles.inner}>
          <SectionHeading
            title="Cannabis Fundamentals"
            subtitle="Build confidence with product types, potency awareness, and intentional exploration."
          />
          <div className={styles.prose}>
            <p>
              Cannabis products differ in onset, duration, and format. Understanding
              those basics helps you browse with more clarity. Individual experiences
              vary, there is no single right answer for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="How It Works"
            subtitle="Learn, choose preferences, and receive educational suggestions you can take to the menu."
          />
        </div>
        <div className={styles.steps}>
          <article className={styles.step}>
            <h3>Learn the basics</h3>
            <p>Review terpenes, formats, and responsible habits.</p>
          </article>
          <article className={styles.step}>
            <h3>Share preferences</h3>
            <p>Select mood, format, and aroma leanings, no sensitive health data.</p>
          </article>
          <article className={styles.step}>
            <h3>Explore suggestions</h3>
            <p>Use the guide as a starting point, then browse or ask our team.</p>
          </article>
        </div>
      </section>

      <section className={styles.section} id="terpenes">
        <div className={styles.inner}>
          <SectionHeading
            title="Terpenes"
            subtitle="Aromatic character that can help you describe what you enjoy."
          />
        </div>
        <HorizontalScroller label="AI Guide terpenes">
          {siteConfig.terpenes.map((item) => (
            <TerpeneCard key={item.id} item={item} />
          ))}
        </HorizontalScroller>
      </section>

      <section className={styles.section} id="product-types">
        <div className={styles.inner}>
          <SectionHeading title="Product Types" />
        </div>
        <div className={styles.grid3}>
          {["Flower", "Edibles", "Vaporizers", "Tinctures", "Accessories", "Topicals"].map(
            (item) => (
              <article key={item} className={styles.card}>
                <h3>{item}</h3>
                <p>
                  Explore {item.toLowerCase()} on the menu and compare formats based
                  on your preferences and pace.
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className={styles.section} id="preferences">
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading
              title="Preferences / Experiences"
              subtitle="Tell us what you are curious about. We will suggest educational next steps, not medical claims."
            />
            <p>
              This interface is designed so a true AI recommendation backend can be
              connected later without redesigning the experience.
            </p>
          </div>
          <div id="experience">
            <PreferenceGuide />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="FAQ" />
          <FAQAccordion items={[...siteConfig.aiFaqs]} />
        </div>
      </section>
    </>
  );
}
