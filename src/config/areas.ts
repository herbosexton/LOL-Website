import { siteConfig } from "@/config/site";

type DeliveryArea = (typeof siteConfig.deliveryAreas)[number];

export interface ServiceArea {
  slug: string;
  name: string;
  /** Short label for cards, such as North or East. */
  directionLabel: string;
  /** One line under the name on cards and the hub. */
  card: string;
  metaTitle: string;
  /** Visible H1. */
  h1: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string;
  body: string;
  /**
   * When set, must be one of the published delivery areas.
   * Omit it for pickup-only places. Do not invent a delivery town here.
   */
  deliveryArea?: DeliveryArea;
  faqs: Array<{ id: string; question: string; answer: string }>;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "center-square",
    name: "Center Square",
    directionLabel: "At the shop",
    card: "The dispensary is on Lark Street in this neighborhood.",
    metaTitle: "Dispensary in Center Square",
    h1: "Dispensary in Center Square",
    description:
      "Legacy on Lark is the adult-use dispensary at 260 Lark St in Albany's Center Square. In-store pickup, and delivery for Albany addresses. Adults 21+.",
    image: "/images/about/store-interior.jpg",
    imageAlt: "Warm interior of the Legacy on Lark shop on Lark Street",
    intro:
      "Legacy on Lark is in Center Square, at 260 Lark Street. Lark Street is one block from Washington Park and a short walk from downtown Albany. Hudson/Park and Park South continue south on the same street.",
    body:
      "Neighbors can walk in during open hours. Order ahead for in-store pickup, or choose delivery at checkout when the menu offers it for an Albany address. Bring a valid government-issued photo ID. You must be 21 or older. There is not a second counter in the park or on Madison Avenue.",
    deliveryArea: "Albany, NY",
    faqs: [
      {
        id: "where",
        question: "Is there a dispensary in Center Square?",
        answer:
          "Yes. Legacy on Lark is at 260 Lark Street, Albany, NY 12210, in Center Square.",
      },
      {
        id: "pickup",
        question: "Can I pick up an order in Center Square?",
        answer:
          "Yes. In-store pickup is at 260 Lark Street. Delivery is also available for Albany addresses when checkout offers it.",
      },
    ],
  },
  {
    slug: "downtown-albany",
    name: "Downtown Albany",
    directionLabel: "East",
    card: "A short walk east of the shop, toward the plaza.",
    metaTitle: "Dispensary near Downtown Albany",
    h1: "Dispensary near downtown Albany",
    description:
      "Looking for a dispensary near downtown Albany? Legacy on Lark is in Center Square at 260 Lark St, a short walk west of the Empire State Plaza. Adults 21+.",
    image: "/images/about/community.jpg",
    imageAlt: "Guests outside Legacy on Lark in Albany",
    intro:
      "Downtown Albany and the Empire State Plaza sit east of Lark Street. Center Square is the next neighborhood west, which is where the shop is. There is not a second counter downtown.",
    body:
      "If you are at the plaza or along the downtown streets, walk west to 260 Lark Street for pickup. Albany addresses can also choose delivery when the menu offers it. Rensselaer is farther east, across the Hudson, and is not on the published delivery list, so those orders are pickup at the shop.",
    deliveryArea: "Albany, NY",
    faqs: [
      {
        id: "downtown",
        question: "Is Legacy on Lark a downtown Albany dispensary?",
        answer:
          "The shop is in Center Square at 260 Lark Street, a short walk west of downtown and the Empire State Plaza.",
      },
      {
        id: "deliver",
        question: "Do you deliver downtown?",
        answer:
          "Albany is a published delivery area. Choose delivery at checkout when your address is supported. Pickup is at 260 Lark Street.",
      },
    ],
  },
  {
    slug: "mansion",
    name: "Mansion",
    directionLabel: "Southeast",
    card: "Southeast of Lark Street, on the downtown side.",
    metaTitle: "Dispensary near the Mansion Neighborhood",
    h1: "Dispensary near the Mansion neighborhood",
    description:
      "Legacy on Lark is the Albany dispensary near the Mansion neighborhood, at 260 Lark St in Center Square. Pickup at the shop, delivery for Albany addresses. Adults 21+.",
    image: "/images/about/welcome.jpg",
    imageAlt: "Budtender and guest looking at cannabis flower at Legacy on Lark",
    intro:
      "The Mansion neighborhood sits south of the Empire State Plaza, southeast of Center Square. The shop is not inside that neighborhood. It is north and west of it, on Lark Street.",
    body:
      "Come to 260 Lark Street for pickup. The Pastures, farther toward the river, uses the same shop. There is no Mansion storefront and no Pastures storefront. Albany delivery applies when checkout accepts the address.",
    deliveryArea: "Albany, NY",
    faqs: [
      {
        id: "where",
        question: "Is there a dispensary in the Mansion neighborhood?",
        answer:
          "Legacy on Lark does not have a Mansion storefront. The shop is at 260 Lark Street in Center Square, northwest of the Mansion neighborhood.",
      },
      {
        id: "pickup",
        question: "Can Mansion neighbors order for pickup?",
        answer:
          "Yes. Pickup is at 260 Lark Street. Albany addresses can also choose delivery when checkout offers it.",
      },
    ],
  },
  {
    slug: "arbor-hill",
    name: "Arbor Hill",
    directionLabel: "North",
    card: "Lark Street continues north through Sheridan Hollow into Arbor Hill.",
    metaTitle: "Dispensary near Arbor Hill",
    h1: "Dispensary near Arbor Hill",
    description:
      "Arbor Hill neighbors can follow Lark Street south to Legacy on Lark at 260 Lark St in Center Square. Albany pickup and delivery. Adults 21+.",
    image: "/images/kulture/hero.jpg",
    imageAlt: "Dark editorial photograph used on Legacy on Lark",
    intro:
      "Lark Street runs north from Center Square through Sheridan Hollow and into Arbor Hill. The dispensary is on the Center Square stretch of that same street, at 260 Lark Street. North Albany sits farther north along the river.",
    body:
      "There is no Arbor Hill storefront. Follow Lark south to the shop for pickup, or use delivery if your Albany address is accepted at checkout. West Hill, just west of Arbor Hill, uses this same Lark Street address. We do not list a West Hill shop.",
    deliveryArea: "Albany, NY",
    faqs: [
      {
        id: "where",
        question: "Is there a dispensary in Arbor Hill?",
        answer:
          "Legacy on Lark does not have an Arbor Hill storefront. The shop is south on Lark Street, at 260 Lark Street in Center Square.",
      },
      {
        id: "north",
        question: "What about North Albany?",
        answer:
          "North Albany is farther north. Pickup is still at 260 Lark Street. Albany delivery is available when checkout accepts the address.",
      },
    ],
  },
  {
    slug: "menands",
    name: "Menands",
    directionLabel: "Northeast",
    card: "The village just north of Albany. Pickup is on Lark Street.",
    metaTitle: "Dispensary near Menands",
    h1: "Dispensary near Menands, NY",
    description:
      "Menands is northeast of Legacy on Lark. The Albany dispensary is at 260 Lark St. Pickup in Albany. Menands is not a published delivery area. Adults 21+.",
    image: "/images/delivery/hero.jpg",
    imageAlt: "Green photograph used for Legacy on Lark service pages",
    intro:
      "Menands is the village along the Hudson just north of Albany, northeast of Center Square. Watervliet is the next village north. Neither Menands nor Watervliet is on the published delivery list.",
    body:
      "Pickup is at 260 Lark Street in Albany. Latham and Troy are the published delivery areas in this direction. If you live in Menands, plan on coming to the shop unless a future menu checkout says otherwise. Today, the site does not list Menands as a delivery town.",
    faqs: [
      {
        id: "delivery",
        question: "Do you deliver to Menands?",
        answer:
          "No. Menands is not on the published delivery list. Pickup is at 260 Lark Street, Albany, NY 12210.",
      },
      {
        id: "where",
        question: "Where is the nearest Legacy on Lark to Menands?",
        answer:
          "The only shop is at 260 Lark Street in Albany's Center Square, southwest of Menands.",
      },
    ],
  },
  {
    slug: "latham",
    name: "Latham",
    directionLabel: "North, delivery",
    card: "North of Albany. Latham is a published delivery area.",
    metaTitle: "Dispensary Delivery for Latham",
    h1: "Dispensary near Latham, NY",
    description:
      "Legacy on Lark delivers to Latham, NY and offers pickup at 260 Lark St in Albany. Adult-use dispensary. Adults 21+ with valid ID.",
    image: "/images/lifestyle/brand-flatlay.jpg",
    imageAlt: "Product flat lay for the Legacy on Lark menu",
    intro:
      "Latham is north of Albany, in the Town of Colonie. It is one of the delivery areas already listed on this site. The shop itself is south of Latham, at 260 Lark Street in Albany.",
    body:
      "Order on the menu and choose delivery if checkout accepts your Latham address. Pickup is at the Albany shop. Delivery to Latham does not mean every address in Colonie. If checkout does not offer delivery, come to 260 Lark Street. We do not list fees, minimums, or cutoff times here.",
    deliveryArea: "Latham, NY",
    faqs: [
      {
        id: "delivery",
        question: "Do you deliver to Latham?",
        answer:
          "Yes. Latham, NY is a published delivery area. Place the order on the menu and choose delivery when checkout accepts the address.",
      },
      {
        id: "colonie",
        question: "Does Latham delivery cover all of Colonie?",
        answer:
          "No. The published area is Latham. Other Colonie addresses should check checkout or pick up at 260 Lark Street in Albany.",
      },
    ],
  },
  {
    slug: "troy",
    name: "Troy",
    directionLabel: "Northeast, delivery",
    card: "Across the Hudson. Troy is a published delivery area.",
    metaTitle: "Dispensary Delivery for Troy",
    h1: "Dispensary near Troy, NY",
    description:
      "Legacy on Lark delivers to Troy, NY from the Albany dispensary at 260 Lark St. Pickup is in Center Square. Adults 21+ with valid ID.",
    image: "/images/about/community.jpg",
    imageAlt: "Community photograph for Legacy on Lark in Albany",
    intro:
      "Troy is northeast of Albany, across the Hudson. It is a published delivery area. The only storefront is 260 Lark Street in Albany's Center Square.",
    body:
      "Place a delivery order on the menu when your Troy address is supported at checkout. Have a valid 21+ photo ID ready at the door. If you would rather visit, the shop is on Lark Street. Cohoes and Watervliet are not listed as delivery areas, so those trips are pickup unless checkout says the address is supported.",
    deliveryArea: "Troy, NY",
    faqs: [
      {
        id: "delivery",
        question: "Do you deliver to Troy?",
        answer:
          "Yes. Troy, NY is a published delivery area. ID is required at delivery, and you must be 21 or older.",
      },
      {
        id: "shop",
        question: "Is there a Legacy on Lark shop in Troy?",
        answer:
          "No. The shop is at 260 Lark Street, Albany, NY 12210. Troy orders are delivery from that store, or pickup if you come in.",
      },
    ],
  },
  {
    slug: "clifton-park",
    name: "Clifton Park",
    directionLabel: "North, delivery",
    card: "Farther north. Clifton Park is a published delivery area.",
    metaTitle: "Dispensary Delivery for Clifton Park",
    h1: "Dispensary delivery for Clifton Park",
    description:
      "Legacy on Lark delivers to Clifton Park, NY. The dispensary is at 260 Lark St, Albany. Adults 21+ with valid ID at delivery or pickup.",
    image: "/images/delivery/hero.jpg",
    imageAlt: "Green photograph introducing Legacy on Lark delivery",
    intro:
      "Clifton Park is north of Albany and Latham. It is already on the delivery list. The shop is in Albany, not in Clifton Park.",
    body:
      "Use the menu for delivery when your address qualifies. Pickup remains at 260 Lark Street. Have a valid government-issued photo ID ready, and be 21 or older. Fees, minimums, and cutoff times stay on the ordering platform, not on this page.",
    deliveryArea: "Clifton Park, NY",
    faqs: [
      {
        id: "delivery",
        question: "Do you deliver to Clifton Park?",
        answer:
          "Yes. Clifton Park, NY is a published delivery area for Legacy on Lark. Confirm the address at checkout.",
      },
      {
        id: "pickup",
        question: "Can I still pick up in Albany?",
        answer:
          "Yes. In-store pickup is at 260 Lark Street, Albany, NY 12210, during posted hours.",
      },
    ],
  },
  {
    slug: "schenectady",
    name: "Schenectady",
    directionLabel: "West, delivery",
    card: "West of Albany. Schenectady is a published delivery area.",
    metaTitle: "Dispensary Delivery for Schenectady",
    h1: "Dispensary delivery for Schenectady",
    description:
      "Legacy on Lark delivers to Schenectady, NY from 260 Lark St in Albany. In-store pickup is in Center Square. Adults 21+.",
    image: "/images/lifestyle/brand-flatlay.jpg",
    imageAlt: "Styled product photograph for the Legacy on Lark menu",
    intro:
      "Schenectady is west of Albany and is a published delivery area. The storefront is still on Lark Street in Albany. This page is here so Schenectady orders have a clear path, not because there is a Schenectady shop.",
    body:
      "Choose delivery on the menu when checkout accepts your Schenectady address. Bring valid 21+ photo ID to the door. To visit, come to 260 Lark Street in Center Square. We do not publish a second dispensary west of Albany.",
    deliveryArea: "Schenectady, NY",
    faqs: [
      {
        id: "delivery",
        question: "Do you deliver to Schenectady?",
        answer:
          "Yes. Schenectady, NY is a published delivery area. The order is filled from the Albany shop at 260 Lark Street.",
      },
      {
        id: "shop",
        question: "Is the dispensary in Schenectady?",
        answer:
          "No. Legacy on Lark is an Albany dispensary at 260 Lark Street. Schenectady service is delivery, or pickup if you drive to the shop.",
      },
    ],
  },
];

export function getArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function areaOffersDelivery(area: ServiceArea) {
  return Boolean(
    area.deliveryArea && siteConfig.deliveryAreas.includes(area.deliveryArea),
  );
}

export function areaServiceSentence(area: ServiceArea) {
  if (area.deliveryArea && areaOffersDelivery(area)) {
    const place = area.deliveryArea.replace(/, NY$/, "");
    return `${place} is one of the delivery areas already listed for Legacy on Lark. Pickup is still at 260 Lark Street. Choose delivery only when checkout accepts the address.`;
  }
  return `${area.name} is not on the published delivery list. Pickup is at 260 Lark Street in Albany.`;
}
