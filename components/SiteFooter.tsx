"use client";

export default function SiteFooter() {
  return (
    <footer
      id="company"
      style={{
        background: "#2a2a2a",
        color: "rgba(239,233,222,0.7)",
        padding: "40px 0",
        borderTop: "1px solid rgba(239,233,222,0.08)",
      }}
    >
      <div
        className="ev-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(239,233,222,0.55)",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>© 2026 Evrlink</div>
        <div style={{ display: "flex", gap: "32px" }}>
          <a
            href="#problem"
            style={{ textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#efe9de")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239,233,222,0.55)")}
          >
            The Problem
          </a>
          <a
            href="#benefits"
            style={{ textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#efe9de")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239,233,222,0.55)")}
          >
            Solution
          </a>
          <a
            href="#contact"
            style={{ textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#efe9de")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239,233,222,0.55)")}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
