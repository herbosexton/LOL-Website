import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaLinks } from "@/components/seo/AreaLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ImageHero } from "@/components/ui/ImageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreInfo } from "@/components/ui/StoreInfo";
import {
  areaServiceSentence,
  getArea,
  serviceAreas,
  type ServiceArea,
} from "@/config/areas";
import { getMenuHref, isExternalMenu } from "@/lib/menu";
import {
  breadcrumbJsonLd,
  createMetadata,
  faqJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import styles from "@/styles/pages.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) {
    return createMetadata({
      title: "Area",
      description: "This area page could not be found.",
      path: `/areas/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: area.metaTitle,
    description: area.description,
    path: `/areas/${area.slug}`,
    image: area.image,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const menuHref = getMenuHref();
  const others = serviceAreas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <ImageHero
        eyebrow={area.directionLabel}
        title={area.h1}
        copy={area.card}
        image={area.image}
        alt={area.imageAlt}
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <AreaCrumbs area={area} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.prose}>
            <p>{area.intro}</p>
            <p>{area.body}</p>
            <p>{areaServiceSentence(area)}</p>
            <p>
              <Link className={styles.textLink} href="/pickup">
                Pickup details
              </Link>
              {" · "}
              <Link className={styles.textLink} href="/delivery">
                Delivery areas
              </Link>
              {" · "}
              <Link className={styles.textLink} href="/deals">
                Deals
              </Link>
              {" · "}
              <Link className={styles.textLink} href="/review">
                Leave a review
              </Link>
            </p>
          </div>
          <StoreInfo />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Questions from this area"
            subtitle="Pickup, delivery, and the only shop address."
          />
          <FAQAccordion items={area.faqs} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading
            title="Other neighborhoods and towns"
            subtitle="Same dispensary, different starting point."
          />
        </div>
        <AreaLinks areas={others} />
      </section>

      <CTASection
        title="Order from 260 Lark Street"
        copy="The menu is the place to start a pickup or a delivery order."
        primary={{
          label: "Shop the menu",
          href: menuHref,
          external: isExternalMenu(),
        }}
        secondary={{ label: "All areas", href: "/areas" }}
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: area.h1,
          description: area.description,
          path: `/areas/${area.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(area.faqs)} />
    </>
  );
}

function AreaCrumbs({ area }: { area: ServiceArea }) {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <Link href="/areas">Areas</Link>
      <span aria-hidden="true">/</span>
      <span>{area.name}</span>
    </nav>
  );
}
