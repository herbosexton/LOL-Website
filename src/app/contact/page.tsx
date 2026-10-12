import { ContactForm } from "@/components/contact/ContactForm";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreInfo } from "@/components/ui/StoreInfo";
import { siteConfig } from "@/config/site";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Contact & Directions",
  description:
    "Visit Legacy on Lark at 260 Lark St, Albany, NY 12210. Get hours, directions, and send a message. Adults 21+ with valid ID.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ImageHero
        eyebrow="Contact"
        title="Come through on Lark"
        copy="Questions about the store, menu, or visit? Send a note. Adults 21+ only."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(
              siteConfig.contactFaqs.map((item) => ({
                question: item.question,
                answer: item.answer,
              })),
            ),
          ),
        }}
      />
    </>
  );
}
