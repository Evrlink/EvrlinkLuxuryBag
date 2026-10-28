"use client";

import { useEffect, useRef } from "react";

export default function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = sectionRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const center = () => {
      glow.style.transform = `translate(${hero.clientWidth / 2}px, ${hero.clientHeight * 0.55}px)`;
    };

    const onMove = (event: MouseEvent) => {
      if (reduceMotion.matches) return;
      const bounds = hero.getBoundingClientRect();
      glow.style.transform = `translate(${event.clientX - bounds.left}px, ${event.clientY - bounds.top}px)`;
    };

    const onLeave = () => {
      if (reduceMotion.matches) return;
      center();
    };

    center();
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", center);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", center);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ev-hero">
      <div ref={glowRef} className="ev-hero__glow" aria-hidden />
      <div className="ev-hero__content">
        <h1>
          <span className="ev-w" style={{ animationDelay: "0s" }}>Make</span>{" "}
          <span className="ev-w" style={{ animationDelay: ".08s" }}>every</span>{" "}
          <span className="ev-w" style={{ animationDelay: ".16s" }}>purchase</span>
          <br />
          <span className="ev-w" style={{ animationDelay: ".24s" }}>more</span>{" "}
          <span className="ev-w" style={{ animationDelay: ".32s" }}>meaningful.</span>
        </h1>
        <div className="ev-hero__rule" aria-hidden />
        <p>
          A digital record that carries a brand&apos;s story, heritage and
          relationship with the customer beyond the first sale.
        </p>
        <a href="#contact" className="ev-hero__cta">
          Request meeting
        </a>
      </div>

      <style>{`
        .ev-hero {
          position: relative;
          overflow: hidden;
          min-height: calc(min(100vh, 900px) - 80px);
          margin-top: -80px;
          padding-top: 80px;
          box-sizing: content-box;
          background: #2A2A2A;
          color: #FAF9F6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ev-hero__glow {
          position: absolute;
          left: -380px;
          top: -380px;
          width: 760px;
          height: 760px;
          border-radius: 50%;
          background: radial-gradient(closest-side, rgba(250,249,246,.09), rgba(250,249,246,0));
          transition: transform 1.6s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .ev-hero__content {
          position: relative;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 64px 16px 80px;
        }
        .ev-hero h1 {
          margin: 0;
          font-weight: 400;
          font-size: clamp(42px, 6.25vw, 80px);
          line-height: 1.12;
          letter-spacing: -0.022em;
          max-width: 900px;
        }
        .ev-w {
          display: inline-block;
          animation: evWord .8s cubic-bezier(.2,.7,.2,1) backwards;
        }
        .ev-hero__rule {
          width: 120px;
          height: 1px;
          background: rgba(250,249,246,.35);
          animation: evDraw .9s ease-out .3s backwards;
        }
        .ev-hero p {
          margin: 0;
          max-width: 620px;
          font-size: clamp(17px, 1.6vw, 20px);
          line-height: 1.45;
          color: rgba(250,249,246,.78);
          animation: evNudge .8s ease-out .2s backwards;
        }
        .ev-hero__cta {
          display: inline-flex;
          align-items: center;
          background: #FAF9F6;
          color: #141414;
          border-radius: 999px;
          font-size: 15px;
          padding: 15px 28px;
          text-decoration: none;
          transition: background-color .45s ease, color .45s ease;
          animation: evNudge .8s ease-out .3s backwards;
        }
        .ev-hero__cta:hover { background: #E9E3D7; color: #000; }
        @keyframes evWord {
          from { opacity: .55; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes evNudge {
          from { transform: translateY(8px); }
          to { transform: none; }
        }
        @keyframes evDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ev-w,
          .ev-hero__rule,
          .ev-hero p,
          .ev-hero__cta,
          .ev-hero__glow {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
