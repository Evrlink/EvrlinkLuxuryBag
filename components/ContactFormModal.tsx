"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

export type ContactIntent = "early-access" | "investors";

const G = {
  gold: "#C9A84C",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.45)",
  bg: "#131314",
};

const TITLE: Record<ContactIntent, string> = {
  "early-access": "Get early access",
  investors: "For investors",
};

type Props = {
  open: boolean;
  intent: ContactIntent;
  onClose: () => void;
};

export default function ContactFormModal({ open, intent, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrMsg("");
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLInputElement>("input[type=email]")?.focus();
  }, [open, intent]);

  if (!open) return null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
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

  return (
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(8,8,10,0.72)",
        backdropFilter: "blur(10px)",
      }}
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          padding: "40px 36px 36px",
          background: G.bg,
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "2px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "36px",
            height: "36px",
            border: "none",
            borderRadius: "4px",
            background: "transparent",
            color: G.creamDim,
            fontSize: "22px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <p
          id={titleId}
          style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.65)",
            margin: "0 0 10px",
          }}
        >
          Contact
        </p>
        <h2
          style={{
            fontFamily: "var(--font-didot-title), var(--font-didot), Georgia, serif",
            fontSize: "1.85rem",
            fontWeight: 300,
            color: G.cream,
            margin: "0 0 28px",
            paddingRight: "28px",
          }}
        >
          {TITLE[intent]}
        </h2>

        {status === "ok" ? (
          <p style={{ fontSize: "14px", color: G.creamDim, lineHeight: 1.75, margin: 0 }}>
            Thank you. We&apos;ll get back to you shortly.
          </p>
        ) : (
          <form onSubmit={submit}>
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

            <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rim-btn rim-btn--primary rim-btn--compact"
                style={{ flex: "1 1 140px" }}
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
              <button type="button" onClick={onClose} className="rim-btn rim-btn--secondary rim-btn--compact">
                Cancel
              </button>
            </div>
          </form>
        )}

        {status === "ok" && (
          <button
            type="button"
            onClick={onClose}
            className="rim-btn rim-btn--secondary rim-btn--compact"
            style={{ marginTop: "24px" }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: G.creamDim,
  marginBottom: "18px",
};

const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  fontSize: "14px",
  fontWeight: 300,
  color: G.cream,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.2)",
  borderRadius: "4px",
  outline: "none",
  boxSizing: "border-box",
};
