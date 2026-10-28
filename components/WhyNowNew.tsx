export default function WhyNowNew() {
  return (
    <section style={{ padding: "56px 0", background: "#ECEEF0" }}>
      <div className="ev-container">
        <div style={{ maxWidth: "640px" }}>
          <span
            className="ev-eyebrow"
            style={{ display: "inline-block", marginBottom: "20px" }}
          >
            The infrastructure
          </span>
          <h2
            style={{
              fontWeight: 400,
              fontSize: "clamp(28px, 2.6vw, 40px)",
              lineHeight: 1.14,
              letterSpacing: "-0.02em",
              color: "#2a2a2a",
              marginBottom: "20px",
            }}
          >
            Built on Base.
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(15,20,24,0.68)",
              margin: 0,
              maxWidth: "440px",
            }}
          >
            The blockchain for global finance. Built by Coinbase, trusted by
            leading institutions, and open to all.
          </p>
        </div>
      </div>
    </section>
  );
}
