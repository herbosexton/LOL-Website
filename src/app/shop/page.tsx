import { Button } from "@/components/ui/Button";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { createMetadata } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const metadata = createMetadata({
  title: "Shop",
  description:
    "Shop the Legacy on Lark menu, premium cannabis products for adults 21+ in Albany, NY.",
  path: "/shop",
});

export default function ShopPage() {
  const href = getMenuHref();
  const external = isExternalMenu();

  return (
    <>
      <ImageHero
        eyebrow="Shop"
        title="The Menu"
        copy="Ordering is powered by our external cannabis menu platform when configured."
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
                ? "Continue to our ordering platform to browse products and place an order."
                : "Set NEXT_PUBLIC_MENU_URL to connect your ordering platform. Until then, explore the rest of the site or contact us."
            }
          />
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button href={href} external={external} variant="primary">
              {getMenuLabel("View Menu")}
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
