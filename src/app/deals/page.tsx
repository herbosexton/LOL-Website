import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { createMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

const title = "Albany Dispensary Deals";
const description =
  "Albany dispensary deals at Legacy on Lark live on the menu. No prices are listed here unless a deal is confirmed. Pickup at 260 Lark St, adults 21+.";

const faqs = [
  {
    id: "where",
    question: "Where are Albany dispensary deals listed?",
    answer:
      "On the live menu. This page shows a deal only after it is confirmed. If nothing is listed below, check the menu for what is offered today.",
  },
  {
    id: "prices",
    question: "Do you publish prices on this page?",
    answer:
      "No. Prices change with inventory. The menu is the current list. We do not invent discounts here.",
  },
];

export const metadata = createMetadata({
  title,
  description,
  path: "/deals",
});

export default function DealsPage() {
  const menuHref = getMenuHref();
  const deals = siteConfig.featuredDeals;

  return (
    <>
      <ImageHero
        eyebrow="Deals"
        title="Albany dispensary deals"
        copy="Specials change with the live menu. This page does not list a price or a discount unless it is confirmed below."
        image="/images/lifestyle/brand-flatlay.jpg"
        alt="Product flat lay for the Legacy on Lark menu"
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title={deals.length > 0 ? "Confirmed specials" : "See the menu for today's offers"}
            subtitle="Flower, pre-rolls, edibles, vapes, drinks, tinctures, and chocolate are on the menu when stocked."
          />
          {deals.length > 0 ? (
            <div className={styles.grid3}>
              {deals.map((deal) => (
                <article key={deal.title} className={styles.card}>
                  <h3>{deal.title}</h3>
                  <p>{deal.detail}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.prose}>
              <p>
                Nothing is pinned here right now. Open the live menu to see
                what Legacy on Lark is actually offering, then choose pickup at
                260 Lark Street or delivery in a supported town.
              </p>
              <p>
                <Link className={styles.textLink} href="/pickup">
                  Pickup
                </Link>
                {" · "}
                <Link className={styles.textLink} href="/delivery">
                  Delivery
                </Link>
                {" · "}
                <Link className={styles.textLink} href="/areas">
                  Neighborhoods
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Deals questions" />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection
        title="Check the live menu"
        copy="That is the list that stays current. Adults 21+ with valid ID."
        primary={{
          label: siteConfig.hasMenuUrl ? "Open the menu" : getMenuLabel("Open the menu"),
          href: menuHref,
          external: isExternalMenu(),
        }}
        secondary={{ label: "Visit the shop", href: "/contact" }}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={webPageJsonLd({ name: title, description, path: "/deals" })} />
    </>
  );
}
