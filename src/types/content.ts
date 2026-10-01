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

export interface StoreHours {
  label: string;
  value: string;
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
