"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function FinalCTANew() {
  const sectionRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const closing = closingRef.current;
    const canvas = canvasRef.current;
    if (!section || !closing || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPEED = 0.018;
    const OPACITY = 0.42;
    const RAYS = 34;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let originY = 0;
    let originX = 0;
    let pointerX: number | null = null;
    let frame: number | null = null;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      originY = closing.offsetTop + 40;
      if (!originX) originX = width / 2;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const target =
        pointerX != null ? width / 2 + (pointerX - width / 2) * 0.06 : width / 2;
      originX += (target - originX) * 0.05;
      const scale = width / 1280;
      const top = originY - 210;

      const thread = ctx.createLinearGradient(0, top, 0, originY);
      thread.addColorStop(0, "rgba(250,249,246,0)");
      thread.addColorStop(1, "rgba(250,249,246,.55)");
      ctx.strokeStyle = thread;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2, top);
      ctx.lineTo(originX, originY);
      ctx.stroke();

      const glow = ctx.createRadialGradient(originX, originY, 0, originX, originY, 60);
      glow.addColorStop(0, "rgba(250,249,246,.18)");
      glow.addColorStop(1, "rgba(250,249,246,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(originX - 60, originY - 60, 120, 120);

      for (let i = 0; i < RAYS; i++) {
        const frac = (i / RAYS + time * SPEED) % 1;
        const offset = (6 / (1 - frac + 0.012)) * scale;
        if (offset > width * 1.8) continue;
        const alpha =
          Math.min(1, frac * 5) * OPACITY * Math.min(1, offset / (120 * scale));
        ctx.lineWidth = 0.5 + frac * 1.6;
        for (const side of [-1, 1]) {
          const endX = originX + side * offset;
          const ray = ctx.createLinearGradient(originX, originY, endX, height);
          ray.addColorStop(0, "rgba(250,249,246,0)");
          ray.addColorStop(0.35, `rgba(250,249,246,${alpha * 0.6})`);
          ray.addColorStop(1, `rgba(250,249,246,${alpha})`);
          ctx.strokeStyle = ray;
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.lineTo(endX, height);
          ctx.stroke();
        }
      }
    };

    const started = performance.now();
    const loop = (now: number) => {
      draw((now - started) / 1000);
      frame = visible && !still ? requestAnimationFrame(loop) : null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !still) frame = requestAnimationFrame(loop);
    });
    observer.observe(section);

    const onMove = (event: MouseEvent) => {
      pointerX = event.clientX - section.getBoundingClientRect().left;
    };
    const onLeave = () => {
      pointerX = null;
    };
    const onResize = () => {
      resize();
      if (still) draw(0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(section);

    resize();
    if (still) draw(0);
    else frame = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
      ref={sectionRef}
      id="contact"
      className="ev-thread"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0E0E0F",
        color: "#FAF9F6",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      <div className="ev-thread__contact">
        <div>
          <div className="ev-thread__eyebrow">Reach out and connect</div>
          <h2>Learn how to capture a product&apos;s lifetime value.</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ev-field">
            <label htmlFor="ev-name">Name</label>
            <input
              id="ev-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="ev-field">
            <label htmlFor="ev-co">Company</label>
            <input
              id="ev-co"
              name="company"
              type="text"
              autoComplete="organization"
              required
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
          <div className="ev-field">
            <label htmlFor="ev-em">Email</label>
            <input
              id="ev-em"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="ev-thread__btn"
            disabled={status === "loading"}
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Sending…" : "Request a meeting"}
          </button>
          {status === "success" && (
            <span className="ev-thread__status">
              Received. A member of our team will be in touch within 48 hours.
            </span>
          )}
          {status === "error" && (
            <span className="ev-thread__status ev-thread__status--error">{errorMsg}</span>
          )}
        </form>
      </div>

      <div ref={closingRef} className="ev-thread__closing">
        <div className="ev-thread__shade" aria-hidden />
        <h2>
          The piece continues.
          <br />
          So should its story.
        </h2>
      </div>

      <style>{`
        .ev-thread__contact {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
          padding: clamp(96px, 11vw, 140px) 24px 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(40px, 7.5vw, 96px);
        }
        .ev-thread__eyebrow {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(250,249,246,.62);
          margin-bottom: 28px;
        }
        .ev-thread__contact h2 {
          margin: 0;
          font-weight: 400;
          font-size: clamp(32px, 3.75vw, 48px);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .ev-thread form {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding-top: 32px;
        }
        .ev-thread .ev-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ev-thread .ev-field label {
          font-size: 12px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(250,249,246,.62);
        }
        .ev-thread .ev-field input {
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(250,249,246,.14);
          color: #FAF9F6;
          font: inherit;
          font-size: 17px;
          padding: 8px 0 12px;
          outline: none;
          transition: border-color .3s;
          border-radius: 0;
        }
        .ev-thread .ev-field input:focus {
          border-bottom-color: rgba(250,249,246,.6);
        }
        .ev-thread__btn {
          align-self: flex-start;
          margin-top: 8px;
          font: inherit;
          font-size: 14px;
          letter-spacing: .5px;
          padding: 15px 30px;
          border-radius: 999px;
          cursor: pointer;
          background: transparent;
          color: #FAF9F6;
          border: 1px solid rgba(250,249,246,.35);
          transition: background .3s, color .3s;
        }
        .ev-thread__btn:hover:not(:disabled) {
          background: #FAF9F6;
          color: #0E0E0F;
        }
        .ev-thread__status {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FAF9F6;
        }
        .ev-thread__status--error { color: #ff6b6b; }
        .ev-thread__closing {
          position: relative;
          height: clamp(460px, 50vw, 640px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 16px 0;
          box-sizing: border-box;
          text-align: center;
        }
        .ev-thread__shade {
          position: absolute;
          left: 50%;
          top: 58%;
          width: min(700px, 92%);
          height: 240px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(closest-side, rgba(14,14,15,.9), rgba(14,14,15,0));
          pointer-events: none;
        }
        .ev-thread__closing h2 {
          position: relative;
          margin: 0;
          font-weight: 400;
          font-size: clamp(32px, 4.4vw, 56px);
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        @media (max-width: 760px) {
          .ev-thread__contact { grid-template-columns: 1fr; }
          .ev-thread form { padding-top: 0; }
        }
      `}</style>
    </section>
  );
}
