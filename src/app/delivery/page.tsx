import Image from "next/image";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Delivery",
  description:
    "Cannabis delivery from Legacy on Lark to Albany, Clifton Park, Latham, Schenectady, and Troy, NY.",
  path: "/delivery",
});

export default function DeliveryPage() {
  const menuHref = getMenuHref();

  return (
    <>
      <ImageHero
        eyebrow="Delivery"
        title="Elevated Delivery Across the Capital Region"
        copy="Browse the menu, place your order, and get it delivered in supported areas, adults 21+ with valid ID."
        image="/images/delivery/hero.jpg"
        alt="Refined green backdrop introducing Legacy on Lark delivery"
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading
              title="Delivery Overview"
              subtitle="Legacy on Lark brings a premium dispensary experience to your door in select New York communities."
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
    </>
  );
}
