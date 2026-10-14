import Link from "next/link";
import { ImageHero } from "@/components/ui/ImageHero";
import { imageAlt } from "@/lib/image-alts";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Accessibility",
  description:
    "Accessibility commitment for the Legacy on Lark website, the Albany dispensary on Lark Street. We aim to meet WCAG 2.2 AA. Contact the shop for help.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <ImageHero
        title="Accessibility"
        copy="We aim for an inclusive experience for every guest."
        image="/images/og-default.jpg"
        alt={imageAlt.storefront}
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
            If you encounter a barrier, please{" "}
            <Link className={styles.textLink} href="/contact">
              contact the Albany shop
            </Link>{" "}
            and describe the page and issue. We will work to improve the experience.
          </p>
        </div>
      </section>
    </>
  );
}
