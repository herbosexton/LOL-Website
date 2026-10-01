"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { getMenuHref, getMenuLabel, isExternalMenu } from "@/lib/menu";
import { siteConfig } from "@/config/site";
import styles from "./VideoHero.module.css";

export function VideoHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hero = siteConfig.hero;
  const menuHref = getMenuHref();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className={styles.hero} aria-label="Legacy on Lark hero">
      <div className={styles.media} data-parallax="0.18">
        <Image
          src={hero.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.desktopOnly}
        />
        <Image
          src={hero.mobilePoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.mobileOnly}
        />
        {!reducedMotion ? (
          <video
            className={styles.desktopOnly}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.poster}
            onCanPlay={() => setVideoReady(true)}
            style={{ opacity: videoReady ? 1 : 0, transition: "opacity 1.2s ease" }}
            aria-hidden
          >
            <source src={hero.videoWebm} type="video/webm" />
            <source src={hero.videoMp4} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className={styles.overlay} aria-hidden />
      <div className={styles.fade} aria-hidden />
      <div className={styles.content}>
        <p className={`${styles.eyebrowAnim} eyebrow`} style={{ color: "var(--lol-gold)" }}>
          Albany, New York
        </p>
        <h1 className={styles.brand}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.actions}>
          <Button
            href={menuHref}
            external={isExternalMenu()}
            variant="gold"
            onClick={() => trackEvent("shop_menu_click", { location: "hero" })}
          >
            {siteConfig.hasMenuUrl ? hero.primaryCta.label : getMenuLabel("Explore the Menu")}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
      <div className={styles.scrollHint} aria-hidden>
        Discover
        <span />
      </div>
    </section>
  );
}
