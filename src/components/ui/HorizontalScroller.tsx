"use client";

import { useRef } from "react";
import type { ReactNode, PointerEvent } from "react";
import styles from "./HorizontalScroller.module.css";

export function HorizontalScroller({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    ref.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div className={styles.wrap}>
      <div
        ref={ref}
        className={styles.scroller}
        role="region"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {children}
      </div>
    </div>
  );
}
