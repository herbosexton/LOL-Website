import { siteConfig } from "@/config/site";

const BLAZE_API = "https://ecom-api.blaze.me";
const DEFAULT_STORE_ID = "e32b3c42-fd4a-4a6e-8db0-78dc9c85f924";

export const MENU_CATEGORIES = [
  { slug: "flower", label: "Flower" },
  { slug: "prerolls", label: "Pre-Rolls" },
  { slug: "drinks", label: "Drinks" },
  { slug: "edibles", label: "Edibles" },
  { slug: "vapes", label: "Vapes" },
  { slug: "chocolate", label: "Chocolate" },
  { slug: "tinctures", label: "Tinctures" },
] as const;

export type MenuCategorySlug = (typeof MENU_CATEGORIES)[number]["slug"];

export type MenuProduct = {
  id: string;
  name: string;
  brand: string | null;
  image: string | null;
  flowerType: string | null;
  price: number | null;
  sizeLabel: string | null;
  href: string;
  categorySlug: MenuCategorySlug;
};

export type MenuCategoryGroup = {
  slug: MenuCategorySlug;
  label: string;
  href: string;
  count: number;
  products: MenuProduct[];
};

type BlazeMoney = { amount?: number; currency?: string };
type BlazeAttrs = {
  name?: string;
  main_image?: string | null;
  flower_type?: string | null;
  store_url?: string;
  slug?: string;
  in_stock?: boolean;
  hide_from_menu?: boolean;
  unit_price?: BlazeMoney | null;
  unit_prices?: Array<{
    display_name?: string;
    price?: BlazeMoney;
  }> | null;
  size?: { display_text?: string | null } | null;
};

type BlazeResource = {
  id: string | number;
  type: string;
  attributes?: BlazeAttrs & Record<string, unknown>;
  relationships?: {
    brand?: { data?: { id: string | number; type: string } | null };
  };
};

type BlazeListResponse = {
  data?: BlazeResource[];
  included?: BlazeResource[];
  meta?: { total_count?: number };
};

function getStoreId() {
  return process.env.BLAZE_STORE_ID?.trim() || DEFAULT_STORE_ID;
}

function getMenuBase() {
  return siteConfig.menuUrl.replace(/\/$/, "");
}

export function getCategoryMenuHref(slug: MenuCategorySlug) {
  return `${getMenuBase()}/categories/${slug}/`;
}

function formatPrice(cents: number | null | undefined) {
  if (cents == null || Number.isNaN(cents)) return null;
  return Math.round(cents) / 100;
}

function resolveProductHref(attrs: BlazeAttrs, categorySlug: MenuCategorySlug) {
  if (attrs.store_url) return attrs.store_url;
  if (attrs.slug) {
    return `${getMenuBase()}/products/${attrs.slug}/`;
  }
  return getCategoryMenuHref(categorySlug);
}

function mapProduct(
  item: BlazeResource,
  included: BlazeResource[],
  categorySlug: MenuCategorySlug,
): MenuProduct | null {
  const attrs = item.attributes;
  if (!attrs?.name) return null;
  if (attrs.hide_from_menu) return null;
  if (attrs.in_stock === false) return null;

  const brandId = item.relationships?.brand?.data?.id;
  const brand =
    brandId == null
      ? null
      : (included.find(
          (entry) =>
            String(entry.id) === String(brandId) &&
            (entry.type === "product_brands" || entry.type === "global_brands"),
        )?.attributes?.name as string | undefined) || null;

  const unitCents =
    attrs.unit_price?.amount ??
    attrs.unit_prices?.[0]?.price?.amount ??
    null;

  return {
    id: String(item.id),
    name: attrs.name,
    brand: brand || null,
    image: attrs.main_image || null,
    flowerType: attrs.flower_type || null,
    price: formatPrice(unitCents),
    sizeLabel: attrs.size?.display_text || attrs.unit_prices?.[0]?.display_name || null,
    href: resolveProductHref(attrs, categorySlug),
    categorySlug,
  };
}

async function fetchCategoryProducts(
  slug: MenuCategorySlug,
  limit = 12,
): Promise<{ products: MenuProduct[]; total: number }> {
  const url = new URL(`${BLAZE_API}/api/v1/products/`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("category", slug);
  url.searchParams.set("delivery_type", "pickup");

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.api+json",
      "X-Store": getStoreId(),
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Blaze menu ${slug} failed: ${response.status}`);
  }

  const json = (await response.json()) as BlazeListResponse;
  const included = json.included || [];
  const products = (json.data || [])
    .map((item) => mapProduct(item, included, slug))
    .filter((item): item is MenuProduct => Boolean(item));

  return {
    products,
    total: json.meta?.total_count ?? products.length,
  };
}

export async function getLiveMenuByCategory(
  perCategory = 12,
): Promise<MenuCategoryGroup[]> {
  const results = await Promise.all(
    MENU_CATEGORIES.map(async (category) => {
      try {
        const { products, total } = await fetchCategoryProducts(
          category.slug,
          perCategory,
        );
        return {
          slug: category.slug,
          label: category.label,
          href: getCategoryMenuHref(category.slug),
          count: total,
          products,
        } satisfies MenuCategoryGroup;
      } catch {
        return {
          slug: category.slug,
          label: category.label,
          href: getCategoryMenuHref(category.slug),
          count: 0,
          products: [],
        } satisfies MenuCategoryGroup;
      }
    }),
  );

  return results.filter((group) => group.products.length > 0);
}
