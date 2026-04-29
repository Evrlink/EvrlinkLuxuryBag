export default function WhyNowNew() {
  const items = [
    {
      num: "01",
      title: "Resale outpacing primary",
      body: "Resale grew +7%. Primary luxury contracted −2%. The gap is structural, not cyclical.",
    },
    {
      num: "02",
      title: "L2 enables micro-fees",
      body: "Base reduces gas to fractions of a cent. A 2% fee at scale is finally viable.",
    },
    {
      num: "03",
      title: "EU Digital Product Passport",
      body: "Item-level provenance is mandated for luxury by 2030. Evrlink is DPP-compliant by design.",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#ECEEF0" }}>
      <div className="ev-container">
        <div style={{ maxWidth: "760px", marginBottom: "36px" }}>
          <span
            className="ev-eyebrow"
            style={{ display: "inline-block", marginBottom: "20px" }}
          >
            Why now
          </span>
          <h2
            style={{
              fontWeight: 400,
              fontSize: "clamp(32px, 3.8vw, 52px)",
              lineHeight: 1.12,
              letterSpacing: "-0.022em",
              color: "#2a2a2a",
              maxWidth: "24ch",
            }}
          >
            This market could not exist before.{" "}
            <span style={{ color: "rgba(14,20,24,0.55)" }}>Now it can.</span>
          </h2>
        </div>

        <div
          className="ev-wn-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid rgba(14,20,24,0.08)",
            borderBottom: "1px solid rgba(14,20,24,0.08)",
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.num}
              style={{
                padding: "32px 28px 36px",
                borderRight:
                  i < items.length - 1
                    ? "1px solid rgba(14,20,24,0.08)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  color: "rgba(14,20,24,0.55)",
                }}
              >
                {item.num}
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "22px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  color: "#2a2a2a",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "rgba(14,20,24,0.7)",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ev-wn-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ev-wn-grid > div {
            border-bottom: 1px solid rgba(14,20,24,0.08);
          }
          .ev-wn-grid > div:nth-child(2n) {
            border-right: none !important;
          }
        }
        @media (max-width: 600px) {
          .ev-wn-grid {
            grid-template-columns: 1fr !important;
          }
          .ev-wn-grid > div {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
