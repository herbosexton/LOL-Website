import { ImageHero } from "@/components/ui/ImageHero";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Legacy on Lark.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <ImageHero
        title="Privacy Policy"
        copy="How we handle information on this website."
        image="/images/og-default.jpg"
        alt=""
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
            use the contact form or reach out using the store contact details published
            on this site.
          </p>
        </div>
      </section>
    </>
  );
}
