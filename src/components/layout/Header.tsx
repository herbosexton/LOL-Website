"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";
import styles from "./Header.module.css";

const transparentRoutes = new Set([
  "/",
  "/about",
  "/ai-guide",
  "/kulture",
  "/delivery",
  "/news",
  "/contact",
  "/shop",
]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const canBeTransparent = transparentRoutes.has(pathname) || pathname.startsWith("/news/");

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          styles.header,
          canBeTransparent && !scrolled ? styles.transparent : styles.solid,
        )}
      >
        <div className={styles.inner}>
          <nav className={cn(styles.nav, styles.left)} aria-label="Primary left">
            {siteConfig.nav.left.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(styles.link, link.emphasize && styles.shopCta)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className={styles.logo} aria-label="Legacy on Lark home">
            <Image
              src="/images/logo.jpg"
              alt="Legacy on Lark"
              width={84}
              height={84}
              unoptimized
              priority
            />
          </Link>

          <nav className={cn(styles.nav, styles.right)} aria-label="Primary right">
            {siteConfig.nav.right.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(styles.link, link.emphasize && styles.shopCta)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.mobileBar}>
          <Link href="/" className={styles.logo} aria-label="Legacy on Lark home">
            <Image
              src="/images/logo.jpg"
              alt="Legacy on Lark"
              width={64}
              height={64}
              unoptimized
              priority
            />
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
          </button>
        </div>

        <div className={styles.beam} aria-hidden="true" />
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
