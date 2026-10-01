import Link from "next/link";
import type { TerpeneItem } from "@/types/content";
import styles from "./TerpeneCard.module.css";

export function TerpeneCard({ item }: { item: TerpeneItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden>
        {item.name.slice(0, 1)}
      </div>
      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.description}>{item.description}</p>
      <Link href={item.href} className={styles.link}>
        Learn more
      </Link>
    </article>
  );
}
