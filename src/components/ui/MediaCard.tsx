import Image from "next/image";
import styles from "./MediaCard.module.css";

export function MediaCard({
  image,
  alt,
  title,
  children,
}: {
  image: string;
  alt: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 40vw" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {children ? <div className={styles.copy}>{children}</div> : null}
    </article>
  );
}
