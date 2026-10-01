"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import type { MenuCategoryGroup } from "@/lib/blaze/menu";
import { ProductCard } from "./ProductCard";
import styles from "./CategoryMosaic.module.css";

export function LiveMenuBrowser({ categories }: { categories: MenuCategoryGroup[] }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const active = categories.find((category) => category.slug === activeSlug) || categories[0];

  if (!active) return null;

  return (
    <div className={styles.live}>
      <div className={styles.tabs} role="tablist" aria-label="Menu categories">
        {categories.map((category) => {
          const selected = category.slug === active.slug;
          return (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              className={selected ? styles.tabActive : styles.tab}
              onClick={() => setActiveSlug(category.slug)}
            >
              {category.label}
              <span className={styles.count}>{category.count}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={`${active.label} products`} className={styles.panel}>
        <HorizontalScroller label={`${active.label} products`} align="start">
          {active.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalScroller>
      </div>

      <div className={styles.actions}>
        <Button href={active.href} external variant="primary">
          Shop all {active.label}
        </Button>
      </div>
    </div>
  );
}
