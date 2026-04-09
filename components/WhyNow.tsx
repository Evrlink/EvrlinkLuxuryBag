"use client";

import { useEffect, useRef, useState } from "react";

const G = {
  gold: "#C9A84C",
  goldBright: "#E8C96A",
  goldDim: "rgba(201,168,76,0.55)",
  goldBorder: "rgba(201,168,76,0.28)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  creamMid: "rgba(245,240,232,0.72)",
  bg: "#131314",
};

// ─── Convergence diagram ─────────────────────────────────────────────────────

function ConvergeDiagram({ visible }: { visible: boolean }) {
  // line lengths (pre-calculated):
  // line 1 & 3: sqrt((820-130)² + 60²) ≈ 693
  // line 2 (horizontal): 820 - 130 = 690
  const drawn: React.CSSProperties = { transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" };

  return (
    <div style={{ width: "100%", margin: "24px 0 28px", overflow: "hidden" }}>
      <svg
        viewBox="0 0 900 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <radialGradient id="wn-pt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.32)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </radialGradient>
        </defs>

        {/* ── Labels ── */}
        <text x="8" y="24"  fontSize="7.5" fill="rgba(201,168,76,0.50)" letterSpacing="2.5" fontFamily="Inter,sans-serif" fontWeight="500">MARKET</text>
        <text x="8" y="84"  fontSize="7.5" fill="rgba(201,168,76,0.50)" letterSpacing="2.5" fontFamily="Inter,sans-serif" fontWeight="500">REGULATION</text>
        <text x="8" y="144" fontSize="7.5" fill="rgba(201,168,76,0.50)" letterSpacing="2.5" fontFamily="Inter,sans-serif" fontWeight="500">INFRASTRUCTURE</text>

        {/* ── Converging lines ── */}
        <line
          x1="130" y1="20" x2="820" y2="80"
          stroke="rgba(201,168,76,0.38)" strokeWidth="0.8"
          strokeDasharray="693"
          strokeDashoffset={visible ? 0 : 693}
          style={{ ...drawn, transitionDelay: "0.2s" }}
        />
        <line
          x1="130" y1="80" x2="820" y2="80"
          stroke="rgba(201,168,76,0.55)" strokeWidth="0.9"
          strokeDasharray="690"
          strokeDashoffset={visible ? 0 : 690}
          style={{ ...drawn, transitionDelay: "0.4s" }}
        />
        <line
          x1="130" y1="140" x2="820" y2="80"
          stroke="rgba(201,168,76,0.38)" strokeWidth="0.8"
          strokeDasharray="693"
          strokeDashoffset={visible ? 0 : 693}
          style={{ ...drawn, transitionDelay: "0.2s" }}
        />

        {/* ── Convergence point ── */}
        <circle cx="820" cy="80" r="30"
          fill="url(#wn-pt-glow)"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 1.8s" }}
        />
        <circle cx="820" cy="80" r="10"
          stroke="rgba(201,168,76,0.3)" strokeWidth="0.7" fill="none"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 1.8s" }}
        />
        <circle cx="820" cy="80" r="4.5"
          fill="#C9A84C"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 1.8s" }}
        />

        {/* ── "2026" label ── */}
        <text
          x="838" y="76"
          fontSize="8" fill="rgba(201,168,76,0.65)" letterSpacing="1.5"
          fontFamily="Inter,sans-serif" fontWeight="500"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 2.0s" }}
        >
          2026
        </text>
      </svg>
    </div>
  );
}

// ─── Forces data ─────────────────────────────────────────────────────────────

const forces = [
  {
    title: "Resale is outpacing primary.",
    body: "Resale is outpacing primary luxury — structurally, not cyclically. The secondary market is the new primary growth driver for luxury value, and it compounds with every passing year.",
  },
  {
    title: "Regulation is accelerating.",
    body: "EU regulation mandates item-level provenance by 2030. Digital Product Passports are no longer optional — they are compliance. Brands that build now lead. Brands that wait, scramble.",
  },
  {
    title: "The infrastructure is ready.",
    body: "The infrastructure to capture lifecycle value at scale finally exists. Invisible microchips, verifiable identity, and digital ownership records — all converging now, for the first time.",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────

export default function WhyNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="why-now"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        flexShrink: 0,
        background: G.bg,
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.09)",
      }}
    >
      {/* Background watermark — left side (alternates from right) */}
      <div aria-hidden style={{
        position: "absolute",
        left: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(16rem, 30vw, 28rem)",
        fontWeight: 700,
        fontFamily: "var(--font-cormorant), Georgia, serif",
        color: "rgba(201,168,76,0.026)",
        letterSpacing: "-0.05em",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>
        04
      </div>

      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "1260px",
        margin: "0 auto",
        padding: "60px 60px 48px",
      }}>

        {/* Section label */}
        <div style={{ ...fade(0), display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div style={{ width: "28px", height: "1px", background: G.gold, opacity: 0.5 }} />
          <span style={{
            fontSize: "9.5px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: G.goldDim,
          }}>
            04 — Why Now
          </span>
        </div>

        {/* Opening — two headline lines */}
        <h2 style={{
          ...fade(0.1),
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
          fontWeight: 300,
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
          color: G.cream,
          margin: "0 0 6px",
        }}>
          Three forces made this possible.
        </h2>
        <h2 style={{
          ...fade(0.2),
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: G.gold,
          margin: 0,
        }}>
          All three converged in 2026.
        </h2>

        {/* Convergence diagram */}
        <div style={{ ...fade(0.28) }}>
          <ConvergeDiagram visible={visible} />
        </div>

        {/* Three forces */}
        {forces.map((force, i) => (
          <div key={i} style={{ ...fade(0.36 + i * 0.13) }}>
            {/* Gold rule */}
            <div style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(201,168,76,0.48), rgba(201,168,76,0.08) 72%, transparent)",
              marginBottom: "16px",
            }} />

            {/* Two-column row */}
            <div className="wn-force-row">
              <h3 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: G.cream,
                margin: 0,
              }}>
                {force.title}
              </h3>
              <p style={{
                fontSize: "13.5px",
                fontWeight: 300,
                lineHeight: 1.65,
                color: G.creamDim,
                margin: 0,
                alignSelf: "center",
              }}>
                {force.body}
              </p>
            </div>

            <div style={{ height: "20px" }} />
          </div>
        ))}

        {/* Final rule */}
        <div style={{
          ...fade(0.7),
          height: "1px",
          background: "linear-gradient(to right, rgba(201,168,76,0.48), rgba(201,168,76,0.08) 72%, transparent)",
          marginBottom: "28px",
        }} />

        {/* Closing epitaph */}
        <div style={{
          ...fade(0.8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          textAlign: "center",
        }}>
          {/* Line 1 flanked by gold rules */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "28px", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{
              width: "72px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "0.01em",
              color: G.cream,
            }}>
              The window is open.
            </span>
            <div style={{
              width: "72px",
              height: "1px",
              background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))",
              flexShrink: 0,
            }} />
          </div>

          {/* Line 2 — gold */}
          <span style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "0.01em",
              color: G.goldBright,
          }}>
            The infrastructure is here.
          </span>
        </div>
      </div>

      <style>{`
        .wn-force-row {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 60px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .wn-force-row {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
