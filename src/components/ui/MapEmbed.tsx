import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import styles from "./MapEmbed.module.css";

export function MapEmbed({
  className,
  tall = false,
}: {
  className?: string;
  tall?: boolean;
}) {
  return (
    <div className={cn(styles.wrap, tall && styles.tall, className)}>
      <iframe
        className={styles.iframe}
        src={siteConfig.maps.embed}
        title={`Map of ${siteConfig.name} at ${siteConfig.address.formatted}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
