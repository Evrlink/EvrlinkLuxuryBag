"use client";

import type { CSSProperties, FormEvent } from "react";
import { useId, useState } from "react";

const G = {
  teal: "#00B2C7",
  ink: "#2A2A2A",
  inkDim: "rgba(42,42,42,0.65)",
};

export default function ContactForm() {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "early-access",
          name: name.trim() || undefined,
          email: email.trim(),
          message: message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setErrMsg(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("err");
      setErrMsg("Network error. Please try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrMsg("");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "44px 40px 40px",
        background: "#ffffff",
        border: "1px solid rgba(0,178,199,0.18)",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          fontWeight: 500,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "rgba(0,178,199,0.72)",
          margin: "0 0 12px",
        }}
      >
        Contact
      </p>
      <h2
        id={titleId}
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 300,
          letterSpacing: "2.5px",
          lineHeight: 1.3,
          color: G.ink,
          margin: "0 0 28px",
        }}
      >
        Get early access
      </h2>

      {status === "ok" ? (
        <>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 400,
              color: G.inkDim,
              lineHeight: 1.75,
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            Thank you. We&apos;ll get back to you shortly.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ev-btn"
            style={{ marginTop: "24px" }}
          >
            Send another message
          </button>
        </>
      ) : (
        <form onSubmit={submit} aria-labelledby={titleId}>
          <label style={labelStyle}>
            Name <span style={{ opacity: 0.45 }}>(optional)</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={200}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Message
            <textarea
              name="message"
              required
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={8000}
              style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
            />
          </label>

          {status === "err" && errMsg && (
            <p style={{ color: "rgba(232,180,180,0.95)", fontSize: "13px", margin: "0 0 14px" }}>
              {errMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="ev-btn"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "2.5px",
  textTransform: "uppercase",
  color: G.inkDim,
  marginBottom: "18px",
};

const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: "0.02em",
  color: G.ink,
  background: "rgba(0,178,199,0.04)",
  border: "1px solid rgba(0,178,199,0.24)",
  borderRadius: "4px",
  outline: "none",
  boxSizing: "border-box",
};
