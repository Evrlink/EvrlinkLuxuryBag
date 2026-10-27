"use client";

import { useEffect, useRef } from "react";

export default function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const grainSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0.42 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const ambient = ambientRef.current;
    if (!section || !ambient) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const smooth = { x: 50, y: 38 };
    const target = { x: 50, y: 38 };
    let presence = 0;
    let targetPresence = 0;
    let frame = 0;
    let running = false;

    const allowed = () => finePointer.matches && !reduceMotion.matches;

    const paint = () => {
      ambient.style.opacity = presence < 0.004 ? "0" : presence.toFixed(3);
      ambient.style.setProperty("--ambient-x", `${smooth.x.toFixed(2)}%`);
      ambient.style.setProperty("--ambient-y", `${smooth.y.toFixed(2)}%`);
    };

    const tick = () => {
      smooth.x += (target.x - smooth.x) * 0.035;
      smooth.y += (target.y - smooth.y) * 0.035;
      presence += (targetPresence - presence) * 0.03;

      const settled =
        Math.abs(target.x - smooth.x) < 0.04 &&
        Math.abs(target.y - smooth.y) < 0.04 &&
        Math.abs(targetPresence - presence) < 0.004;

      paint();

      if (settled) {
        running = false;
        if (presence < 0.004) {
          presence = 0;
          ambient.style.opacity = "0";
        }
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      if (!allowed()) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.width < 1 || bounds.height < 1) return;
      target.x = ((event.clientX - bounds.left) / bounds.width) * 100;
      target.y = ((event.clientY - bounds.top) / bounds.height) * 100;
      targetPresence = 1;
      start();
    };

    const onLeave = () => {
      targetPresence = 0;
      start();
    };

    const onPreference = () => {
      if (allowed()) return;
      targetPresence = 0;
      presence = 0;
      cancelAnimationFrame(frame);
      running = false;
      ambient.style.opacity = "0";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    finePointer.addEventListener("change", onPreference);
    reduceMotion.addEventListener("change", onPreference);

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      finePointer.removeEventListener("change", onPreference);
      reduceMotion.removeEventListener("change", onPreference);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "192px 0 120px",
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, #3a3a3a 0%, transparent 55%), #2a2a2a",
        color: "#efe9de",
        position: "relative",
        overflow: "hidden",
        minHeight: "64vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Warm spotlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 48% 42% at 50% 34%, rgba(239,233,222,0.10), rgba(239,233,222,0.04) 40%, transparent 70%),
            radial-gradient(ellipse 28% 22% at 50% 30%, rgba(255,224,180,0.06), transparent 70%)
          `,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Ambient light — a broad, low wash that shifts with the pointer */}
      <div
        ref={ambientRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(
              ellipse 240% 220% at var(--ambient-x, 50%) var(--ambient-y, 38%),
              rgba(239, 233, 222, 0.038) 0%,
              rgba(239, 233, 222, 0.016) 42%,
              rgba(239, 233, 222, 0.004) 72%,
              transparent 100%
            )
          `,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: grainSvg,
          backgroundSize: "240px 240px",
          opacity: 0.22,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Edge vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="ev-container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 400,
            fontSize: "clamp(42px, 6.8vw, 96px)",
            lineHeight: 1.14,
            letterSpacing: "-0.025em",
            color: "#f5f2ec",
            margin: "0 0 28px",
          }}
        >
          <span style={{ display: "block" }}>Make every purchase</span>
          <span style={{ display: "block" }}>more meaningful</span>
        </h1>

        <p
          style={{
            fontWeight: 400,
            fontSize: "clamp(20px, 2.15vw, 28px)",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "rgba(245,242,236,0.88)",
            margin: "0 0 36px",
            textAlign: "center",
          }}
        >
          Give every piece a lasting digital record
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(245,242,236,0.72)",
                maxWidth: "34em",
                margin: "0 auto 28px",
                fontWeight: 400,
              }}
            >
              A lasting way for customers to keep and revisit the pieces they
              love, while your brand stays present beyond the first sale.
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* <button type="button" className="ev-btn" onClick={scrollToContact}>
                Get Early Access{" "}
                <span className="ev-btn-arrow" aria-hidden="true" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
