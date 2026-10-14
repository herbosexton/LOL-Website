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
      "Every guest who has visited or ordered. A short honest note is enough. There is no reward for reviewing, and the visit does not need to have been a great one.",
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
        copy="Every guest who has visited or ordered can leave a Google review. It helps the next person in Albany find the shop."
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
              <li>Tap Write a Google review. It opens Google for this shop.</li>
              <li>Confirm the listing is Legacy on Lark at {siteConfig.address.formatted}.</li>
              <li>Write what the visit was actually like, then send it.</li>
            </ol>
            <p>
              We ask every guest who has visited or ordered, including a visit
              that was just okay. There is no discount, gift, or other reward
              for a review.
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
