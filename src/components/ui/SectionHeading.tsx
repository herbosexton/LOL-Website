import { cn } from "@/lib/utils";
import styles from "./SectionHeading.module.css";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        styles.wrap,
        align === "center" && styles.center,
        tone === "light" && styles.light,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag className={styles.title}>{title}</Tag>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
