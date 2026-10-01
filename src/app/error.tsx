"use client";

import { Button } from "@/components/ui/Button";
import styles from "@/styles/pages.module.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner} style={{ textAlign: "center", justifyItems: "center" }}>
        <p className="eyebrow">Something went wrong</p>
        <h1 style={{ fontSize: "var(--text-2xl)" }}>We hit an unexpected issue</h1>
        <p className={styles.prose} style={{ textAlign: "center" }}>
          Please try again. If the problem continues, contact the store.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button type="button" variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Home
          </Button>
        </div>
      </div>
    </section>
  );
}
