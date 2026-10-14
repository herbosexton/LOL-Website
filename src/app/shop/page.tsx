import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { imageAlt } from "@/lib/image-alts";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Shop the Albany Dispensary Menu",
  description:
    "Shop flower, edibles, vapes, and drinks at Legacy on Lark. Order pickup at 260 Lark Street in Albany, or delivery where we serve. Adults 21+.",
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
        alt={imageAlt.flowerMacro}
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
          <div className={styles.actions}>
            <Button href={href} external={external} variant="primary">
              {getMenuLabel("Shop Now")}
            </Button>
            <Button href="/contact" variant="outline">
              Visit the shop
            </Button>
          </div>
          <p>
            Prefer to come in? See{" "}
            <Link className={styles.textLink} href="/contact">
              hours and directions for 260 Lark Street
            </Link>
            , or check{" "}
            <Link className={styles.textLink} href="/delivery">
              delivery in Albany and nearby towns
            </Link>
            . You can also{" "}
            <Link className={styles.textLink} href="/about">
              read about the Lark Street shop
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
