"use client";

import { useEffect, useRef, useState } from "react";

const G = {
  gold: "#C9A84C",
  goldBright: "#E8C96A",
  goldDim: "rgba(201,168,76,0.55)",
  goldBorder: "rgba(201,168,76,0.28)",
  goldBg: "rgba(201,168,76,0.07)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  creamMid: "rgba(245,240,232,0.72)",
  bg: "#131314",
};

// ─── Flowing lines visual ────────────────────────────────────────────────────

function FlowingLines() {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "88px",
      overflow: "hidden",
      margin: "60px 0 68px",
    }}>
      {/* Static rail lines */}
      <div style={{ position: "absolute", top: "14px",  left: 0, right: 0, height: "0.5px", background: "rgba(201,168,76,0.10)" }} />
      <div style={{ position: "absolute", top: "34px",  left: 0, right: 0, height: "0.4px", background: "rgba(245,240,232,0.05)" }} />
      <div style={{ position: "absolute", top: "54px",  left: 0, right: 0, height: "0.5px", background: "rgba(201,168,76,0.08)" }} />
      <div style={{ position: "absolute", top: "74px",  left: 0, right: 0, height: "0.4px", background: "rgba(245,240,232,0.04)" }} />

      {/* Traveling particles — rail 1 */}
      <div className="ts-fp ts-fp1" style={{ top: "11px",  height: "6px", width: "120px", borderRadius: "3px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.88), transparent)" }} />
      <div className="ts-fp ts-fp2" style={{ top: "11px",  height: "6px", width: "80px",  borderRadius: "3px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.65), transparent)" }} />

      {/* Traveling particles — rail 3 */}
      <div className="ts-fp ts-fp3" style={{ top: "51px",  height: "6px", width: "110px", borderRadius: "3px",
        background: "linear-gradient(to right, transparent, rgba(232,201,106,0.78), transparent)" }} />
      <div className="ts-fp ts-fp4" style={{ top: "51px",  height: "6px", width: "90px",  borderRadius: "3px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.58), transparent)" }} />

      {/* Traveling particles — rail 2 */}
      <div className="ts-fp ts-fp5" style={{ top: "31px",  height: "5px", width: "70px",  borderRadius: "2.5px",
        background: "linear-gradient(to right, transparent, rgba(245,240,232,0.30), transparent)" }} />

      {/* Traveling particles — rail 4 */}
      <div className="ts-fp ts-fp6" style={{ top: "71px",  height: "5px", width: "60px",  borderRadius: "2.5px",
        background: "linear-gradient(to right, transparent, rgba(245,240,232,0.22), transparent)" }} />

      <style>{`
        .ts-fp { position: absolute; left: 0; }
        @keyframes ts-fl-travel {
          from { transform: translateX(-200px); }
          to   { transform: translateX(1600px); }
        }
        .ts-fp1 { animation: ts-fl-travel 4.5s linear 0s    infinite; }
        .ts-fp2 { animation: ts-fl-travel 4.5s linear 2.2s  infinite; }
        .ts-fp3 { animation: ts-fl-travel 5.5s linear 0.6s  infinite; }
        .ts-fp4 { animation: ts-fl-travel 5.5s linear 3.0s  infinite; }
        .ts-fp5 { animation: ts-fl-travel 7.0s linear 1.4s  infinite; }
        .ts-fp6 { animation: ts-fl-travel 7.0s linear 4.0s  infinite; }
      `}</style>
    </div>
  );
}

// ─── Stage card ──────────────────────────────────────────────────────────────

const stages = [
  {
    num: "01",
    title: "At First Sale",
    body: "A permanent identity is issued and bound to the item.",
  },
  {
    num: "02",
    title: "At Every Transfer",
    body: "Authenticity is confirmed. Ownership transfers. The record is updated.",
  },
  {
    num: "03",
    title: "For the Brand",
    body: "Full visibility into your product's lifecycle. Recurring revenue on every transfer. Your brand — protected, permanent, and compounding.",
  },
];

