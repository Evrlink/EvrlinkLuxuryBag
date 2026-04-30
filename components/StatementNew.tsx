export default function StatementNew() {
  return (
    <section
      style={{
        background: "#2a2a2a",
        padding: "40px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 70% at 50% 50%, rgba(239,233,222,0.08), transparent 60%),
            radial-gradient(ellipse 30% 40% at 20% 30%, rgba(239,233,222,0.04), transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      <div
        className="ev-container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(239,233,222,0.55)",
          }}
        >
          <span style={{ width: "30px", height: "1px", background: "rgba(239,233,222,0.55)", display: "inline-block" }} />
          Evrlink
          <span style={{ width: "30px", height: "1px", background: "rgba(239,233,222,0.55)", display: "inline-block" }} />
        </div> */}

        <h2
          style={{
            fontWeight: 400,
            fontSize: "clamp(38px, 6.2vw, 92px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: "18ch",
            margin: "0 auto",
            color: "#efe9de",
            textShadow:
              "0 -1px 0 rgba(0,0,0,0.55), 0 1px 0 rgba(239,233,222,0.09), 0 2px 0 rgba(239,233,222,0.05), 0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          All Your Bags{" "}
          <span style={{ fontStyle: "normal", fontWeight: 500 }}>Belong</span>{" "}
          To You
        </h2>

        <div
          style={{
            width: "clamp(120px, 20vw, 260px)",
            height: "2px",
            background:
              "linear-gradient(to right, transparent, rgba(239,233,222,0.55), transparent)",
            marginTop: "8px",
          }}
        />
      </div>
    </section>
  );
}
