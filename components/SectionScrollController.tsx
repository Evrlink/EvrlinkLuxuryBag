"use client";

import { useEffect } from "react";

// Intercepts wheel / keyboard / touch events and snaps to the next or
// previous <section> element.  For sections taller than the viewport the
// user can scroll within them normally; the snap only fires when they
// reach the section boundary.

export default function SectionScrollController() {
  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll("section"));

    let locked = false;
    const LOCK_MS  = 950;   // cooldown after a snap (matches smooth-scroll duration)
    const EDGE_PX  = 10;    // pixels from edge that counts as "at boundary"

    // The section that currently occupies the most viewport area
    const current = (): { el: HTMLElement; idx: number } | null => {
      const all = getSections();
      if (!all.length) return null;
      let bestIdx = 0, bestOverlap = -1;
      all.forEach((sec, i) => {
        const r = sec.getBoundingClientRect();
        const overlap =
          Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
        if (overlap > bestOverlap) { bestOverlap = overlap; bestIdx = i; }
      });
      return { el: all[bestIdx], idx: bestIdx };
    };

    const snapTo = (idx: number) => {
      const all = getSections();
      if (idx < 0 || idx >= all.length) return;
      locked = true;
      all[idx].scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, LOCK_MS);
    };

    // ── Wheel (mouse + trackpad) ─────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (locked) { e.preventDefault(); return; }
      const cur = current();
      if (!cur) return;
      const r = cur.el.getBoundingClientRect();

      if (e.deltaY > 0) {
        // Scrolling DOWN: snap when bottom of current section hits viewport bottom
        if (r.bottom <= window.innerHeight + EDGE_PX) {
          e.preventDefault();
          snapTo(cur.idx + 1);
        }
      } else {
        // Scrolling UP: snap when top of current section hits viewport top
        if (r.top >= -EDGE_PX) {
          e.preventDefault();
          snapTo(cur.idx - 1);
        }
      }
    };

    // ── Keyboard ─────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (locked) return;
      const cur = current();
      if (!cur) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        snapTo(cur.idx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        snapTo(cur.idx - 1);
      }
    };

    // ── Touch (mobile swipe) ─────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return; // ignore micro-swipes
      const cur = current();
      if (!cur) return;
      const r = cur.el.getBoundingClientRect();
      if (delta > 0 && r.bottom <= window.innerHeight + EDGE_PX) {
        snapTo(cur.idx + 1);
      } else if (delta < 0 && r.top >= -EDGE_PX) {
        snapTo(cur.idx - 1);
      }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("keydown",    onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("keydown",    onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return null;
}
