import styles from "./Marquee.module.css";

export function Marquee({ items }: { items: string[] }) {
  const sequence = [...items, ...items];
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.track}>
        {sequence.map((item, index) => (
          <div key={`${item}-${index}`} className={styles.item}>
            <span aria-hidden>•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
