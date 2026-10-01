import type {
  CategoryItem,
  EducationTopic,
  FaqItem,
  JobOpening,
  NavLink,
  Person,
  SocialLink,
  StoreHours,
  TerpeneItem,
} from "@/types/content";

const menuUrl = process.env.NEXT_PUBLIC_MENU_URL?.trim() || "";

export const siteConfig = {
  name: "Legacy on Lark",
  legalName: "Legacy on Lark",
  tagline: "Cannabis. Culture. Community.",
  description:
    "Legacy on Lark is a premium Albany cannabis dispensary rooted in culture, community, education, and intentional hospitality.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",

  address: {
    street: "260 Lark St",
    city: "Albany",
    state: "NY",
    postalCode: "12210",
    country: "US",
    formatted: "260 Lark St, Albany, NY 12210",
  },

  // Leave empty until confirmed — UI hides empty fields (do not invent).
  phone: "" as string,
  email: "" as string,
  hours: [
    { label: "Monday", value: "8am–10pm" },
    { label: "Tuesday", value: "8am–10pm" },
    { label: "Wednesday", value: "8am–10pm" },
    { label: "Thursday", value: "8am–10pm" },
    { label: "Friday", value: "8am–11pm" },
    { label: "Saturday", value: "9am–11pm" },
    { label: "Sunday", value: "11am–6am" },
  ] as StoreHours[],

  maps: {
    google:
      "https://www.google.com/maps/search/?api=1&query=260+Lark+St+Albany+NY+12210",
    apple: "https://maps.apple.com/?q=260+Lark+St,+Albany,+NY+12210",
    embed:
      "https://maps.google.com/maps?q=260+Lark+St%2C+Albany%2C+NY+12210&z=16&output=embed",
  },

  menuUrl,
  hasMenuUrl: Boolean(menuUrl),

  social: [] as SocialLink[],

  ageGate: {
    storageKey: "lol_age_verified",
    /** Duration in days before re-prompting */
    durationDays: 30,
    exitUrl: "https://www.google.com",
  },

  nav: {
    left: [
      { label: "Home", href: "/" },
      { label: "AI Guide", href: "/ai-guide" },
      { label: "Kulture", href: "/kulture" },
    ] as NavLink[],
    right: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
      { label: "Shop", href: "/shop", emphasize: true },
    ] as NavLink[],
  },

  footerLinks: [
    { label: "Shop", href: "/shop" },
    { label: "AI Guide", href: "/ai-guide" },
    { label: "Kulture", href: "/kulture" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ] as NavLink[],

  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ] as NavLink[],

  deliveryAreas: [
    "Albany, NY",
    "Clifton Park, NY",
    "Latham, NY",
    "Schenectady, NY",
    "Troy, NY",
  ],

  hero: {
    title: "Legacy on Lark",
    subtitle: "Cannabis. Culture. Community.",
    primaryCta: { label: "Shop the Menu", href: "/shop" },
    secondaryCta: { label: "Discover Legacy", href: "/about" },
    poster: "/images/hero-poster.jpg",
    mobilePoster: "/images/hero-mobile.jpg",
    videoMp4: "/video/hero.mp4",
    videoWebm: "/video/hero.webm",
  },

  categories: [
    {
      id: "flower",
      title: "Flower",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/flower.jpg",
      alt: "Premium cannabis flower bag and buds",
      mediaMode: "cover",
      objectPosition: "50% 40%",
      overlay: true,
    },
    {
      id: "prerolls",
      title: "Pre-Rolls",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/prerolls.jpg",
      alt: "Legacy on Lark pre-roll tube and joint",
      mediaMode: "cover",
      objectPosition: "50% 45%",
      overlay: true,
    },
    {
      id: "infusion",
      title: "Infusion",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/infusion.jpg",
      alt: "Cannabis infusion beverage can",
      mediaMode: "cover",
      objectPosition: "50% 45%",
      overlay: true,
    },
    {
      id: "edibles",
      title: "Edibles",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/edibles.jpg",
      alt: "Cannabis edibles pouch with gummies on a dark marble surface",
      mediaMode: "cover",
      objectPosition: "50% 50%",
      overlay: true,
    },
    {
      id: "vaporizers",
      title: "Vaporizers",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/vaporizers.jpg",
      alt: "Sleek vaporizer styled on a forest-green surface",
      mediaMode: "cover",
      objectPosition: "50% 40%",
      overlay: true,
    },
    {
      id: "accessories",
      title: "Accessories",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/accessories.jpg",
      alt: "Legacy on Lark gold accessories tray, grinder, and lighter",
      mediaMode: "cover",
      objectPosition: "50% 50%",
      overlay: true,
    },
    {
      id: "tinctures",
      title: "Tinctures",
      href: "/shop",
      cta: "Shop",
      image: "/images/products/tinctures.jpg",
      alt: "Premium cannabis tincture bottles with gold droppers",
      mediaMode: "cover",
      objectPosition: "50% 45%",
      overlay: true,
    },
  ] as CategoryItem[],

  terpenes: [
    {
      id: "humulene",
      name: "Humulene",
      description:
        "Earthy and woodsy with herbal depth—often associated with grounding, aromatic profiles.",
      href: "/ai-guide#terpenes",
      icon: "humulene",
    },
    {
      id: "eucalyptol",
      name: "Eucalyptol",
      description:
        "Cool, minty, and clarifying—known for a crisp aromatic lift.",
      href: "/ai-guide#terpenes",
      icon: "eucalyptol",
    },
    {
      id: "beta-caryophyllene",
      name: "Beta-Caryophyllene",
      description:
        "Peppery and warm, with a spicy character found in many classic cultivars.",
      href: "/ai-guide#terpenes",
      icon: "beta-caryophyllene",
    },
    {
      id: "terpinolene",
      name: "Terpinolene",
      description:
        "Fresh, floral, and herbal—often linked to bright, uplifting aromatic expressions.",
      href: "/ai-guide#terpenes",
      icon: "terpinolene",
    },
    {
      id: "caryophyllene",
      name: "Caryophyllene",
      description:
        "Spiced and bold, with clove-like warmth that adds complexity to the bouquet.",
      href: "/ai-guide#terpenes",
      icon: "caryophyllene",
    },
  ] as TerpeneItem[],

  educationTopics: [
    {
      id: "cannabis-101",
      title: "Cannabis 101",
      description: "Foundations for confident, informed exploration.",
      href: "/ai-guide#fundamentals",
    },
    {
      id: "terpenes",
      title: "Terpenes",
      description: "How aroma compounds shape the experience.",
      href: "/ai-guide#terpenes",
    },
    {
      id: "product-types",
      title: "Product Types",
      description: "Flower, edibles, vapes, tinctures, and more.",
      href: "/ai-guide#product-types",
    },
    {
      id: "responsible",
      title: "Responsible Consumption",
      description: "Intentional habits for adults 21 and older.",
      href: "/ai-guide#preferences",
    },
    {
      id: "ai-guidance",
      title: "AI Guidance",
      description: "A smarter way to explore what fits you.",
      href: "/ai-guide#experience",
    },
    {
      id: "community",
      title: "Community Knowledge",
      description: "Learning that grows with Albany’s culture.",
      href: "/kulture",
    },
  ] as EducationTopic[],

  people: [
    {
      name: "Niaja",
      role: "Co-founder & Leader",
      summary:
        "Together with Chianti, Niaja helps lead Legacy on Lark with family, trust, and purpose at the center.",
    },
    {
      name: "Chianti",
      role: "Co-founder & Leader",
      summary:
        "A married partner and central leader shaping Legacy’s vision of culture, community, and intentional growth.",
    },
    {
      name: "Herbert",
      role: "Founding Friend & Vision Partner",
      summary:
        "Best friend to Niaja and Chianti; helped build the vision with them from the beginning.",
    },
    {
      name: "Matthew Robinson",
      role: "Investor, Landlord & Guide",
      summary:
        "Later became an investor and landlord, and an important source of guidance for the team.",
    },
  ] as Person[],

  mission:
    "Redefine legacy through a premium cannabis experience that elevates culture, connects community and inspires growth.",

  vision:
    "To be Albany’s most trusted, culturally rooted cannabis destination—where education, technology, and human connection create belonging.",

  values: [
    {
      title: "Family",
      description: "We build with care, loyalty, and long-term thinking.",
    },
    {
      title: "Friendship",
      description: "Trust between people is part of how Legacy was made.",
    },
    {
      title: "Discipline",
      description: "Premium experiences require consistency and standards.",
    },
    {
      title: "Community",
      description: "We show up for Albany with warmth and respect.",
    },
    {
      title: "Education",
      description: "Knowledge makes cannabis more approachable and intentional.",
    },
    {
      title: "Legacy",
      description: "We work for generational impact, not short-term trends.",
    },
  ],

  careers: [
    {
      id: "budtender",
      title: "Budtender",
      type: "Full-time / Part-time",
      summary:
        "Guide guests with warmth, product knowledge, and the hospitality of a house that feels like home—premium without pretension.",
      responsibilities: [
        "Welcome guests 21+ and create a calm, confident retail experience",
        "Recommend products based on preferences, effects, and education",
        "Maintain a polished sales floor and support daily store operations",
        "Uphold compliance, ID verification, and responsible-sale standards",
      ],
      requirements: [
        "Must be 21 years of age or older",
        "Strong communication and customer-service instincts",
        "Interest in cannabis education and community culture",
        "Ability to stand for shifts and lift up to 25 lbs as needed",
      ],
    },
    {
      id: "inventory-specialist",
      title: "Inventory Specialist",
      type: "Full-time",
      summary:
        "Own the back-of-house rhythm—receiving, tracking, and protecting inventory so the floor stays accurate and audit-ready.",
      responsibilities: [
        "Receive, verify, and organize incoming product shipments",
        "Maintain inventory accuracy across rooms, counts, and transfers",
        "Coordinate with budtenders and leadership on stock levels",
        "Support compliance documentation and discrepancy resolution",
      ],
      requirements: [
        "Must be 21 years of age or older",
        "Detail-oriented with comfort handling organized systems",
        "Reliable follow-through in a paced retail environment",
        "Prior inventory, warehouse, or cannabis retail experience preferred",
      ],
    },
  ] as JobOpening[],

  contactFaqs: [
    {
      id: "location",
      question: "Where are you located?",
      answer:
        "Legacy On Lark is located at 260 Lark Street, Albany, NY 12210.",
    },
    {
      id: "age",
      question: "How old do you have to be to enter?",
      answer:
        "You must be 21 years of age or older with a valid government-issued ID to enter and purchase from Legacy on Lark, in accordance with New York State cannabis regulations.",
    },
    {
      id: "pickup-delivery",
      question: "Do you offer in-store pickup or delivery?",
      answer:
        "Yes. In-store pickup is available for online orders. Delivery is also available through one of New York’s largest and longest-running cannabis delivery services.",
    },
    {
      id: "staff",
      question: "Do you have knowledgeable staff to help me choose products?",
      answer:
        "Yes. Our experienced Budmasters are passionate about cannabis and its benefits. They’ll guide you to the best products tailored to your personal cannabis needs and preferences.",
    },
    {
      id: "quality",
      question: "Are your cannabis products curated for quality?",
      answer:
        "Absolutely. Every product on our shelves is carefully selected for quality, safety, and potency, ensuring you have access to only the best cannabis available in Albany and the Capital Region.",
    },
    {
      id: "explore",
      question: "Can I explore cannabis products in-store?",
      answer:
        "Of course. Legacy on Lark offers a welcoming, educational environment where guests can explore our selection, learn about cannabis, and enjoy a personalized shopping experience.",
    },
    {
      id: "different",
      question: "What makes LOL different from other dispensaries?",
      answer:
        "Legacy on Lark is rooted in family, trust, culture, and intentional hospitality. We focus on premium products, education, community, and a warm Albany experience that feels personal—not corporate.",
    },
    {
      id: "id",
      question: "What do I need to bring with me to shop?",
      answer:
        "Customers must be 21 years or older to enter and shop. All customers must present a valid government-issued photo ID to enter and make purchases. This includes a driver’s license, state ID, or passport. We cannot accept expired IDs.",
    },
    {
      id: "medical-card",
      question: "Do I need a medical card?",
      answer:
        "For adult-use purchases in New York, you typically only need to meet the 21+ age requirement and present a valid government-issued ID. Medical patients should bring any documentation required by current New York regulations when applicable.",
    },
    {
      id: "products",
      question: "What types of products are available to buy?",
      answer:
        "We carry a curated selection of flower, pre-rolls, vaporizers, concentrates, edibles, tinctures, accessories, and more. Availability varies, and our menu is updated regularly.",
    },
    {
      id: "out-of-state",
      question: "Can I purchase cannabis if I live out of state?",
      answer:
        "Yes, as long as you bring a valid government-issued ID confirming you are 21+. Transporting cannabis across state lines is prohibited under federal law, even for personal use.",
    },
    {
      id: "payments",
      question: "Do you accept credit or debit cards?",
      answer:
        "Due to federal banking restrictions, many cannabis purchases are cash-based. Ask our team about current payment options available in-store, including any cashless or debit options that may be offered.",
    },
  ] as FaqItem[],

  deliveryFaqs: [
    {
      id: "areas",
      question: "Where do you deliver?",
      answer:
        "We currently support delivery to Albany, Clifton Park, Latham, Schenectady, and Troy, New York.",
    },
    {
      id: "order",
      question: "How do I place a delivery order?",
      answer:
        "Browse the menu, place your order through our ordering platform, and follow the checkout steps for delivery when available in your area.",
    },
    {
      id: "id",
      question: "Do I need ID for delivery?",
      answer:
        "Yes. Delivery is for adults 21+. Valid government-issued photo ID is required at delivery.",
    },
  ] as FaqItem[],

  aiFaqs: [
    {
      id: "medical",
      question: "Is this medical advice?",
      answer:
        "No. The AI Guide is an educational matching experience. It is not medical advice, and it does not diagnose, treat, or guarantee outcomes.",
    },
    {
      id: "effects",
      question: "Will the recommendations guarantee how I feel?",
      answer:
        "No. Individual experiences vary based on many factors. Use recommendations as a starting point for exploration, not a promise.",
    },
    {
      id: "privacy",
      question: "What happens to my preferences?",
      answer:
        "Preferences entered in the guide are used to generate suggestions in the moment. Do not submit personal health information.",
    },
  ] as FaqItem[],
} as const;

export type SiteConfig = typeof siteConfig;
