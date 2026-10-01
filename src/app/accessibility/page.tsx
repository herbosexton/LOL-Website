import { ImageHero } from "@/components/ui/ImageHero";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Accessibility",
  description:
    "Accessibility commitment for the Legacy on Lark website, targeting WCAG 2.2 AA.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <ImageHero
        title="Accessibility"
        copy="We aim for an inclusive experience for every guest."
        image="/images/og-default.jpg"
        alt=""
        compact
      />
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.prose}`}>
          <p>
            Legacy on Lark is committed to digital accessibility. This website is designed
            with semantic HTML, keyboard support, visible focus states, accessible forms,
            and respect for reduced-motion preferences, with a target of WCAG 2.2 AA.
          </p>
          <p>
            If you encounter a barrier, please contact us and describe the page and issue.
            We will work to improve the experience.
          </p>
        </div>
      </section>
    </>
  );
}
