export default function BenefitsNew() {
  const benefits = [
    {
      num: "01",
      title: "A purchase record customers can revisit",
    },
    {
      num: "02",
      title: "The piece's story, shared by the brand",
    },
    {
      num: "03",
      title: "Authentic, brand-provided information about the piece, available to reference after the sale",
    },
    {
      num: "04",
      title: "A connection that continues beyond checkout",
    },
  ];

  return (
    <section
      id="benefits"
      style={{ padding: "112px 0 80px", background: "#ffffff" }}
    >
      <div
        className="ev-container"
        style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <div className="evr-solution__inner">
          <div>
            <p className="evr-eyebrow">The Solution</p>
            <h2 id="evr-solution-title">
              The piece, its purchase, and its story, together in one digital record.
            </h2>
            <p className="evr-solution__body">
              Evrlink helps luxury brands issue a digital record associated with
              each purchase. It brings together an image of the piece and its
              purchase details, alongside the provenance and story the brand
              chooses to share. Recorded onchain, it gives customers an
              accessible reference to revisit, and gives brands a way to
              continue the relationship beyond checkout.
            </p>
          </div>

          <figure className="evr-card-stage">
            <article className="evc-card" aria-label="Example Evrlink digital record">
              <header className="evc-head">
                <p className="evc-wordmark">EVRLINK</p>
                <p className="evc-cardname">Digital Record</p>
              </header>

              <div className="evc-product">
                <img
                  src="/evrlink-gown.jpg"
                  alt="Georges Hobeika Draped Off-Shoulder Mermaid Gown in Blue Quarry on the runway"
                />
                <div>
                  <dl className="evc-ident">
                    <dt className="evc-label">Designer</dt>
                    <dd className="evc-designer">Georges Hobeika</dd>
                  </dl>
                  <dl className="evc-ident">
                    <dt className="evc-label">Product</dt>
                    <dd className="evc-name">Draped Off-Shoulder Mermaid Gown</dd>
                  </dl>
                  <dl className="evc-specs">
                    <div><dt className="evc-label">Collection</dt><dd>Spring/Summer 2026</dd></div>
                    <div><dt className="evc-label">Color</dt><dd>Blue Quarry</dd></div>
                    <div><dt className="evc-label">Size</dt><dd>FR 40</dd></div>
                    <div><dt className="evc-label">Material</dt><dd>Chiffon</dd></div>
                    <div><dt className="evc-label">Made in</dt><dd>Lebanon</dd></div>
                    <div><dt className="evc-label">SKU</dt><dd>GH-SS26-052-LD</dd></div>
                  </dl>
                </div>
              </div>

              <div className="evc-record">
                <div>
                  <h3>Authenticity Record</h3>
                  <dl>
                    <dt className="evc-label">Record No.</dt>
                    <dd>EVR-0000-000000</dd>
                    <dt className="evc-label">Purchase Date</dt>
                    <dd>October 13, 2026</dd>
                    <dt className="evc-label">Order Ref.</dt>
                    <dd>ord_0000000000000000</dd>
                  </dl>
                </div>
                <div className="evc-qr">
                  <svg viewBox="0 0 29 29" shapeRendering="crispEdges" role="img" aria-label="QR code illustration">
                    <defs>
                      <pattern id="evcqr" width="7" height="7" patternUnits="userSpaceOnUse" x="2" y="2">
                        <path fill="#141414" d="M0 0h1v1H0zM2 0h2v1H2zM5 0h1v2H5zM1 1h1v1H1zM3 2h1v2H3zM0 3h2v1H0zM6 3h1v1H6zM4 4h2v1H4zM1 5h1v2H1zM3 5h1v1H3zM6 5h1v1H6zM2 6h2v1H2zM5 6h1v1H5z" />
                      </pattern>
                    </defs>
                    <rect width="29" height="29" fill="#fff" />
                    <rect x="2" y="2" width="25" height="25" fill="url(#evcqr)" />
                    <rect x="2" y="2" width="8" height="8" fill="#fff" />
                    <rect x="2" y="2" width="7" height="7" fill="#141414" />
                    <rect x="3" y="3" width="5" height="5" fill="#fff" />
                    <rect x="4" y="4" width="3" height="3" fill="#141414" />
                    <rect x="19" y="2" width="8" height="8" fill="#fff" />
                    <rect x="20" y="2" width="7" height="7" fill="#141414" />
                    <rect x="21" y="3" width="5" height="5" fill="#fff" />
                    <rect x="22" y="4" width="3" height="3" fill="#141414" />
                    <rect x="2" y="19" width="8" height="8" fill="#fff" />
                    <rect x="2" y="20" width="7" height="7" fill="#141414" />
                    <rect x="3" y="21" width="5" height="5" fill="#fff" />
                    <rect x="4" y="22" width="3" height="3" fill="#141414" />
                  </svg>
                  <span className="evc-save" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v8M4.5 6.8 8 10.3l3.5-3.5M2.5 11v2.5h11V11" />
                    </svg>
                    <span>Save certificate</span>
                  </span>
                </div>
              </div>

              <p className="evc-foot">This record was created at purchase and cannot be altered.</p>
            </article>
          </figure>
        </div>

        {/* Benefits grid */}
        <div
          className="ev-benefits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            borderTop: "1px solid rgba(14,20,24,0.08)",
          }}
        >
          {benefits.map((b, i) => (
            <div
              key={b.num}
              style={{
                padding: "40px 40px 36px",
                borderRight:
                  i % 2 === 0 ? "1px solid rgba(14,20,24,0.08)" : "none",
                borderBottom:
                  i < 2 ? "1px solid rgba(14,20,24,0.08)" : "none",
                display: "grid",
                alignItems: "start",
              }}
            >
              {/* <div
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
                {/* {b.num}
              </div> */}
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  color: "#2a2a2a",
                  margin: 0,
                  alignSelf: "start",
                }}
              >
                {b.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .evr-solution__inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
          column-gap: 88px;
          align-items: center;
          margin-bottom: 88px;
        }
        .evr-eyebrow {
          margin: 0 0 24px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #6e6e6e;
        }
        .evr-solution__inner h2 {
          margin: 0 0 32px;
          font-weight: 400;
          color: #141414;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }
        .evr-solution__body {
          margin: 0;
          max-width: 34em;
          font-size: 19px;
          line-height: 1.65;
          color: #4d4d4d;
        }
        .evr-card-stage { margin: 0; }
        .evc-card {
          width: 100%;
          background: #fff;
          color: #141414;
          font-family: var(--font-didot), Garamond, "Times New Roman", serif;
          border: 1px solid #e4e1dc;
          padding: 36px 36px 28px;
          box-shadow: 0 1px 2px rgba(20,20,20,0.04), 0 12px 24px -8px rgba(20,20,20,0.08), 0 40px 80px -24px rgba(20,20,20,0.14);
        }
        .evc-head { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e4e1dc; }
        .evc-wordmark { margin: 0 -0.42em 0 0; font-weight: 400; font-size: 28px; line-height: 1; letter-spacing: 0.42em; }
        .evc-cardname { margin: 10px 0 0; font-size: 17px; color: #4a4642; }
        .evc-label {
          font-family: var(--font-frutiger), "Avenir Next", "Segoe UI", sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b6762;
        }
        .evc-product {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 28px;
          padding: 22px 0;
          border-bottom: 1px solid #e4e1dc;
        }
        .evc-product img { display: block; width: 100%; height: 266px; object-fit: cover; object-position: 50% 0; }
        .evc-ident { margin: 0 0 12px; }
        .evc-ident dd { margin: 4px 0 0; }
        .evc-designer { font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; }
        .evc-name { font-size: 17px; line-height: 1.25; }
        .evc-specs { margin: 0; border-top: 1px solid #e4e1dc; }
        .evc-specs div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding: 7px 0;
          border-bottom: 1px solid #e4e1dc;
        }
        .evc-specs div:last-child { border-bottom: 0; padding-bottom: 0; }
        .evc-specs dd { margin: 0; font-size: 14px; text-align: right; }
        .evc-record {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid #e4e1dc;
        }
        .evc-record h3 {
          margin: 0 0 14px;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: var(--font-didot), Garamond, "Times New Roman", serif;
        }
        .evc-record dl {
          margin: 0;
          display: grid;
          grid-template-columns: 118px minmax(0, 1fr);
          row-gap: 8px;
          align-items: baseline;
        }
        .evc-record dd {
          margin: 0;
          font-family: var(--font-frutiger), "Avenir Next", "Segoe UI", sans-serif;
          font-size: 13px;
          white-space: nowrap;
        }
        .evc-qr { text-align: center; padding-left: 24px; border-left: 1px solid #e4e1dc; }
        .evc-qr svg {
          display: block;
          width: 104px;
          height: 104px;
          padding: 6px;
          border: 1px solid #e4e1dc;
          background: #fff;
        }
        .evc-save {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          font-family: var(--font-frutiger), "Avenir Next", "Segoe UI", sans-serif;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: #4a4642;
        }
        .evc-save svg { width: 12px; height: 12px; padding: 0; border: 0; }
        .evc-save span { border-bottom: 1px solid #e4e1dc; padding-bottom: 1px; }
        .evc-foot { margin: 18px 0 0; font-size: 14px; color: #4a4642; }
        @media (max-width: 1080px) {
          .evr-solution__inner { grid-template-columns: 1fr; row-gap: 56px; }
          .evr-solution__inner h2 { max-width: 20ch; }
          .evr-card-stage { max-width: 560px; }
        }
        @media (max-width: 560px) {
          .evr-solution__body { font-size: 17px; }
          .evc-card { padding: 28px 20px 22px; }
          .evc-wordmark { font-size: 24px; }
          .evc-product { grid-template-columns: 1fr; gap: 20px; }
          .evc-product img { height: 320px; }
          .evc-record { grid-template-columns: 1fr; }
          .evc-qr { padding-left: 0; border-left: 0; justify-self: start; text-align: left; }
          .evc-record dd { white-space: normal; }
        }
        @media (max-width: 900px) {
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
