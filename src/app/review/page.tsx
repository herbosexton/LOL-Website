import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { createMetadata, faqJsonLd, googleReviewHref, webPageJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

const title = "Leave a Google Review";
const description =
  "Leave a Google review for Legacy on Lark, the Albany dispensary at 260 Lark St. This page is the link to print as a counter QR code. Adults 21+.";

const faqs = [
  {
    id: "where",
    question: "Where do I leave a review?",
    answer:
      "On Google, for the Legacy on Lark listing at 260 Lark Street, Albany, NY 12210. This website does not host reviews.",
  },
  {
    id: "who",
    question: "Who should review?",
    answer:
      "Anyone who has visited or ordered. Honest reviews help, including short ones. You do not need to write a long note.",
  },
];

export const metadata = createMetadata({
  title,
  description,
  path: "/review",
});

export default function ReviewPage() {
  const reviewHref = googleReviewHref();
  const pageUrl = absoluteUrl("/review");

  return (
    <>
      <ImageHero
        eyebrow="Reviews"
        title="Leave a Google review"
        copy="If you have been to Legacy on Lark, a Google review helps the next person in Albany find the shop."
        image="/images/about/welcome.jpg"
        alt="Guest and budtender at Legacy on Lark"
        compact
      />

      <section className={styles.section}>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <SectionHeading
              title="It takes a minute"
              subtitle="Check that the listing says 260 Lark Street before you post."
            />
            <ol className={styles.ordered}>
              <li>Open Google with the button on this page.</li>
              <li>
                Find Legacy on Lark at {siteConfig.address.formatted}.
              </li>
              <li>Choose Write a review, then send it.</li>
            </ol>
            <p>
              We ask guests who had any kind of visit, not only the glowing
              ones. A few honest sentences are enough.
            </p>
            <div className={styles.actions}>
              {reviewHref ? (
                <Button href={reviewHref} external variant="primary">
                  Write a Google review
                </Button>
              ) : (
                <Button href={siteConfig.maps.google} external variant="primary">
                  Open Google Maps
                </Button>
              )}
              {reviewHref ? (
                <Button href={siteConfig.maps.google} external variant="outline">
                  Open Google Maps
                </Button>
              ) : null}
            </div>
          </div>
          <div className={styles.prose}>
            <SectionHeading
              title="Counter QR"
              subtitle="Point a QR code at this page, then put it where guests can scan it."
            />
            <p className={styles.url}>{pageUrl}</p>
            <p>
              The code should open this page. Guests tap through to Google from
              here, so the review lands on the Business Profile and not on the
              website.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading title="Review questions" />
          <FAQAccordion items={faqs} />
        </div>
      </section>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={webPageJsonLd({ name: title, description, path: "/review" })} />
    </>
  );
}
