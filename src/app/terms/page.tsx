import { ImageHero } from "@/components/ui/ImageHero";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Legacy on Lark website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <ImageHero
        title="Terms of Use"
        copy="Adults 21+ only. Please consume responsibly."
        image="/images/og-default.jpg"
        alt=""
        compact
      />
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.prose}`}>
          <p>
            By using this website, you confirm you are at least 21 years of age. Cannabis
            products are for adults 21+ in accordance with applicable New York law.
          </p>
          <p>
            Website content is for general informational and educational purposes. It is
            not medical advice and does not guarantee product availability, effects, or
            outcomes. Menu and ordering experiences may be provided by third-party
            platforms.
          </p>
          <p>
            Legacy on Lark may update these terms as needed. Continued use of the site
            constitutes acceptance of the current terms.
          </p>
        </div>
      </section>
    </>
  );
}
