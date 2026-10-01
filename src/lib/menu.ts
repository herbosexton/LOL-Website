import { siteConfig } from "@/config/site";

export function getMenuHref(fallback = "/contact") {
  return siteConfig.hasMenuUrl ? siteConfig.menuUrl : fallback;
}

export function getMenuLabel(defaultLabel = "View Menu") {
  return siteConfig.hasMenuUrl ? defaultLabel : "Menu Coming Soon";
}

export function isExternalMenu() {
  return siteConfig.hasMenuUrl && /^https?:\/\//i.test(siteConfig.menuUrl);
}
