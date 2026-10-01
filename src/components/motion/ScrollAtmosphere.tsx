"use client";

import { useEffect } from "react";

/**
 * Lightweight scroll atmosphere inspired by premium product sites:
 * - parallax layers via data-parallax
 * - header scroll class on documentElement
 * Respects prefers-reduced-motion.
 */
export function ScrollAtmosphere() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const parallaxNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${y}`);

      for (const node of parallaxNodes) {
        const speed = Number(node.dataset.parallax || 0.15);
        const rect = node.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
