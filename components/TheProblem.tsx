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

function ProblemDiagram() {
  return (
    <div style={{ width: "100%", maxWidth: "340px", position: "relative" }}>
      <div style={{
        position: "relative",
        padding: "44px 36px 48px",
        background: "rgba(255,255,255,0.018)",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: "2px",
      }}>
        {/* Corner brackets */}
        <div style={{ position: "absolute", top: "14px", left: "14px", width: "13px", height: "13px", borderTop: "1px solid rgba(201,168,76,0.32)", borderLeft: "1px solid rgba(201,168,76,0.32)" }} />
        <div style={{ position: "absolute", top: "14px", right: "14px", width: "13px", height: "13px", borderTop: "1px solid rgba(201,168,76,0.32)", borderRight: "1px solid rgba(201,168,76,0.32)" }} />
        <div style={{ position: "absolute", bottom: "14px", left: "14px", width: "13px", height: "13px", borderBottom: "1px solid rgba(201,168,76,0.32)", borderLeft: "1px solid rgba(201,168,76,0.32)" }} />
        <div style={{ position: "absolute", bottom: "14px", right: "14px", width: "13px", height: "13px", borderBottom: "1px solid rgba(201,168,76,0.32)", borderRight: "1px solid rgba(201,168,76,0.32)" }} />

        <svg
          viewBox="0 0 230 490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto" }}
        >
          <defs>
            <radialGradient id="pg-brand-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201,168,76,0.18)" />
              <stop offset="100%" stopColor="rgba(201,168,76,0)" />
            </radialGradient>
          </defs>

          {/* ── BRAND NODE ──────────────────── */}
          <circle cx="115" cy="72" r="56" fill="url(#pg-brand-aura)" />
          <circle cx="115" cy="72" r="40" stroke="rgba(201,168,76,0.22)" strokeWidth="0.8" />
          <circle cx="115" cy="72" r="30" stroke="rgba(201,168,76,0.48)" strokeWidth="0.7" fill="rgba(201,168,76,0.06)" />
          <circle cx="115" cy="72" r="4.5" fill="#C9A84C" />
          <text x="115" y="125" textAnchor="middle" fontSize="7.5" fill="rgba(201,168,76,0.65)" letterSpacing="4" fontFamily="Inter,sans-serif" fontWeight="500">
            BRAND
          </text>

          {/* ── SOLID CONNECTOR ─────────────── */}
          <line x1="115" y1="133" x2="115" y2="198" stroke="rgba(201,168,76,0.38)" strokeWidth="0.9" />
          <polyline points="110,191 115,200 120,191" stroke="rgba(201,168,76,0.38)" strokeWidth="0.8" fill="none" />
          <line x1="116" y1="164" x2="128" y2="164" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
          <text x="131" y="167.5" fontSize="6.5" fill="rgba(245,240,232,0.25)" letterSpacing="2" fontFamily="Inter,sans-serif">
            FIRST SALE
          </text>

          {/* ── PRODUCT NODE ────────────────── */}
          <circle cx="115" cy="236" r="30" stroke="rgba(245,240,232,0.30)" strokeWidth="0.8" fill="rgba(245,240,232,0.025)" />
          <rect x="103" y="229" width="24" height="17" rx="2" stroke="rgba(245,240,232,0.45)" strokeWidth="0.9" fill="rgba(245,240,232,0.04)" />
          <path d="M107 229 C107 222 123 222 123 229" stroke="rgba(245,240,232,0.45)" strokeWidth="0.9" />
          <text x="115" y="280" textAnchor="middle" fontSize="7.5" fill="rgba(245,240,232,0.32)" letterSpacing="3.5" fontFamily="Inter,sans-serif" fontWeight="400">
            PRODUCT
          </text>

          {/* ── SHORT LINE ──────────────────── */}
          <line x1="115" y1="288" x2="115" y2="308" stroke="rgba(245,240,232,0.15)" strokeWidth="0.8" />

          {/* ── BREAK INDICATOR ─────────────── */}
          <line x1="90" y1="313" x2="140" y2="313" stroke="rgba(245,240,232,0.07)" strokeWidth="0.5" />
          <line x1="108" y1="308" x2="122" y2="322" stroke="rgba(201,168,76,0.42)" strokeWidth="0.9" />
          <line x1="122" y1="308" x2="108" y2="322" stroke="rgba(201,168,76,0.42)" strokeWidth="0.9" />
          <rect x="72" y="330" width="86" height="17" rx="8.5" fill="rgba(201,168,76,0.045)" stroke="rgba(201,168,76,0.22)" strokeWidth="0.5" />
          <text x="115" y="342.5" textAnchor="middle" fontSize="6.5" fill="rgba(201,168,76,0.48)" letterSpacing="2.5" fontFamily="Inter,sans-serif" fontWeight="500">
            SIGNAL LOST
          </text>

          {/* ── DASHED CONNECTOR ────────────── */}
          <line x1="115" y1="350" x2="115" y2="405" stroke="rgba(245,240,232,0.09)" strokeWidth="0.8" strokeDasharray="3.5 4.5" />

          {/* ── SECONDARY MARKET (ghost) ─────── */}
          <circle cx="115" cy="438" r="30" stroke="rgba(245,240,232,0.06)" strokeWidth="0.7" strokeDasharray="2.5 4" />
          <text x="115" y="434" textAnchor="middle" fontSize="6.5" fill="rgba(245,240,232,0.12)" letterSpacing="1.5" fontFamily="Inter,sans-serif">
            SECONDARY
          </text>
          <text x="115" y="446" textAnchor="middle" fontSize="6.5" fill="rgba(245,240,232,0.12)" letterSpacing="1.5" fontFamily="Inter,sans-serif">
            MARKET
          </text>

          {/* ── VALUE ANNOTATION ────────────── */}
          <text x="185" y="286" fontSize="6" fill="rgba(201,168,76,0.26)" letterSpacing="1" fontFamily="Inter,sans-serif" textAnchor="middle">
            VALUE
          </text>
          <text x="185" y="298" fontSize="8" fill="rgba(201,168,76,0.22)" textAnchor="middle">
            ↑
          </text>
          <text x="185" y="310" fontSize="6" fill="rgba(201,168,76,0.26)" letterSpacing="1" fontFamily="Inter,sans-serif" textAnchor="middle">
            GROWS
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function TheProblem() {
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
      { threshold: 0.12 }
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
      id="problem"
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
      {/* Background watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-1%",
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
        }}
      >
        02
      </div>

      {/* Main grid */}
      <div id="tp-grid" style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1260px", margin: "0 auto", padding: "120px 60px" }}>
        {/* LEFT: Text */}
        <div id="tp-text">
          {/* Section label */}
          <div style={{ ...fade(0), display: "flex", alignItems: "center", gap: "12px", marginBottom: "44px" }}>
            <div style={{ width: "28px", height: "1px", background: G.gold, opacity: 0.5 }} />
            <span style={{
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: G.goldDim,
            }}>
              02 — The Problem
            </span>
          </div>

          {/* Headline 1 — cream */}
          <h2 style={{
            ...fade(0.1),
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "0 0 6px",
            color: G.cream,
          }}>
            Luxury created<br />the value.
          </h2>

          {/* Headline 2 — gold italic */}
          <h2 style={{
            ...fade(0.2),
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
            color: G.gold,
          }}>
            Platforms captured<br />the economics.
          </h2>

          {/* Gold divider */}
          <div style={{
            ...fade(0.28),
            width: "44px",
            height: "1px",
            background: `linear-gradient(to right, ${G.gold}, transparent)`,
            marginBottom: "32px",
          }} />

          {/* Body copy */}
          <p style={{
            ...fade(0.35),
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.82,
            color: G.creamMid,
            maxWidth: "480px",
            margin: "0 0 28px",
          }}>
            Brands invest billions in design, craft, and storytelling to build desirability.
            That desirability doesn&apos;t expire at the point of sale — it compounds.
          </p>

          {/* Left-border statement */}
          <p style={{
            ...fade(0.43),
            fontSize: "14.5px",
            fontWeight: 300,
            lineHeight: 1.82,
            color: G.creamDim,
            maxWidth: "480px",
            margin: "0 0 40px",
            borderLeft: `1.5px solid ${G.goldBorder}`,
            paddingLeft: "20px",
          }}>
            After the first sale, the connection between a brand and its product disappears.
          </p>

          {/* Closing gold statement */}
          <p style={{
            ...fade(0.52),
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
            fontWeight: 400,
            lineHeight: 1.42,
            color: G.gold,
            margin: 0,
          }}>
            The value keeps growing.
            <br />
            <span style={{ color: G.goldBright, fontStyle: "italic" }}>
              Now it can be captured.
            </span>
          </p>
        </div>

        {/* RIGHT: Diagram */}
        <div id="tp-visual" style={{ ...fade(0.2), display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProblemDiagram />
        </div>
      </div>

      <style>{`
        #tp-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 960px) {
          #tp-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          #tp-visual {
            order: -1;
          }
        }
        @media (max-width: 640px) {
          #tp-grid {
            padding: 80px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
