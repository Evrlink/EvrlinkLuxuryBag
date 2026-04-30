"use client";

import { useEffect, useState } from "react";

export default function NavbarNew() {
  const [scrolled, setScrolled] = useState(false);

  const openEarlyAccessPopup = () => {
    window.dispatchEvent(new Event("open-early-access-popup"));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(42,42,42,0.88)" : "transparent",
        borderBottom: "1px solid rgba(239,233,222,0.15)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.35s, backdrop-filter 0.35s",
      }}
    >
      <div
        className="ev-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "78px",
        }}
      >
        {/* Brand */}
        <a
          href="#"
          aria-label="Evrlink home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#efe9de",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
          }}
        >
         
          Evrlink
        </a>

        {/* Centre nav (placeholder — hidden on mobile) */}
        <div
          className="ev-nav-links"
          style={{ display: "flex", gap: "44px", justifyContent: "center" }}
        />

        {/* Right CTA */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="ev-btn" onClick={openEarlyAccessPopup}>
            Get Early Access
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .ev-nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
