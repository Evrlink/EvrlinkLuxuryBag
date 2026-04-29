export default function TheGap() {
  return (
    <section
      id="platform"
      style={{
        padding: "80px 0",
        background: "#ffffff",
        color: "#2a2a2a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(14,20,24,0.03), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="ev-container"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <span
          className="ev-eyebrow"
          style={{ display: "inline-block", marginBottom: "20px" }}
        >
          The Revenue Gap
        </span>

        <h2
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px, 3.8vw, 52px)",
            lineHeight: 1.12,
            letterSpacing: "-0.022em",
            color: "#2a2a2a",
            maxWidth: "24ch",
            margin: "0 auto 16px",
          }}
        >
          $52B in secondary luxury market
          <div>
            &nbsp;
            <span style={{ color: "rgba(14,20,24,0.5)" }}>
              $0 to the brands
            </span>
          </div>
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.55,
            color: "rgba(14,20,24,0.65)",
            maxWidth: "52ch",
            margin: "0 auto 56px",
          }}
        >
          Brands invest billions to build desirability. Platforms capture the
          upside
        </p>

        {/* Two circles */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "clamp(40px, 6vw, 96px)",
            flexWrap: "wrap",
          }}
        >
          {/* $52B circle — filled teal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              maxWidth: "240px",
            }}
          >
            <div
              style={{
                width: "clamp(160px, 15vw, 210px)",
                height: "clamp(160px, 15vw, 210px)",
                borderRadius: "50%",
                background: "#00B2C7",
                color: "#2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 400,
                fontSize: "clamp(44px, 4.4vw, 60px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              $52
              <span style={{ fontSize: "0.45em", marginLeft: "2px" }}>B</span>
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(14,20,24,0.6)",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              Luxury resale
              <br />
              market 2024
            </div>
          </div>

          {/* $0 circle — empty outline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              maxWidth: "240px",
            }}
          >
            <div
              style={{
                width: "clamp(160px, 15vw, 210px)",
                height: "clamp(160px, 15vw, 210px)",
                borderRadius: "50%",
                background: "transparent",
                border: "1.5px solid rgba(14,20,24,0.28)",
                color: "rgba(14,20,24,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 400,
                fontSize: "clamp(44px, 4.4vw, 60px)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
              }}
            >
              $0
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(14,20,24,0.6)",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              Revenue to the
              <br />
              brands that built it
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
