"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function FinalCTANew() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: `Company: ${company.trim()}\n\nRequesting a meeting / early access.`,
          intent: "early-access",
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          (data as { error?: string }).error ?? "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: "#2a2a2a",
        color: "#efe9de",
        padding: "80px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Vertical line grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(239,233,222,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 100%",
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
        }}
      />

      <div
        className="ev-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="ev-finalcta-inner">
          {/* Left copy */}
          <div>
            <span
              className="ev-eyebrow ev-eyebrow--dark"
              style={{ display: "inline-block", marginBottom: "20px" }}
            >
              Reach out and connect
            </span>
            <h2
              style={{
                fontWeight: 400,
                fontSize: "clamp(32px, 3.8vw, 52px)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: "#efe9de",
                maxWidth: "14ch",
                marginBottom: "20px",
              }}
            >
              Learn more about the{" "}
              <span style={{ color: "rgba(239,233,222,0.55)" }}>
                ownership layer
              </span>
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(239,233,222,0.7)",
                maxWidth: "46ch",
              }}
            >
              Contact us for more information
            </p>
          </div>

          {/* Right form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Name */}
            <div
              className="ev-field"
              style={{ borderBottom: "1px solid rgba(239,233,222,0.15)" }}
            >
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "18px 0",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  color: "#efe9de",
                  outline: "none",
                }}
              />
            </div>

            {/* Company */}
            <div
              className="ev-field"
              style={{ borderBottom: "1px solid rgba(239,233,222,0.15)" }}
            >
              <input
                type="text"
                placeholder="Company"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "18px 0",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  color: "#efe9de",
                  outline: "none",
                }}
              />
            </div>

            {/* Email */}
            <div
              className="ev-field"
              style={{ borderBottom: "1px solid rgba(239,233,222,0.15)" }}
            >
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  padding: "18px 0",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  color: "#efe9de",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginTop: "8px", flexWrap: "wrap" }}>
              <button
                type="submit"
                className="ev-btn"
                disabled={status === "loading"}
                style={{ opacity: status === "loading" ? 0.7 : 1 }}
              >
                {status === "loading" ? "Sending…" : "Request Meeting"}
                {status !== "loading" && (
                  <span className="ev-btn-arrow" aria-hidden="true" />
                )}
              </button>
            </div>

            {status === "success" && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#efe9de",
                }}
              >
                ✓ Received. A member of our team will be in touch within 48 hours.
              </span>
            )}
            {status === "error" && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#ff6b6b",
                }}
              >
                {errorMsg}
              </span>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .ev-finalcta-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .ev-field:focus-within {
          border-bottom-color: #efe9de !important;
        }
        input::placeholder { color: rgba(239,233,222,0.55); letter-spacing: 0.02em; }
        @media (max-width: 720px) {
          .ev-finalcta-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
