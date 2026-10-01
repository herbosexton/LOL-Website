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
  const query = encodeURIComponent(siteConfig.address.formatted);
  const src =
    siteConfig.maps.embed ||
    `https://maps.google.com/maps?q=${query}&z=16&output=embed`;

  return (
    <div className={cn(styles.wrap, tall && styles.tall, className)}>
      <iframe
        className={styles.iframe}
        src={src}
        title={`Map of ${siteConfig.name} at ${siteConfig.address.formatted}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
