import { Button } from "@/components/ui/Button";
import styles from "@/styles/pages.module.css";

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
            Back Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
