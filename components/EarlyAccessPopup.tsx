"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function EarlyAccessPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-early-access-popup", onOpen);
    return () => window.removeEventListener("open-early-access-popup", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get early access"
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(12, 22, 26, 0.35)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 96vw)",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
          borderRadius: "16px",
          padding: "20px",
          background:
            "radial-gradient(ellipse 95% 70% at 50% -20%, rgba(0,178,199,0.10), transparent 55%), #ffffff",
          border: "1px solid rgba(0,178,199,0.26)",
          boxShadow: "0 24px 80px -24px rgba(9, 22, 25, 0.45)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <span
            className="ev-eyebrow"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#00B2C7" }}
          >
            Early Access
          </span>
          <button
            type="button"
            aria-label="Close popup"
            onClick={() => setOpen(false)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "999px",
              border: "1px solid rgba(0,178,199,0.26)",
              background: "rgba(0,178,199,0.06)",
              color: "#2a2a2a",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

