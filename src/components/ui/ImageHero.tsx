import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./ImageHero.module.css";

export function ImageHero({
  title,
  eyebrow,
  copy,
  image,
  alt,
  compact = false,
}: {
  title: string;
  eyebrow?: string;
  copy?: string;
  image: string;
  alt: string;
  compact?: boolean;
}) {
  return (
    <header className={cn(styles.hero, compact && styles.compact)}>
      <div className={styles.media}>
        <Image src={image} alt={alt} fill priority sizes="100vw" />
      </div>
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        {copy ? <p className={styles.copy}>{copy}</p> : null}
      </div>
    </header>
  );
}
