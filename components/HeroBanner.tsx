"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const G = {
  gold: "#C9A84C",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  bg: "#131314",
};

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const smoothRef = useRef({ x: 50, y: 42 });
  const targetRef = useRef({ x: 50, y: 42 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      targetRef.current.x = ((e.clientX - r.left) / r.width) * 100;
      targetRef.current.y = ((e.clientY - r.top) / r.height) * 100;
    };

    const onLeave = () => {
      targetRef.current.x = 50;
      targetRef.current.y = 42;
    };

    let frame = 0;
    const tick = () => {
      const s = smoothRef.current;
      const t = targetRef.current;
      s.x += (t.x - s.x) * 0.06;
      s.y += (t.y - s.y) * 0.06;
      section.style.setProperty("--spot-x", `${s.x}%`);
      section.style.setProperty("--spot-y", `${s.y}%`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={
        {
          position: "relative",
          width: "100%",
          height: "100vh",
          flexShrink: 0,
          overflow: "hidden",
          background: G.bg,
          "--spot-x": "50%",
          "--spot-y": "42%",
        } as CSSProperties
      }
    >
      {/* Spotlight field — replaces WebGL smoke + animated blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 72% 58% at var(--spot-x) var(--spot-y),
              rgba(26, 58, 107, 0.52) 0%,
              rgba(11, 29, 69, 0.22) 38%,
              transparent 62%),
            radial-gradient(ellipse 36% 30% at var(--spot-x) var(--spot-y),
              rgba(201, 168, 76, 0.22) 0%,
              transparent 58%),
            radial-gradient(ellipse 120% 90% at 50% 45%,
              rgba(26, 58, 107, 0.1) 0%,
              transparent 52%),
            #131314
          `,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 85% 78% at 50% 50%, transparent 18%, rgba(19,19,20,0.5) 58%, #131314 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          zIndex: 10,
          width: "100%",
          maxWidth: "980px",
        }}
      >
        <h1
          style={{
            // fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "clamp(3rem, 6.5vw, 5rem)",
            fontWeight: 400,
            // lineHeight: 1.06,
            // letterSpacing: "-0.02em",
            color: G.cream,
            margin: "0 0 15px",
            animation: "heroFadeUp 1.1s ease 0.4s both",
            letterSpacing: "2.5px",
            lineHeight: "1.3",
          }}
        >
          Every luxury item
          <br />
          generates lifetime value
        </h1>

        <h2
          style={{
            // fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "clamp(2rem, 4.5vw, 2.7rem)",
            fontWeight: 400,
            // fontStyle: "italic",
            lineHeight: 1.12,
              letterSpacing: "2.5px",
            color: G.gold,
            margin: "0 0 48px",
            animation: "heroFadeUp 1.1s ease 0.58s both",
          }}
        >
          Luxury brands don&apos;t see any of it
        </h2>

        {/* <p
          style={{
            fontSize: "18px",
            fontWeight: 400,
            color: G.creamDim,
            maxWidth: "750px",
            lineHeight: 1.85,
            margin: "0 0 44px",
            animation: "heroFadeUp 1s ease 0.85s both",
          }}
        >
          Evrlink is the infrastructure that connects luxury brands to the lifetime value of their
          products
        </p> */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "heroFadeUp 1s ease 1s both",
          }}
        >
          <a href="#contact" className="rim-btn rim-btn--primary"
          style={{
            fontSize: "16px",
            letterSpacing: "2.5px",
          }}
          >
            Get Early Access
          </a>

          {/* <a href="#problem" className="rim-btn rim-btn--secondary"
          style={{
            fontSize: "16px",
          }}
          >
            Learn More
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a> */}
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
