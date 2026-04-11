"use client";

import { useEffect, useState } from "react";

const G = {
  gold: "#C9A84C",
  goldDim: "rgba(201,168,76,0.55)",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.5)",
  bg: "#131314",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "22px 36px",
      transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
      background: scrolled ? "rgba(19,19,20,0.85)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(201,168,76,0.08)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
    }}>

      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        {/* <span style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: G.gold,
          display: "inline-block",
          boxShadow: `0 0 8px rgba(201,168,76,0.5)`,
        }} /> */}
        <span style={{
          fontSize: "11.5px",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: G.cream,
        }}>
          Evrlink
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        <a
          href="#about"
          style={{
            fontSize: "12.5px",
            color: G.creamDim,
            textDecoration: "none",
            letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = G.gold)}
          onMouseLeave={e => (e.currentTarget.style.color = G.creamDim)}
        >
          About
        </a>

        <a href="#contact" className="rim-btn rim-btn--nav">
          Get Early Access
        </a>
      </div>
    </nav>
  );
}
