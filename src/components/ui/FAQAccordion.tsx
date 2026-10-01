"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/types/content";
import { cn } from "@/lib/utils";
import styles from "./FAQAccordion.module.css";

export function FAQAccordion({
  items,
  tone = "dark",
}: {
  items: FaqItem[];
  tone?: "dark" | "light";
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn(styles.list, tone === "light" && styles.light)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <div key={item.id} className={styles.item}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.panel}
              >
                <p>{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
