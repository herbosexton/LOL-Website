import Image from "next/image";
import type { MenuProduct } from "@/lib/blaze/menu";
import styles from "./ProductCard.module.css";

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function ProductCard({ product }: { product: MenuProduct }) {
  return (
    <a
      href={product.href}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.media}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 70vw, 220px"
          />
        ) : (
          <div className={styles.placeholder} aria-hidden />
        )}
      </div>
      <div className={styles.body}>
        {product.flowerType ? (
          <span className={styles.type}>{product.flowerType}</span>
        ) : (
          <span className={styles.typeSpacer} aria-hidden />
        )}
        {product.brand ? <p className={styles.brand}>{product.brand}</p> : null}
        <h3 className={styles.name}>{product.name}</h3>
        {product.sizeLabel ? (
          <p className={styles.size}>{product.sizeLabel}</p>
        ) : null}
        <div className={styles.footer}>
          <span className={styles.price}>
            {product.price != null ? formatUsd(product.price) : "View"}
          </span>
          <span className={styles.cta}>Shop</span>
        </div>
      </div>
    </a>
  );
}
