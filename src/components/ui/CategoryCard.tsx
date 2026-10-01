import Image from "next/image";
import Link from "next/link";
import type { CategoryItem } from "@/types/content";
import { cn } from "@/lib/utils";
import styles from "./CategoryCard.module.css";

export function CategoryCard({
  item,
  priority = false,
  className,
}: {
  item: CategoryItem;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      className={cn(styles.card, className)}
      aria-label={`${item.title}: ${item.cta}`}
    >
      <div
        className={cn(
          styles.media,
          item.mediaMode === "contain" ? styles.contain : styles.cover,
        )}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{ objectPosition: item.objectPosition || "50% 50%" }}
        />
      </div>
      {item.overlay !== false ? <div className={styles.overlay} aria-hidden /> : null}
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <span className={styles.cta}>{item.cta}</span>
      </div>
    </Link>
  );
}
