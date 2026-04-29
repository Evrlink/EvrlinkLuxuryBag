export default function ProblemNew() {
  const noiseSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>")`;

  return (
    <section
      id="problem"
      style={{
        padding: "80px 0",
        background: "#ECEEF0",
        color: "#2a2a2a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-25%",
          background: `
            radial-gradient(ellipse 50% 55% at 22% 32%, rgba(0,178,199,0.12), transparent 65%),
            radial-gradient(ellipse 45% 50% at 78% 65%, rgba(15,20,24,0.04), transparent 65%)
          `,
          filter: "blur(100px) saturate(115%)",
          animation: "problemOrbs 30s ease-in-out infinite alternate",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Noise overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: noiseSvg,
          opacity: 0.04,
          mixBlendMode: "multiply",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="ev-container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          maxWidth: "1100px",
          textAlign: "left",
        }}
      >
        {/* Copy */}
        <div style={{ maxWidth: "440px" }}>
          <span
            className="ev-eyebrow"
            style={{ display: "inline-block", marginBottom: "20px" }}
          >
            The Problem
          </span>
          <h2
            style={{
              fontWeight: 400,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              lineHeight: 1.14,
              letterSpacing: "-0.02em",
              color: "#2a2a2a",
              marginBottom: "20px",
            }}
          >
            Luxury created the value
            <span
              style={{ color: "#00B2C7", display: "block" }}
            >
              Platforms captured the economics
            </span>
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.65,
              color: "rgba(15,20,24,0.68)",
              marginBottom: "20px",
              maxWidth: "44ch",
            }}
          >
            Each sale compounds the value. Every cent after the first
            transaction flows to marketplaces, not the brand
          </p>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#00B2C7",
              paddingTop: "24px",
              borderTop: "1px solid rgba(15,20,24,0.12)",
              display: "inline-block",
            }}
          >
            Now brands can capture lifetime value
          </p>
        </div>

        {/* SVG Orbit infographic */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 400 400"
            style={{ width: "100%", maxWidth: "380px", height: "auto", overflow: "visible" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="200" r="178" fill="none" stroke="rgba(0,178,199,0.22)" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(0,178,199,0.35)" strokeWidth="1" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(0,178,199,0.6)" strokeWidth="1" />

            {/* Tick nodes */}
            <circle cx="200" cy="22" r="4" fill="rgba(0,178,199,0.7)" stroke="#ECEEF0" strokeWidth="2" />
            <circle cx="378" cy="200" r="3.5" fill="rgba(0,178,199,0.7)" stroke="#ECEEF0" strokeWidth="2" />
            <circle cx="200" cy="378" r="3.5" fill="rgba(0,178,199,0.7)" stroke="#ECEEF0" strokeWidth="2" />
            <circle cx="22" cy="200" r="3.5" fill="rgba(0,178,199,0.7)" stroke="#ECEEF0" strokeWidth="2" />

            {/* Radial dashes */}
            <g stroke="rgba(0,178,199,0.3)" strokeWidth="1" strokeDasharray="2 4">
              <line x1="200" y1="60" x2="200" y2="22" />
              <line x1="340" y1="200" x2="378" y2="200" />
              <line x1="200" y1="340" x2="200" y2="378" />
              <line x1="60" y1="200" x2="22" y2="200" />
            </g>

            {/* Bag illustration */}
            <g fill="none" stroke="#2a2a2a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" transform="translate(200 200)">
              <path d="M -38 -8 L -38 38 Q -38 46 -30 46 L 30 46 Q 38 46 38 38 L 38 -8 Z" />
              <path d="M -22 -8 Q -22 -32 0 -32 Q 22 -32 22 -8" strokeWidth="1.4" />
              <line x1="-38" y1="4" x2="38" y2="4" stroke="rgba(15,20,24,0.4)" />
              <circle cx="0" cy="14" r="2.5" fill="#00B2C7" stroke="none" />
            </g>

            {/* Orbit arrow arc */}
            <path
              d="M 225 24 A 178 178 0 0 1 376 218"
              fill="none"
              stroke="#00B2C7"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.7"
              markerEnd="url(#arrowhead)"
            />

            {/* Hidden circular path for animated dot */}
            <path id="evOrbitPath" d="M 200 22 A 178 178 0 1 1 199.99 22" fill="none" stroke="none" />

            {/* Traveling teal dot */}
            <circle r="5" fill="#00B2C7" style={{ filter: "drop-shadow(0 0 8px rgba(0,178,199,0.9)) drop-shadow(0 0 16px rgba(0,178,199,0.4))" }}>
              <animateMotion dur="12s" repeatCount="indefinite" rotate="0">
                <mpath href="#evOrbitPath" />
              </animateMotion>
            </circle>

            {/* Pulse rings at resale nodes */}
            <circle cx="378" cy="200" r="3.5" fill="none" stroke="#00B2C7" strokeWidth="1.5" style={{ transformOrigin: "center", transformBox: "fill-box", animation: "evNodePulse 12s linear 3s infinite", opacity: 0 }} />
            <circle cx="200" cy="378" r="3.5" fill="none" stroke="#00B2C7" strokeWidth="1.5" style={{ transformOrigin: "center", transformBox: "fill-box", animation: "evNodePulse 12s linear 6s infinite", opacity: 0 }} />
            <circle cx="22" cy="200" r="3.5" fill="none" stroke="#00B2C7" strokeWidth="1.5" style={{ transformOrigin: "center", transformBox: "fill-box", animation: "evNodePulse 12s linear 9s infinite", opacity: 0 }} />
            <circle cx="200" cy="22" r="4" fill="none" stroke="#00B2C7" strokeWidth="1.5" style={{ transformOrigin: "center", transformBox: "fill-box", animation: "evNodePulse 12s linear 0s infinite", opacity: 0 }} />

            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#00B2C7" />
              </marker>
            </defs>

            {/* Orbit labels */}
            <text x="200" y="12" textAnchor="middle" fontFamily="inherit" fontSize="9" fontWeight="600" letterSpacing="0.24em" fill="#00B2C7">1ST SALE</text>
            <text x="392" y="204" textAnchor="end" fontFamily="inherit" fontSize="9" fontWeight="600" letterSpacing="0.24em" fill="rgba(15,20,24,0.55)">RESALE</text>
            <text x="200" y="396" textAnchor="middle" fontFamily="inherit" fontSize="9" fontWeight="600" letterSpacing="0.24em" fill="rgba(15,20,24,0.55)">RESALE</text>
            <text x="8" y="204" textAnchor="start" fontFamily="inherit" fontSize="9" fontWeight="600" letterSpacing="0.24em" fill="rgba(15,20,24,0.55)">RESALE</text>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes problemOrbs {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-3%, 2%) scale(1.06); }
          100% { transform: translate(2%, -1.5%) scale(1.03); }
        }
        @keyframes evNodePulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          4%   { transform: scale(3.5); opacity: 0;   }
          100% { transform: scale(3.5); opacity: 0;   }
        }
        @media (max-width: 860px) {
          #problem .ev-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center !important;
          }
          #problem .ev-container > div:first-child {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
