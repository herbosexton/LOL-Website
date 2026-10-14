import Link from "next/link";
import { ImageHero } from "@/components/ui/ImageHero";
import { imageAlt } from "@/lib/image-alts";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Legacy on Lark, the Albany dispensary at 260 Lark Street. How this website handles information you choose to send us. Adults 21+.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <ImageHero
        title="Privacy Policy"
        copy="How we handle information on this website."
        image="/images/og-default.jpg"
        alt={imageAlt.storefront}
        compact
      />
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.prose}`}>
          <p>
            Legacy on Lark respects your privacy. This website may collect information
            you voluntarily submit through the contact form (such as name, email,
            phone, and message content) for the purpose of responding to inquiries.
          </p>
          <p>
            If Google Analytics is enabled via environment configuration, aggregate
            usage data may be collected to understand site performance. Do not submit
            sensitive personal or medical information through website forms.
          </p>
          <p>
            This policy may be updated as operations evolve. For privacy questions,
            use the <Link className={styles.textLink} href="/contact">contact form</Link> or
            reach out using the store contact details published on this site.
          </p>
        </div>
      </section>
    </>
  );
}
