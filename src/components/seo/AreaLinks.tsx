import Link from "next/link";
import { serviceAreas, type ServiceArea } from "@/config/areas";
import styles from "./AreaLinks.module.css";

export function AreaLinks({ areas = serviceAreas }: { areas?: ServiceArea[] }) {
  return (
    <ul className={styles.grid}>
      {areas.map((area) => (
        <li key={area.slug}>
          <Link href={`/areas/${area.slug}`} className={styles.card}>
            <span className={styles.direction}>{area.directionLabel}</span>
            <span className={styles.name}>{area.name}</span>
            <span className={styles.summary}>{area.card}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
