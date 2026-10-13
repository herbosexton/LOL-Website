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

const menuUrl =
  process.env.NEXT_PUBLIC_MENU_URL?.trim() ||
  "https://menu.legacy-dispensary.com/lol-dispensary/?delivery_type=pickup";

export const siteConfig = {
  name: "Legacy on Lark",
  legalName: "Legacy on Lark",
  tagline: "Cannabis. Culture. Community.",
  description:
    "Legacy on Lark is an adult-use cannabis dispensary at 260 Lark St in Albany, NY. Shop flower, edibles, vapes, drinks, and more, with in-store pickup and Capital Region delivery for adults 21+.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",

  address: {
    street: "260 Lark St",
    city: "Albany",
    state: "NY",
    postalCode: "12210",
    country: "US",
    formatted: "260 Lark St, Albany, NY 12210",
  },

  geo: {
    latitude: 42.6539184,
    longitude: -73.765856,
  },

  // Leave empty until confirmed, UI hides empty fields (do not invent).
  phone: "(518) 512-3232",
  email: "support@loldispensary.com",
  hours: [
    { label: "Monday", value: "8am-10pm" },
    { label: "Tuesday", value: "8am-10pm" },
    { label: "Wednesday", value: "8am-10pm" },
    { label: "Thursday", value: "8am-10pm" },
    { label: "Friday", value: "8am-11pm" },
    { label: "Saturday", value: "9am-11pm" },
    { label: "Sunday", value: "11am-6am" },
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
      { label: "Guide", href: "/ai-guide" },
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
    { label: "Guide", href: "/ai-guide" },
    { label: "Kulture", href: "/kulture" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Delivery", href: "/delivery" },
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
    primaryCta: { label: "Shop Now", href: menuUrl },
    secondaryCta: { label: "Our Story", href: "/about" },
    poster: "/images/hero-poster.jpg",
    mobilePoster: "/images/hero-mobile.jpg",
    videoMp4: "/video/hero.mp4",
    videoWebm: "/video/hero.webm",
  },

  categories: [
    {
      id: "flower",
      title: "Flower",
      href: menuUrl,
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
      href: menuUrl,
      cta: "Shop",
      image: "/images/products/prerolls.jpg",
      alt: "Legacy on Lark pre-roll tube and joint",
      mediaMode: "cover",
      objectPosition: "50% 45%",
      overlay: true,
    },
    {
      id: "infusion",
      title: "Drinks",
      href: menuUrl,
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
      href: menuUrl,
      cta: "Shop",
      image: "/images/products/edibles.jpg",
      alt: "Cannabis edibles pouch with gummies on a dark marble surface",
      mediaMode: "cover",
      objectPosition: "50% 50%",
      overlay: true,
    },
    {
      id: "vaporizers",
      title: "Vapes",
      href: menuUrl,
      cta: "Shop",
      image: "/images/products/vaporizers.jpg",
      alt: "Sleek vaporizer styled on a forest-green surface",
      mediaMode: "cover",
      objectPosition: "50% 40%",
      overlay: true,
    },
    {
      id: "accessories",
      title: "Chocolate",
      href: menuUrl,
      cta: "Shop",
      image: "/images/products/accessories.jpg",
      alt: "Cannabis chocolate bar styled for the Legacy on Lark menu",
      mediaMode: "cover",
      objectPosition: "50% 50%",
      overlay: true,
    },
    {
      id: "tinctures",
      title: "Tinctures",
      href: menuUrl,
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
      description: "Earthy, woodsy, and herbal. Common in hoppy or spicy profiles.",
      href: "/ai-guide#terpenes",
      icon: "humulene",
    },
    {
      id: "eucalyptol",
      name: "Eucalyptol",
      description: "Cool and minty, with a clean, crisp edge.",
      href: "/ai-guide#terpenes",
      icon: "eucalyptol",
    },
    {
      id: "beta-caryophyllene",
      name: "Beta-Caryophyllene",
      description: "Peppery and warm. Shows up in a lot of classic strains.",
      href: "/ai-guide#terpenes",
      icon: "beta-caryophyllene",
    },
    {
      id: "terpinolene",
      name: "Terpinolene",
      description: "Fresh, floral, and a little herbal. Often brighter on the nose.",
      href: "/ai-guide#terpenes",
      icon: "terpinolene",
    },
    {
      id: "caryophyllene",
      name: "Caryophyllene",
      description: "Spiced and bold, closer to clove than citrus.",
      href: "/ai-guide#terpenes",
      icon: "caryophyllene",
    },
  ] as TerpeneItem[],

  educationTopics: [
    {
      id: "cannabis-101",
      title: "Cannabis 101",
      description: "The basics before you buy.",
      href: "/ai-guide#fundamentals",
    },
    {
      id: "terpenes",
      title: "Terpenes",
      description: "What you smell, and why it matters.",
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
      title: "Responsible Use",
      description: "Simple habits for adults 21 and older.",
      href: "/ai-guide#preferences",
    },
    {
      id: "ai-guidance",
      title: "Find Your Fit",
      description: "Answer a few questions, get clearer options.",
      href: "/ai-guide#experience",
    },
    {
      id: "community",
      title: "Kulture",
      description: "Albany stories, culture, and community.",
      href: "/kulture",
    },
  ] as EducationTopic[],

  people: [
    {
      name: "Niaja",
      role: "Co-founder",
      summary:
        "Co-leads Legacy on Lark with Chianti. Family and trust sit at the center of how the store is run.",
    },
    {
      name: "Chianti",
      role: "Co-founder",
      summary:
        "Co-leads the business with Niaja. Focused on culture, community, and building something that lasts.",
    },
    {
      name: "Herbert",
      role: "Founding Friend",
      summary:
        "Close friend to Niaja and Chianti. Helped shape the vision from the start.",
    },
    {
      name: "Matthew Robinson",
      role: "Investor, Landlord & Guide",
      summary:
        "Came on later as investor and landlord, and continues to advise the team.",
    },
  ] as Person[],

  mission:
    "Run a cannabis shop Albany can be proud of: good product, straight answers, and hospitality that feels like home.",

  vision:
    "Be the Capital Region spot people trust for quality cannabis, clear education, and a real sense of community.",

  values: [
    {
      title: "Family",
      description: "We build for the long run, not the quick win.",
    },
    {
      title: "Friendship",
      description: "This store started with trust between people who show up for each other.",
    },
    {
      title: "Discipline",
      description: "Standards matter: clean floor, accurate inventory, consistent service.",
    },
    {
      title: "Community",
      description: "We are on Lark Street for Albany neighbors, not tourists only.",
    },
    {
      title: "Education",
      description: "We explain product clearly so guests can choose with confidence.",
    },
    {
      title: "Legacy",
      description: "We are building something that can outlast a trend cycle.",
    },
  ],

  careers: [
    {
      id: "budtender",
      title: "Budtender",
      type: "Part-time",
      summary:
        "Guide guests with warmth, product knowledge, and the hospitality of a house that feels like home, premium without pretension.",
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
      type: "Part-time",
      summary:
        "Own the back-of-house rhythm, receiving, tracking, and protecting inventory so the floor stays accurate and audit-ready.",
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
        "Legacy on Lark is rooted in family, trust, and culture. We focus on good product, clear education, and a warm Albany shop experience that feels personal, not corporate.",
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
        "No. The product guide is educational only. It is not medical advice, and it does not diagnose, treat, or guarantee outcomes.",
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
