"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import styles from "./AgeGate.module.css";

type GateState = "unknown" | "required" | "passed";

const listeners = new Set<() => void>();

function emitAgeGateChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isVerified() {
  try {
    const raw = localStorage.getItem(siteConfig.ageGate.storageKey);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { expiresAt: number };
    return typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function getClientSnapshot(): GateState {
  return isVerified() ? "passed" : "required";
}

function getServerSnapshot(): GateState {
  return "unknown";
}

function persistVerification() {
  const expiresAt =
    Date.now() + siteConfig.ageGate.durationDays * 24 * 60 * 60 * 1000;
  localStorage.setItem(
    siteConfig.ageGate.storageKey,
    JSON.stringify({ expiresAt }),
  );
  emitAgeGateChange();
}

export function AgeGate() {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state !== "required") return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [state]);

  // Never block SSR/content with a spinner. Only overlay after client snapshot is known.
  if (state !== "required") {
    return <div className={styles.hidden} aria-hidden />;
  }

  return (
    <div className={styles.gate} role="presentation">
      <div
        ref={dialogRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <Image
          src="/images/logo.jpg"
          alt="Legacy on Lark"
          width={96}
          height={96}
          className={styles.logo}
          unoptimized
          priority
        />
        <h2 id={titleId} className={styles.title}>
          Welcome to Legacy on Lark
        </h2>
        <p className={styles.copy}>You must be 21 or older to enter.</p>
        <div className={styles.actions}>
          <Button
            variant="gold"
            fullWidth
            onClick={() => {
              persistVerification();
            }}
          >
            I&apos;m 21+
          </Button>
          <Button href={siteConfig.ageGate.exitUrl} external variant="secondary" fullWidth>
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
