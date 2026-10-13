import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreInfo } from "@/components/ui/StoreInfo";
import { siteConfig } from "@/config/site";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Visit the Albany Dispensary",
  description:
    "Visit Legacy on Lark, the Albany dispensary at 260 Lark St, NY 12210. Hours, directions, and a message form. Adults 21+ with valid ID.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ImageHero
        eyebrow="Contact"
        title="Visit the Albany dispensary"
        copy="260 Lark Street in Center Square. Questions about the store, menu, or the trip in? Send a note. Adults 21+ only."
        image="/images/about/community.jpg"
        alt="Guests outside Legacy on Lark in Albany"
        compact
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div>
            <SectionHeading
              title="Visit & Reach Out"
              subtitle="Legacy on Lark · 260 Lark St, Albany, NY 12210"
            />
            <div style={{ marginTop: "1.5rem" }}>
              <StoreInfo showActions />
            </div>
            <p style={{ marginTop: "1.25rem" }}>
              <Link className={styles.textLink} href="/areas">
                Neighborhoods and towns
              </Link>
              {" · "}
              <Link className={styles.textLink} href="/pickup">
                Pickup
              </Link>
              {" · "}
              <Link className={styles.textLink} href="/review">
                Leave a Google review
              </Link>
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <MapEmbed tall />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="FAQ"
            subtitle="Answers to the questions guests ask most."
          />
          <FAQAccordion items={[...siteConfig.contactFaqs]} />
        </div>
      </section>
      <JsonLd
        data={faqJsonLd(
          siteConfig.contactFaqs.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        )}
      />
    </>
  );
}
