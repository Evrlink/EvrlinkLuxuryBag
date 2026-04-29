"use client";

export default function HeroNew() {
  const grainSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0.42 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "rgba(245,242,236,0.72)",
            }}
          >
            Luxury Infrastructure
          </span>
        </div>

        <h1
          style={{
            fontWeight: 400,
            fontSize: "clamp(48px, 6.4vw, 92px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#f5f2ec",
            marginBottom: "32px",
          }}
        >
          Every luxury item
          <br />
          generates lifetime value
        </h1>

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
                lineHeight: 1.55,
                color: "rgba(245,242,236,0.72)",
                maxWidth: "52ch",
                marginBottom: "28px",
                fontWeight: 400,
              }}
            >
              Luxury brands don&apos;t see any of it. Evrlink is the missing
              infrastructure
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
              <button type="button" className="ev-btn" onClick={scrollToContact}>
                Get Early Access{" "}
                <span className="ev-btn-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
