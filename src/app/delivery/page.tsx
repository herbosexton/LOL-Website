import Image from "next/image";
import Link from "next/link";
import { AreaLinks } from "@/components/seo/AreaLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { serviceAreas } from "@/config/areas";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Dispensary Delivery in Albany",
  description:
    "Dispensary delivery in Albany from Legacy on Lark, plus Clifton Park, Latham, Schenectady, and Troy. Pickup at 260 Lark St. Adults 21+ with valid ID.",
  path: "/delivery",
});

export default function DeliveryPage() {
  const menuHref = getMenuHref();

  return (
    <>
      <ImageHero
        eyebrow="Delivery"
        title="Dispensary delivery in Albany"
        copy="Order online and get it brought to a supported town, or pick it up on Lark Street. Adults 21+ with valid ID."
        image="/images/delivery/hero.jpg"
        alt="Refined green backdrop introducing Legacy on Lark delivery"
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading
              title="How delivery works"
              subtitle="Browse the menu, check out for delivery if your area is supported, and keep your ID ready."
            />
            <p>
              Availability and checkout details are managed through our ordering
              platform. We do not list fees, minimums, or cutoff times here unless
              they are confirmed.
            </p>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/delivery/hero.jpg"
              alt="Delivery service visual for Legacy on Lark"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Service Areas"
            subtitle="Currently supporting delivery to:"
          />
          <div className={styles.pillList}>
            {siteConfig.deliveryAreas.map((area) => (
              <span key={area} className={styles.pill}>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="How It Works" />
        </div>
        <div className={styles.steps}>
          <article className={styles.step}>
            <h3>Browse Our Menu</h3>
            <p>Explore categories and products through our ordering platform.</p>
          </article>
          <article className={styles.step}>
            <h3>Place Your Order</h3>
            <p>Complete checkout with accurate delivery details for your area.</p>
          </article>
          <article className={styles.step}>
            <h3>Get It Delivered</h3>
            <p>Have valid 21+ photo ID ready when your order arrives.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Categories" />
        </div>
        <div className={styles.grid3}>
          {siteConfig.categories.map((category) => (
            <article key={category.id} className={styles.card}>
              <h3>{category.title}</h3>
              <p>Available through the menu when stocked for delivery.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Delivery Information"
            subtitle="Adults 21+ only. Valid government-issued photo ID required at delivery. Service areas listed above."
          />
          <FAQAccordion items={[...siteConfig.deliveryFaqs]} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Where delivery reaches"
            subtitle="These pages match the published list. Menands is pickup only, and that is called out on its page."
          />
          <p>
            Prefer to visit?{" "}
            <Link className={styles.textLink} href="/pickup">
              In-store pickup
            </Link>{" "}
            is at 260 Lark Street. The full set of neighborhood pages is on{" "}
            <Link className={styles.textLink} href="/areas">
              Areas
            </Link>
            .
          </p>
        </div>
        <AreaLinks areas={serviceAreas.filter((area) => area.deliveryArea)} />
      </section>

      <CTASection
        title="Start your order"
        copy="Open the menu to begin a delivery order in a supported area."
        primary={{
          label: siteConfig.hasMenuUrl ? "Start Your Order" : getMenuLabel("Start Your Order"),
          href: menuHref,
          external: isExternalMenu(),
        }}
        secondary={{ label: "Contact", href: "/contact" }}
      />
      <JsonLd
        data={faqJsonLd(
          siteConfig.deliveryFaqs.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />
    </>
  );
}
