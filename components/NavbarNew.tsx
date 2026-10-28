"use client";

import { useEffect, useState } from "react";

export default function NavbarNew() {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".ev-nav");
    const sections = document.querySelectorAll("[data-nav='light']");
    if (!nav || sections.length === 0) return;

    let frame = 0;
    const update = () => {
      const probe = nav.getBoundingClientRect().bottom - 1;
      let light = false;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) light = true;
      });
      setOnLight(light);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return (
    <nav className={onLight ? "ev-nav ev-nav--light" : "ev-nav"}>
      <div className="ev-nav__left">
        <a href="/" className="ev-nav__logo" aria-label="Evrlink home">
          EVRLINK
        </a>
        <div className="ev-nav__links">
          <a href="#problem">The Problem</a>
          <a href="#benefits">Solution</a>
          <a href="#comparison">Comparison</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="ev-nav__right">
        <a href="/dashboard" className="ev-nav__login">
          Dashboard login
        </a>
        <a href="#contact" className="ev-nav__demo">
          Get a demo
        </a>
      </div>

      <style>{`
        .ev-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 80px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 clamp(16px, 4.4vw, 56px);
          background: rgba(250,249,246,.04);
          border-bottom: 1px solid rgba(250,249,246,.09);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          color: #FAF9F6;
          transition: background .3s, border-color .3s, color .3s;
        }
        .ev-nav--light {
          background: rgba(255,255,255,.86);
          border-bottom-color: rgba(20,20,20,.12);
          color: #141414;
        }
        .ev-nav__left { display: flex; align-items: center; gap: 44px; }
        .ev-nav__logo {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 5.9px;
          color: #FAF9F6;
          text-decoration: none;
        }
        .ev-nav__links { display: flex; gap: 30px; font-size: 14px; }
        .ev-nav__links a,
        .ev-nav__login {
          color: #FAF9F6;
          text-decoration: none;
          transition: color .3s;
        }
        .ev-nav__links a:hover,
        .ev-nav__login:hover { color: rgba(250,249,246,.65); }
        .ev-nav--light .ev-nav__logo,
        .ev-nav--light .ev-nav__links a,
        .ev-nav--light .ev-nav__login { color: #141414; }
        .ev-nav--light .ev-nav__links a:hover,
        .ev-nav--light .ev-nav__login:hover { color: rgba(20,20,20,.55); }
        .ev-nav__right { display: flex; align-items: center; gap: 22px; font-size: 14px; }
        .ev-nav__demo {
          display: inline-flex;
          align-items: center;
          background: #FAF9F6;
          color: #141414;
          border-radius: 999px;
          font-size: 14px;
          padding: 12px 22px;
          text-decoration: none;
          transition: background-color .45s ease, color .45s ease;
        }
        .ev-nav__demo:hover { background: #E9E3D7; color: #000; }
        @media (max-width: 860px) {
          .ev-nav__links { display: none; }
        }
        @media (max-width: 480px) {
          .ev-nav__login { display: none; }
        }
      `}</style>
    </nav>
  );
}
