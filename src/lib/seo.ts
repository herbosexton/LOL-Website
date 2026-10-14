import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { groupStoreHours, openingHoursText } from "@/lib/hours";
import { absoluteUrl } from "@/lib/utils";

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/images/og-default.jpg",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  // Leave bare titles so root layout `title.template` can append the site name once.
  const pageTitle = title;
  const displayTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: displayTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function businessId() {
  return `${siteConfig.url.replace(/\/$/, "")}/#business`;
}

function httpsUrls(values: readonly string[]) {
  return [
    ...new Set(
      values.map((href) => href.trim()).filter((href) => /^https?:\/\//i.test(href)),
    ),
  ];
}

export function sameAsUrls() {
  return httpsUrls([
    ...siteConfig.social.map((item) => item.href),
    ...siteConfig.citationProfiles.map((item) => item.href),
  ]);
}

/** Direct Google review URL, or null until Herbert pastes one. */
export function googleReviewHref() {
  const configured = siteConfig.googleReviewUrl.trim();
  return /^https?:\/\//i.test(configured) ? configured : null;
}

function deliveryCities() {
  return siteConfig.deliveryAreas.map((area) => ({
    "@type": "City",
    name: area.replace(/, NY$/, ""),
  }));
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

/** Built only from siteConfig.hours. Do not keep a second hours list. */
function openingHoursJsonLd() {
  return groupStoreHours(siteConfig.hours).map((group) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: group.days.length === 1 ? group.days[0] : group.days,
    opens: group.opens,
    closes: group.closes,
  }));
}

export function localBusinessJsonLd() {
  const sameAs = sameAsUrls();
  const id = businessId();
  const cities = deliveryCities();
  const license = siteConfig.licenseNumber.trim();

  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": id,
    name: siteConfig.name,
    alternateName: ["LOL Dispensary", "Legacy On Lark"],
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/images/og-default.jpg"),
    logo: absoluteUrl("/images/logo.jpg"),
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash",
    menu: siteConfig.menuUrl,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.maps.google,
    openingHours: openingHoursText(siteConfig.hours),
    openingHoursSpecification: openingHoursJsonLd(),
    areaServed: cities,
    makesOffer: [
      {
        "@type": "Offer",
        name: "In-store pickup",
        url: siteConfig.menuUrl,
        availableAtOrFrom: { "@id": id },
        itemOffered: {
          "@type": "Service",
          name: "In-store cannabis pickup",
          serviceType: "Pickup",
          url: siteConfig.menuUrl,
          provider: { "@id": id },
        },
      },
      {
        "@type": "Offer",
        name: "Cannabis delivery",
        url: absoluteUrl("/delivery"),
        areaServed: cities,
        itemOffered: {
          "@type": "Service",
          name: "Cannabis delivery",
          serviceType: "Delivery",
          url: absoluteUrl("/delivery"),
          provider: { "@id": id },
          areaServed: cities,
        },
      },
    ],
    ...(license
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "New York OCM license",
            value: license,
          },
        }
      : {}),
    ...(siteConfig.phone
      ? {
          telephone: `+1${siteConfig.phone.replace(/\D/g, "")}`,
        }
      : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    about: { "@id": businessId() },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
