export default function BenefitsNew() {
  const benefits = [
    {
      num: "01",
      title: "Lifetime revenue",
      body: "The brand earns on every resale, rental and transfer for the lifetime of the item. New margin from the same unit.",
    },
    {
      num: "02",
      title: "Verification & brand protection",
      body: "Every item is authenticated at handoff. Counterfeits are cut out of the resale market.",
    },
    {
      num: "03",
      title: "Data",
      body: "Every transfer, owner and repair is logged. Brands collect data, where demand lives and how value travels.",
    },
  ];

  return (
    <section
      id="benefits"
      style={{ padding: "80px 0", background: "#ffffff" }}
    >
      <div
        className="ev-container"
        style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {/* Head: eyebrow + title left, phone right */}
        <div className="ev-benefits-head">
          <div>
            <span
              className="ev-eyebrow"
              style={{ display: "inline-block", marginBottom: "20px" }}
            >
              The Solution
            </span>
            <h2
              style={{
                fontWeight: 400,
                fontSize: "clamp(32px, 3.8vw, 52px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: "#2a2a2a",
                maxWidth: "18ch",
                margin: 0,
              }}
            >
              Every item generates{" "}
              <span style={{ color: "rgba(14,20,24,0.5)" }}>
                lifetime revenue, history and verification
              </span>
            </h2>
          </div>

          {/* Phone mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "248px",
                background: "#f5f2ea",
                borderRadius: "38px",
                padding: "8px",
                boxShadow:
                  "0 30px 60px -20px rgba(14,20,24,0.22), 0 10px 24px -10px rgba(14,20,24,0.15)",
                position: "relative",
                border: "1px solid rgba(14,20,24,0.08)",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "64px",
                  height: "6px",
                  background: "rgba(14,20,24,0.6)",
                  borderRadius: "6px",
                  zIndex: 2,
                }}
              />

              {/* Screen */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "30px",
                  padding: "32px 0 16px",
                  color: "#2a2a2a",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "2px 18px 14px",
                    borderBottom: "1px solid rgba(14,20,24,0.07)",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#2a6cf4", fontWeight: 400 }}>&nbsp;</span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-didot-title), var(--font-didot), Georgia, serif",
                      fontSize: "12px",
                      letterSpacing: "0.01em",
                      color: "#2a2a2a",
                    }}
                  >
                    ATELIER · Digital Passport
                  </span>
                  <span style={{ fontWeight: 600 }}>&nbsp;</span>
                </div>

                {/* Card content */}
                <div
                  style={{
                    padding: "22px 22px 18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "var(--font-didot-title), var(--font-didot), Georgia, serif",
                      fontWeight: 400,
                      fontSize: "22px",
                      letterSpacing: "0.24em",
                      color: "#2a2a2a",
                      marginTop: "2px",
                    }}
                  >
                    ATELIER
                  </div>
                  <div
                    style={{
                      fontSize: "8.5px",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(14,20,24,0.55)",
                      marginTop: "2px",
                    }}
                  >
                    Digital Certificate of Authenticity
                  </div>

                  {/* Product image area */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      background: "#f5f2ea",
                      margin: "10px 0",
                      borderRadius: "2px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox="0 0 160 120"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="bagG2" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="#c9a96a" />
                          <stop offset="1" stopColor="#8c6f3f" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="160" height="120" fill="#f5f2ea" />
                      <path
                        d="M52 48 Q80 28 108 48 L108 54 L52 54 Z"
                        fill="none"
                        stroke="#8c6f3f"
                        strokeWidth="1.6"
                      />
                      <rect x="44" y="54" width="72" height="48" rx="3" fill="url(#bagG2)" />
                      <line x1="80" y1="54" x2="80" y2="102" stroke="#6b5329" strokeWidth="0.6" opacity="0.4" />
                      <rect x="74" y="68" width="12" height="8" rx="1.5" fill="#6b5329" opacity="0.55" />
                    </svg>
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-didot), Georgia, serif",
                      fontSize: "12.5px",
                      color: "#2a2a2a",
                      letterSpacing: "0.01em",
                      textAlign: "center",
                    }}
                  >
                    Avenue Shoulder Bag
                  </div>
                  <div
                    style={{
                      fontSize: "8.5px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(14,20,24,0.55)",
                      textAlign: "center",
                    }}
                  >
                    Limited &amp; numbered edition
                  </div>
                  <div
                    style={{
                      fontSize: "8.5px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(14,20,24,0.7)",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    Certified on Evrlink
                  </div>

                  {/* QR code */}
                  <div style={{ width: "76px", height: "76px", margin: "10px 0 6px" }} aria-hidden="true">
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      <rect width="100" height="100" fill="#fff" />
                      <g fill="#14191e">
                        <rect x="6" y="6" width="22" height="22" />
                        <rect x="10" y="10" width="14" height="14" fill="#fff" />
                        <rect x="13" y="13" width="8" height="8" />
                        <rect x="72" y="6" width="22" height="22" />
                        <rect x="76" y="10" width="14" height="14" fill="#fff" />
                        <rect x="79" y="13" width="8" height="8" />
                        <rect x="6" y="72" width="22" height="22" />
                        <rect x="10" y="76" width="14" height="14" fill="#fff" />
                        <rect x="13" y="79" width="8" height="8" />
                        <rect x="34" y="8" width="4" height="4" />
                        <rect x="40" y="8" width="4" height="4" />
                        <rect x="46" y="8" width="4" height="4" />
                        <rect x="56" y="8" width="4" height="4" />
                        <rect x="62" y="12" width="4" height="4" />
                        <rect x="34" y="16" width="4" height="4" />
                        <rect x="42" y="18" width="4" height="4" />
                        <rect x="50" y="20" width="4" height="4" />
                        <rect x="58" y="18" width="4" height="4" />
                        <rect x="34" y="30" width="4" height="4" />
                        <rect x="40" y="32" width="4" height="4" />
                        <rect x="48" y="30" width="4" height="4" />
                        <rect x="56" y="34" width="4" height="4" />
                        <rect x="34" y="40" width="4" height="4" />
                        <rect x="42" y="38" width="4" height="4" />
                        <rect x="50" y="42" width="4" height="4" />
                        <rect x="60" y="40" width="4" height="4" />
                        <rect x="34" y="50" width="4" height="4" />
                        <rect x="42" y="50" width="4" height="4" />
                        <rect x="48" y="54" width="4" height="4" />
                        <rect x="58" y="50" width="4" height="4" />
                        <rect x="34" y="60" width="4" height="4" />
                        <rect x="40" y="62" width="4" height="4" />
                        <rect x="50" y="60" width="4" height="4" />
                        <rect x="56" y="64" width="4" height="4" />
                        <rect x="34" y="72" width="4" height="4" />
                        <rect x="42" y="76" width="4" height="4" />
                        <rect x="50" y="74" width="4" height="4" />
                        <rect x="60" y="72" width="4" height="4" />
                        <rect x="34" y="84" width="4" height="4" />
                        <rect x="40" y="82" width="4" height="4" />
                        <rect x="48" y="86" width="4" height="4" />
                        <rect x="56" y="84" width="4" height="4" />
                      </g>
                    </svg>
                  </div>

                  <div
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(14,20,24,0.55)",
                      fontWeight: 500,
                    }}
                  >
                    atelier
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div
          className="ev-benefits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid rgba(14,20,24,0.08)",
          }}
        >
          {benefits.map((b, i) => (
            <div
              key={b.num}
              style={{
                padding: "40px 40px 36px",
                borderRight:
                  i < benefits.length - 1
                    ? "1px solid rgba(14,20,24,0.08)"
                    : "none",
                display: "grid",
                gridTemplateRows: "42px 72px auto",
                alignItems: "start",
                rowGap: "20px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid #2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2a2a2a",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {b.num}
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "22px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  color: "#2a2a2a",
                  margin: 0,
                  alignSelf: "start",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  lineHeight: 1.72,
                  color: "rgba(14,20,24,0.7)",
                  margin: 0,
                  alignSelf: "start",
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance badge */}
        <div
          style={{
            marginTop: "32px",
            padding: "14px 24px",
            border: "1px solid rgba(14,20,24,0.08)",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(14,20,24,0.7)",
            background: "#fff",
            alignSelf: "center",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00B2C7",
              boxShadow: "0 0 10px rgba(0,178,199,0.55)",
              flexShrink: 0,
            }}
          />
          EU Digital Product Passport · Compliant by 2030
        </div>
      </div>

      <style>{`
        .ev-benefits-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          margin-bottom: 32px;
        }
        @media (max-width: 900px) {
          .ev-benefits-head {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .ev-benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .ev-benefits-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(14,20,24,0.08);
          }
          .ev-benefits-grid > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
