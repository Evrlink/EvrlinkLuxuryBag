"use client";

import { useEffect, useRef, useState } from "react";

const G = {
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.55)",
  goldBorder: "rgba(201,168,76,0.28)",
  goldBg: "rgba(201,168,76,0.08)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  creamMid: "rgba(245,240,232,0.70)",
  bg: "#131314",
};

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        flexShrink: 0,
        background: G.bg,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.09)",
      }}
    >
      {/* Grain layer */}
      <div className="cs-grain" style={{
        position: "absolute", inset: "-50%",
        width: "200%", height: "200%",
        backgroundImage: NOISE_URI,
        backgroundRepeat: "repeat", backgroundSize: "160px 160px",
        opacity: 0.036, pointerEvents: "none", zIndex: 1,
      }} />

      {/* Warm left-side glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 70% at 20% 50%, rgba(201,168,76,0.05), transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Edge darkening */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(8,8,8,0.6) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Content grid */}
      <div id="" style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: "1260px",
        margin: "0 auto", padding: "100px 60px",
      }}>

        {/* ── LEFT: Vision statement ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* Section label */}
          <div style={{ ...fade(0), display: "flex", alignItems: "center", gap: "12px", marginBottom: "35px" }}>
            {/* <div style={{ width: "28px", height: "1px", background: G.gold, opacity: 0.5 }} /> */}
            <span style={{
              fontSize: "18px", fontWeight: 500,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: G.goldDim,
            }}>
              Vision
            </span>
          </div>

          {/* Large left-aligned headline — three short lines */}
          <h2 style={{
            ...fade(0.1),
            // fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "clamp(1.7rem, 4.5vw, 2.5rem)",
            fontWeight: 300,
            // lineHeight: 1.04,
            letterSpacing: "2.5px",
            lineHeight: "1.3",
            color: G.gold,
            margin: "0 0 10px",
          }}>
           Generate lifetime revenue for brands
          </h2>
          <h2 style={{
            ...fade(0.18),
            // fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "clamp(1.7rem, 4.5vw, 2.5rem)",
            fontWeight: 300,
            // lineHeight: 1.04,
            letterSpacing: "2.5px",
            lineHeight: "1.3",
            color: G.cream,
            margin: "0 0 35px",
          }}>
           Create trust and verification for consumers
          </h2>
          {/* <h2 style={{
            ...fade(0.26),
            // fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "clamp(1.7rem, 4.5vw, 2.5rem)",
            fontWeight: 400,
            // fontStyle: "italic",
            // lineHeight: 1.04,
            letterSpacing: "2.5px",
            lineHeight: "1.3",
            color: G.gold,
            margin: "0 0 48px",
          }}>
            lifetime revenue
          </h2> */}

          {/* Gold divider */}
          {/* <div style={{
            ...fade(0.32),
            width: "44px", height: "1px",
            background: `linear-gradient(to right, ${G.gold}, transparent)`,
            marginBottom: "28px",
          }} /> */}

          {/* Three-word descriptor */}
          <div style={{
            ...fade(0.38),
            display: "flex", alignItems: "center", gap: "14px",
            marginBottom: "28px", flexWrap: "wrap",
          }}>
            {(["Verified", "Protected", "Compounding value"] as const).map((word, i) => (
              <div key={word} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{
                  fontSize: "13px", fontWeight: 400,
                  letterSpacing: "2.5px", textTransform: "uppercase",
                  color: G.creamMid,
                }}>{word}</span>
                {i < 2 && (
                  <span style={{
                    width: "3px", height: "3px", borderRadius: "50%",
                    background: G.gold, opacity: 0.45,
                    display: "inline-block", flexShrink: 0,
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Tagline */}
          {/* <p style={{
            ...fade(0.44),
            fontSize: "18px", fontWeight: 300,
            lineHeight: 1.8, color: G.creamDim,
            letterSpacing: "2.5px",
            // maxWidth: "420px", margin: 0,
            // fontStyle: "italic",
          }}>
            The standard infrastructure the industry has been missing
          </p> */}
        </div>

        {/* ── RIGHT: CTA card ────────────────────────────────────────── */}
        {/* <div style={{ ...fade(0.2), display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            width: "100%", maxWidth: "400px",
            padding: "52px 44px 52px",
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(201,168,76,0.14)",
            borderRadius: "2px",
          }}>
            
            <div style={{ position: "absolute", top: "16px", left: "16px",   width: "14px", height: "14px", borderTop: `1px solid rgba(201,168,76,0.4)`, borderLeft:  `1px solid rgba(201,168,76,0.4)` }} />
            <div style={{ position: "absolute", top: "16px", right: "16px",  width: "14px", height: "14px", borderTop: `1px solid rgba(201,168,76,0.4)`, borderRight: `1px solid rgba(201,168,76,0.4)` }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px",  width: "14px", height: "14px", borderBottom: `1px solid rgba(201,168,76,0.4)`, borderLeft:  `1px solid rgba(201,168,76,0.4)` }} />
            <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "14px", height: "14px", borderBottom: `1px solid rgba(201,168,76,0.4)`, borderRight: `1px solid rgba(201,168,76,0.4)` }} />

           
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "32px",
            }}>
              <span style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: G.gold, display: "inline-block",
                boxShadow: `0 0 6px ${G.gold}`, flexShrink: 0,
              }} />
              <span style={{
                fontSize: "18px", fontWeight: 500,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: G.goldDim,
              }}>
                Early Access — 2026
              </span>
            </div>

            <p style={{
              fontSize: "16px", fontWeight: 300,
              lineHeight: 1.82, color: G.creamMid,
              margin: "0 0 36px",
            }}>
              We&apos;re building with a select group of luxury brands and partners in 2026
            </p>


            <div style={{
              height: "1px",
              background: `linear-gradient(to right, ${G.goldBorder}, transparent)`,
              marginBottom: "36px",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                onClick={() => openContact("early-access")}
                className="rim-btn rim-btn--primary rim-btn--closing"
                style={{
                  fontSize: "18px",
                  letterSpacing: "2.5px",
                }}
              >
                Get Early Access
              </button>

              
            </div>
          </div>
        </div> */}
      </div>

      <style>{`
        #cs-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 960px) {
          #cs-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
        @media (max-width: 640px) {
          #cs-grid { padding: 80px 28px !important; }
        }
        @keyframes cs-grain {
          0%   { transform: translate(0,    0);   }
          12%  { transform: translate(-1px,  1px); }
          25%  { transform: translate( 1px, -1px); }
          37%  { transform: translate(-1px, -1px); }
          50%  { transform: translate( 1px,  1px); }
          62%  { transform: translate( 0,   -1px); }
          75%  { transform: translate(-1px,   0);  }
          87%  { transform: translate( 1px,   0);  }
          100% { transform: translate( 0,    1px); }
        }
        .cs-grain { animation: cs-grain 0.4s steps(1) infinite; }
      `}</style>
    </section>
  );
}
