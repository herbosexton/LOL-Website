"use client";

import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./StoreInfo.module.css";

export function StoreInfo({
  tone = "dark",
  showActions = true,
}: {
  tone?: "dark" | "light";
  showActions?: boolean;
}) {
  const menuHref = getMenuHref();
  const menuExternal = isExternalMenu();

  return (
    <div className={cn(styles.wrap, tone === "light" && styles.light)}>
      <address className={styles.address}>
        {siteConfig.address.street}
        <br />
        {siteConfig.address.city}, {siteConfig.address.state}{" "}
        {siteConfig.address.postalCode}
      </address>

      <div className={styles.meta}>
        {siteConfig.hours.map((item) => (
          <p key={item.label}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
        {siteConfig.phone ? (
          <p>
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              onClick={() => trackEvent("phone_click")}
            >
              {siteConfig.phone}
            </a>
          </p>
        ) : null}
        {siteConfig.email ? (
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        ) : null}
      </div>

      {showActions ? (
        <div className={styles.actions}>
          <Button
            href={menuHref}
            external={menuExternal}
            variant={tone === "light" ? "gold" : "primary"}
            onClick={() => trackEvent("shop_menu_click", { location: "store_info" })}
          >
            {getMenuLabel()}
          </Button>
          <Button
            href={siteConfig.maps.google}
            external
            variant={tone === "light" ? "secondary" : "outline"}
            onClick={() => trackEvent("directions_click", { provider: "google" })}
          >
            Google Maps
          </Button>
          <Button
            href={siteConfig.maps.apple}
            external
            variant={tone === "light" ? "secondary" : "outline"}
            onClick={() => trackEvent("directions_click", { provider: "apple" })}
          >
            Apple Maps
          </Button>
        </div>
      ) : null}
    </div>
  );
}
