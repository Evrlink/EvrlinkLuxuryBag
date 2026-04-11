"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = dotRef.current;
    if (!el) return;

    el.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cursor-dot"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 8,
        height: 8,
        margin: 0,
        borderRadius: "50%",
        background: "rgba(201, 168, 76, 0.9)",
        boxShadow: "0 0 16px rgba(201, 168, 76, 0.55), 0 0 4px rgba(255, 255, 255, 0.35)",
        pointerEvents: "none",
        zIndex: 160,
        opacity: 0,
        willChange: "transform",
      }}
    />
  );
}
