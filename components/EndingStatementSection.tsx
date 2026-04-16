"use client";

import { useEffect, useRef, useState } from "react";

const G = {
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.55)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  bg: "#131314",
};

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function EndingStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="ending"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "76vh",
        flexShrink: 0,
        background: G.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.09)",
      }}
    >
      <div
        className="ending-grain"
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: NOISE_URI,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(201,168,76,0.08), rgba(201,168,76,0.01) 55%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 100% at 50% 55%, transparent 50%, rgba(8,8,8,0.72) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "100px 28px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <span
          style={{
            ...fade(0),
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: G.goldDim,
            marginBottom: "24px",
          }}
        >
          Ending statement
        </span> */}

        <h2
          style={{
            ...fade(0.08),
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 300,
            letterSpacing: "2.5px",
            lineHeight: 1.3,
            color: G.cream,
            margin: "0 0 14px",
          }}
        >
    <span style={{ color: G.gold }}>
    All Your Bags Belong To You        
    </span>
    </h2>

        {/* <h3
          style={{
            ...fade(0.16),
            fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
            fontWeight: 300,
            letterSpacing: "2.5px",
            lineHeight: 1.3,
            color: G.gold,
            margin: "0 0 30px",
          }}
        >
          with Evrlink, ownership becomes a lifetime revenue system
        </h3> */}

        {/* <p
          style={{
            ...fade(0.22),
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "0.02em",
            color: G.creamDim,
            margin: "0 0 30px",
            maxWidth: "720px",
          }}
        >
          Every authentic transfer strengthens trust, visibility, and long-term value for brands
          and consumers alike.
        </p> */}

        <div
          style={{
            ...fade(0.3),
            width: "120px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent 0%, rgba(201,168,76,0.65) 50%, transparent 100%)",
            marginBottom: "22px",
          }}
        />

        {/* <a
          href="#"
          className="rim-btn rim-btn--secondary rim-btn--compact"
          style={{
            ...fade(0.35),
            fontSize: "14px",
            letterSpacing: "2.5px",
          }}
        >
          Back to top
        </a> */}
      </div>

      <style>{`
        @keyframes ending-grain {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(1px, -1px); }
          50%  { transform: translate(-1px, 1px); }
          75%  { transform: translate(1px, 1px); }
          100% { transform: translate(0, -1px); }
        }
        .ending-grain {
          animation: ending-grain 0.45s steps(1) infinite;
        }
      `}</style>
    </section>
  );
}
