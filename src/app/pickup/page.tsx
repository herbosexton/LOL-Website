import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreInfo } from "@/components/ui/StoreInfo";
import { siteConfig } from "@/config/site";
import { getMenuHref, isExternalMenu } from "@/lib/menu";
import { createMetadata, faqJsonLd, webPageJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

const title = "Albany Dispensary Pickup";
const description =
  "In-store pickup at Legacy on Lark, 260 Lark St, Albany, NY 12210. Order on the menu, then collect it in Center Square. Adults 21+ with valid ID.";

const faqs = [
  {
    id: "pickup",
    question: "Do you offer in-store pickup?",
    answer:
      "Yes. In-store pickup is available for online orders at 260 Lark Street, Albany, NY 12210.",
  },
  {
    id: "id",
    question: "What do I need to bring for pickup?",
    answer:
      "A valid government-issued photo ID. You must be 21 or older. Expired IDs are not accepted.",
  },
  {
    id: "delivery",
    question: "What if I want delivery instead?",
    answer:
      "Delivery is available for Albany, Clifton Park, Latham, Schenectady, and Troy when checkout accepts the address. Other nearby places are pickup at the shop.",
  },
];

export const metadata = createMetadata({
  title,
  description,
  path: "/pickup",
});

export default function PickupPage() {
  const menuHref = getMenuHref();

  return (
    <>
      <ImageHero
        eyebrow="Pickup"
        title="Albany dispensary pickup"
        copy="Order on the menu, then collect it at 260 Lark Street in Center Square. Adults 21+ with valid ID."
        image="/images/about/store-interior.jpg"
        alt="Interior of Legacy on Lark, where pickup orders are collected"
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading
              title="How pickup works"
              subtitle="The menu opens ready for pickup. Hours below are the same hours posted across the site."
            />
            <p>
              In-store pickup is available for online orders. Browse the menu,
              place the order, and come to {siteConfig.address.formatted}. The
              shop is in Center Square, one block from Washington Park and a
              short walk from downtown.
            </p>
            <p>
              Need it brought to you instead?{" "}
              <Link className={styles.textLink} href="/delivery">
                Delivery
              </Link>{" "}
              covers the published towns. If you are coming from Arbor Hill,
              downtown, the Mansion neighborhood, Menands, or farther out, the{" "}
              <Link className={styles.textLink} href="/areas">
                area pages
              </Link>{" "}
              say which trip is pickup and which can be delivery.
            </p>
          </div>
          <StoreInfo />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="At the counter" />
        </div>
        <div className={styles.steps}>
          <article className={styles.step}>
            <h3>Order on the menu</h3>
            <p>Choose pickup and the products you want. Stock changes, so the menu is the current list.</p>
          </article>
          <article className={styles.step}>
            <h3>Bring your ID</h3>
            <p>Government-issued photo ID, 21 or older. We cannot accept an expired ID.</p>
          </article>
          <article className={styles.step}>
            <h3>Pick it up on Lark</h3>
            <p>260 Lark Street, Albany, NY 12210, during the hours listed on this page.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Pickup questions" />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection
        title="Start a pickup order"
        copy="Then come see us on Lark Street."
        primary={{
          label: "Order for pickup",
          href: menuHref,
          external: isExternalMenu(),
        }}
        secondary={{ label: "Get directions", href: "/contact" }}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={webPageJsonLd({ name: title, description, path: "/pickup" })} />
    </>
  );
}
