import styles from "./CultureCard.module.css";

export function CultureCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.copy}>{children}</div>
    </article>
  );
}
