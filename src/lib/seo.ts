import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
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

function openingHoursJsonLd() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "06:00",
    },
  ];
}

export function localBusinessJsonLd() {
  const sameAs = siteConfig.social
    .map((item) => item.href)
    .filter((href) => /^https?:\/\//i.test(href));

  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": `${siteConfig.url.replace(/\/$/, "")}/#business`,
    name: siteConfig.name,
    alternateName: ["LOL Dispensary", "Legacy On Lark"],
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/images/og-default.jpg"),
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.maps.google,
    openingHoursSpecification: openingHoursJsonLd(),
    areaServed: siteConfig.deliveryAreas.map((area) => ({
      "@type": "City",
      name: area.replace(/, NY$/, ""),
    })),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
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
