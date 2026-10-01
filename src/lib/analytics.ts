export type AnalyticsEvent =
  | "shop_menu_click"
  | "delivery_order_click"
  | "directions_click"
  | "phone_click"
  | "contact_submit"
  | "careers_submit"
  | "ai_guide_start"
  | "kulture_view";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getGaId() {
  return process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  if (!getGaId() || typeof window.gtag !== "function") return;

  // Never send personally sensitive information.
  window.gtag("event", event, params);
}
