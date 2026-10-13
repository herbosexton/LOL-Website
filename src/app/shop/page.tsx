import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Shop the Albany Dispensary Menu",
  description:
    "Shop the Legacy on Lark menu for flower, edibles, vapes, drinks, and more. Pickup at 260 Lark St in Albany, or delivery in supported towns. Adults 21+.",
  path: "/shop",
});

export default function ShopPage() {
  const href = getMenuHref();
  const external = isExternalMenu();

  return (
    <>
      <ImageHero
        eyebrow="Shop"
        title="The Albany dispensary menu"
        copy="Order flower, edibles, vapes, drinks, and more for pickup at 260 Lark Street, or delivery where we already serve."
        image="/images/lifestyle/brand-flatlay.jpg"
        alt="Product-inspired visual introducing the Legacy on Lark shop"
        compact
      />
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title={siteConfig.hasMenuUrl ? "Open the Live Menu" : "Menu Coming Soon"}
            subtitle={
              siteConfig.hasMenuUrl
                ? "The live menu is the current list. Pickup is at 260 Lark Street in Center Square."
                : "The ordering link is not connected yet. Explore the rest of the site or contact the shop."
            }
          />
          <p>
            <Link className={styles.textLink} href="/pickup">
              Pickup
            </Link>
            {" · "}
            <Link className={styles.textLink} href="/delivery">
              Delivery
            </Link>
            {" · "}
            <Link className={styles.textLink} href="/deals">
              Deals
            </Link>
            {" · "}
            <Link className={styles.textLink} href="/areas">
              Neighborhoods
            </Link>
          </p>
          <div className={styles.actions}>
            <Button href={href} external={external} variant="primary">
              {getMenuLabel("Shop Now")}
            </Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
