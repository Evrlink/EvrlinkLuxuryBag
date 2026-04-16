"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";

const G = {
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.55)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  creamMid: "rgba(245,240,232,0.70)",
  bg: "#131314",
};

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ContactSection() {
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
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(100vh, 920px)",
        flexShrink: 0,
        background: G.bg,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.09)",
      }}
    >
      <div
        className="cs-grain"
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: NOISE_URI,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
          opacity: 0.036,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 70% at 80% 40%, rgba(201,168,76,0.05), transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(8,8,8,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        id="contact-grid"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1260px",
          margin: "0 auto",
          padding: "100px 60px",
        }}
      >
        

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="contact-split"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ ...fade(0), display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: G.goldDim,
              marginBottom: "35px",
            }}
          >
            Early access
          </span>
        </div>
            <h2
              style={{
                ...fade(0.08),
                fontSize: "clamp(1.7rem, 4.5vw, 2.5rem)",
                fontWeight: 300,
                letterSpacing: "2.5px",
                lineHeight: "1.3",
                color: G.gold,
                margin: "0 0 10px",
              }}
            >
              Build with us in 2026
            </h2>
            <h2
              style={{
                ...fade(0.14),
                fontSize: "clamp(1.7rem, 4.5vw, 2.5rem)",
                fontWeight: 300,
                letterSpacing: "2.5px",
                lineHeight: "1.3",
                color: G.cream,
                margin: "0 0 28px",
              }}
            >
              Share a note and we&apos;ll follow up directly
            </h2>
            {/* <p
              style={{
                ...fade(0.22),
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: 1.75,
                letterSpacing: "0.02em",
                color: G.creamDim,
                margin: 0,
                maxWidth: "440px",
              }}
            >
              We&apos;re onboarding a select group of luxury brands and partners. Tell us who you are
              and what you&apos;re exploring around early access.
            </p> */}
            {/* <div
              style={{
                ...fade(0.3),
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "28px",
                flexWrap: "wrap",
              }}
            >
              {(["Verified", "Protected", "Partnership"] as const).map((word, i) => (
                <div key={word} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: G.creamMid,
                    }}
                  >
                    {word}
                  </span>
                  {i < 2 && (
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        background: G.gold,
                        opacity: 0.45,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div> */}
          </div>

          <div style={fade(0.12)}>
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .contact-split {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          #contact-grid { padding: 80px 28px !important; }
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
