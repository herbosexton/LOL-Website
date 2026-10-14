export type MediaMode = "contain" | "cover";

export interface FocalPoint {
  x: string;
  y: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
  mediaMode: MediaMode;
  objectPosition?: string;
  overlay?: boolean;
}

export interface TerpeneItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: string;
  seoDescription: string;
  body: string;
}

export interface EducationTopic {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  emphasize?: boolean;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok" | "youtube";
  href: string;
  label: string;
}

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/**
 * Opens and closes are the only hours data. Page labels are formatted from
 * these fields, and LocalBusiness schema reads the same values.
 */
export interface StoreHours {
  day: Weekday;
  /** 24-hour HH:MM */
  opens: string;
  /** 24-hour HH:MM */
  closes: string;
}

export interface CitationProfile {
  name: string;
  href: string;
}

export interface Person {
  name: string;
  role: string;
  summary: string;
}

export interface JobOpening {
  id: string;
  title: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}
