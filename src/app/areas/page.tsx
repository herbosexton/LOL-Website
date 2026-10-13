import Link from "next/link";
import { AreaLinks } from "@/components/seo/AreaLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/ui/CTASection";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreas } from "@/config/areas";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, createMetadata, webPageJsonLd } from "@/lib/seo";
import styles from "@/styles/pages.module.css";

const title = "Dispensary near Albany Neighborhoods";
const description =
  "Neighborhood and town pages for Legacy on Lark, the Albany dispensary at 260 Lark St. North, east, and southeast of the shop, plus the towns we already deliver to. Adults 21+.";

export const metadata = createMetadata({
  title,
  description,
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <ImageHero
        eyebrow="Areas"
        title="Dispensary near these neighborhoods"
        copy="One shop, at 260 Lark Street in Center Square. These pages say how to reach it, and where delivery is already offered."
        image="/images/about/community.jpg"
        alt="Guests near Legacy on Lark in Albany"
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Areas</span>
          </nav>
          <SectionHeading
            title="North, east, and the delivery towns"
            subtitle="If you are looking for a dispensary near you in Albany, start here. Adult-use, which a lot of guests call recreational, still means this one address."
          />
          <div className={styles.prose}>
            <p>
              The pages below cover neighborhoods north, east, and southeast of
              Lark Street, plus every town already named on the delivery list.
              Each one says whether to come in for pickup or order delivery.
              None of them is a second store.
            </p>
            <p>
              <Link className={styles.textLink} href="/pickup">
                Pickup
              </Link>{" "}
              is at 260 Lark Street.{" "}
              <Link className={styles.textLink} href="/delivery">
                Delivery
              </Link>{" "}
              covers {siteConfig.deliveryAreas.join(", ")}. Menands is pickup
              only. Deals, when the menu has them, are on the{" "}
              <Link className={styles.textLink} href="/deals">
                deals page
              </Link>
              .
            </p>
          </div>
        </div>
        <AreaLinks areas={serviceAreas} />
      </section>

      <CTASection
        title="Come to Lark, or order in"
        copy="Browse the live menu for pickup at the shop or delivery in a supported town."
        primary={{ label: "Shop the menu", href: "/shop" }}
        secondary={{ label: "Hours and directions", href: "/contact" }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
        ])}
      />
      <JsonLd data={webPageJsonLd({ name: title, description, path: "/areas" })} />
    </>
  );
}
