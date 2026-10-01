import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "About",
  description:
    "Legacy on Lark is built on family, trust, and purpose—a premium Albany cannabis dispensary rooted in community and intentional growth.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <ImageHero
        eyebrow="About"
        title="Built on Family, Trust & Purpose"
        copy="Legacy on Lark is a premium cannabis experience shaped by friendship, discipline, and generational intention in Albany, NY."
        image="/images/about/store-interior.jpg"
        alt="Warm green-toned atmosphere representing the Legacy on Lark story"
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading title="Our Story" />
            <p>
              Legacy on Lark is built on family, trust, and purpose. Niaja and
              Chianti—a married couple—are central leaders of the vision. Herbert,
              their best friend, helped build that vision with them. Matthew
              Robinson later became an investor and landlord, and an important
              source of guidance.
            </p>
            <p>
              The brand carries themes of friendship, discipline, growth,
              community, education, intentionality, and generational legacy—without
              inventing biographies beyond what we know to be true.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/about/community.jpg"
              alt="Community-minded atmosphere tied to Legacy on Lark"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Mission" subtitle={siteConfig.mission} />
          <SectionHeading title="Vision" subtitle={siteConfig.vision} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Values"
            subtitle="The principles that keep Legacy grounded and growing."
          />
        </div>
        <div className={styles.grid3}>
          {siteConfig.values.map((value) => (
            <article key={value.title} className={styles.card}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="People Behind Legacy"
            subtitle="Leaders and partners who shaped the house on Lark."
          />
        </div>
        <div className={styles.grid3}>
          {siteConfig.people.map((person) => (
            <article key={person.name} className={styles.card}>
              <h3>{person.name}</h3>
              <p>
                <strong>{person.role}</strong>
              </p>
              <p>{person.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading title="Community" />
            <p>
              We are rooted in Albany—on Lark Street, among neighbors, culture
              makers, and curious guests. Hospitality here means respect, warmth,
              and a seat at the table.
            </p>
          </div>
          <div className={styles.prose}>
            <SectionHeading title="Technology + Education" />
            <p>
              From clear product education to an AI-guided matching experience,
              technology at Legacy supports human connection instead of replacing
              it.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Come experience Legacy"
        copy="Visit 260 Lark St or explore the menu when you are ready."
        primary={{ label: "Visit Us", href: "/contact" }}
        secondary={{ label: "Shop", href: "/shop" }}
      />
    </>
  );
}
