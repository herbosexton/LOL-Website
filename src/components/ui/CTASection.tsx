"use client";

import { Button } from "@/components/ui/Button";
import styles from "./CTASection.module.css";

export function CTASection({
  title,
  copy,
  primary,
  secondary,
}: {
  title: string;
  copy?: string;
  primary: { label: string; href: string; external?: boolean; onClick?: () => void };
  secondary?: { label: string; href: string; external?: boolean; onClick?: () => void };
}) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        {copy ? <p className={styles.copy}>{copy}</p> : null}
        <div className={styles.actions}>
          <Button
            href={primary.href}
            external={primary.external}
            variant="gold"
            onClick={primary.onClick}
          >
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              external={secondary.external}
              variant="secondary"
              onClick={secondary.onClick}
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
