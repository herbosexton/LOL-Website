"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import styles from "./MobileMenu.module.css";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const links = [...siteConfig.nav.left, ...siteConfig.nav.right];

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Menu">
      <div className={styles.top}>
        <Link href="/" onClick={onClose} aria-label="Legacy on Lark home">
          <Image src="/images/logo.jpg" alt="Legacy on Lark" width={48} height={48} unoptimized />
        </Link>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>
      <nav className={styles.nav} aria-label="Mobile">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={link.emphasize ? styles.shopLink : styles.link}
            aria-current={pathname === link.href ? "page" : undefined}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
