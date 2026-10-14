import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import styles from "@/styles/pages.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page is not on the Legacy on Lark website. Visit the Albany dispensary at 260 Lark Street, or return to the home page. Adults 21+ only.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.inner} style={{ textAlign: "center", justifyItems: "center" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "var(--text-3xl)" }}>Page not found</h1>
        <p className={styles.prose} style={{ textAlign: "center" }}>
          The page you are looking for has moved or no longer exists.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button href="/" variant="primary">
            Back to the Lark Street home
          </Button>
          <Button href="/shop" variant="outline">
            Shop the menu
          </Button>
          <Button href="/contact" variant="outline">
            Visit the shop
          </Button>
        </div>
      </div>
    </section>
  );
}