function StageCard({
  num, title, body, delay, visible,
}: {
  num: string; title: string; body: string; delay: number; visible: boolean;
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s,
                     background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease`,
        position: "relative",
        padding: "36px 32px 40px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(245,240,232,0.07)",
        borderRadius: "2px",
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "rgba(201,168,76,0.04)";
        el.style.borderColor = "rgba(201,168,76,0.28)";
        el.style.boxShadow = "0 0 40px rgba(201,168,76,0.06)";
        const bar = el.querySelector(".ts-card-bar") as HTMLElement | null;
        if (bar) bar.style.background = `linear-gradient(to right, transparent, rgba(201,168,76,0.7), transparent)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "rgba(255,255,255,0.02)";
        el.style.borderColor = "rgba(245,240,232,0.07)";
        el.style.boxShadow = "none";
        const bar = el.querySelector(".ts-card-bar") as HTMLElement | null;
        if (bar) bar.style.background = `linear-gradient(to right, transparent, rgba(201,168,76,0.35), transparent)`;
      }}
    >
      {/* Top accent line */}
      <div
        className="ts-card-bar"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(to right, transparent, rgba(201,168,76,0.35), transparent)`,
          transition: "background 0.4s ease",
        }}
      />

      {/* Connector dot */}
      <div style={{
        position: "absolute",
        top: "-4px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: G.gold,
        boxShadow: `0 0 8px rgba(201,168,76,0.55)`,
      }} />

      {/* Number */}
      <div style={{
        fontSize: "8.5px",
        fontWeight: 500,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: G.goldDim,
        marginBottom: "24px",
      }}>
        {num}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
        fontWeight: 300,
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        color: G.cream,
        margin: "0 0 18px",
      }}>
        {title}
      </h3>

      {/* Short divider */}
      <div style={{
        width: "28px",
        height: "1px",
        background: `linear-gradient(to right, ${G.gold}, transparent)`,
        marginBottom: "18px",
        opacity: 0.5,
      }} />

      {/* Body */}
      <p style={{
        fontSize: "14px",
        fontWeight: 300,
        lineHeight: 1.82,
        color: G.creamDim,
        margin: 0,
      }}>
        {body}
      </p>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

export default function TheSolution() {
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
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="solution"
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
      <div aria-hidden style={{
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
      }}>
        03
      </div>

      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "1260px",
        margin: "0 auto",
        padding: "120px 60px",
      }}>

        {/* Label row */}
        <div style={{
          ...fade(0),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "52px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "28px", height: "1px", background: G.gold, opacity: 0.5 }} />
            <span style={{
              fontSize: "9.5px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: G.goldDim,
            }}>
              03 — The Solution
            </span>
          </div>

          {/* EU DPP compliance badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            border: `1px solid ${G.goldBorder}`,
            background: G.goldBg,
            backdropFilter: "blur(8px)",
          }}>
            <span style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: G.gold,
              display: "inline-block",
              boxShadow: `0 0 5px ${G.gold}`,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: G.goldDim,
              whiteSpace: "nowrap",
            }}>
              EU Digital Product Passport · Compliant by 2030
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 style={{
          ...fade(0.1),
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
          fontWeight: 300,
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          color: G.cream,
          margin: "0 0 28px",
          maxWidth: "900px",
        }}>
          Every item. A permanent identity and history.
        </h2>

        {/* Subtitle */}
        <p style={{
          ...fade(0.2),
          fontSize: "15px",
          fontWeight: 300,
          lineHeight: 1.82,
          color: G.creamMid,
          maxWidth: "620px",
          margin: 0,
        }}>
          Evrlink gives each luxury product a permanent digital identity — issued at first sale,
          traveling with the item for its entire lifetime, and compliant with EU Digital Product
          Passport requirements mandatory by 2030.
        </p>

        {/* Flowing lines */}
        <div style={{ ...fade(0.28) }}>
          <FlowingLines />
        </div>

        {/* Connecting rail above cards */}
        <div style={{
          ...fade(0.32),
          position: "relative",
          height: "1px",
          background: `linear-gradient(to right, transparent, rgba(201,168,76,0.22) 15%, rgba(201,168,76,0.22) 85%, transparent)`,
          marginBottom: "0",
          zIndex: 1,
        }} />

        {/* Stage cards */}
        <div id="ts-cards">
          {stages.map((stage, i) => (
            <StageCard
              key={stage.num}
              {...stage}
              delay={0.38 + i * 0.1}
              visible={visible}
            />
          ))}
        </div>
      </div>

      <style>{`
        #ts-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) {
          #ts-cards { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          #ts-cards { gap: 14px; }
        }
      `}</style>
    </section>
  );
}
