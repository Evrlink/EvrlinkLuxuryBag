const noiseSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>")`;

export default function ProblemNew() {
  return (
    <section id="problem" className="ev-record" data-nav="light">
      <div className="ev-record__orbs" aria-hidden />
      <div
        className="ev-record__grain"
        aria-hidden
        style={{ backgroundImage: noiseSvg }}
      />

      <div className="ev-record__inner">
        <div>
          <div className="ev-record__eyebrow">The Digital Record</div>
          <h2>The story continues beyond the sale.</h2>
          <p>
            Each record brings together an image of the piece, its purchase
            details, and the provenance or story the brand chooses to share.
            Customers can easily revisit the details that matter.
          </p>
        </div>

        <div
          className="ev-orbit"
          role="img"
          aria-label="Purchase, record created, kept and revisited"
        >
          <div className="ev-orbit__ring ev-orbit__ring--1" />
          <div className="ev-orbit__ring ev-orbit__ring--2" />
          <div className="ev-orbit__ring ev-orbit__ring--3" />
          <img
            className="ev-orbit__piece"
            src="/digital-record-piece.webp"
            alt=""
          />
          <div className="ev-orbit__spin">
            <div className="ev-orbit__dot" />
          </div>
          <div className="ev-node ev-n1" />
          <div className="ev-node ev-n2" />
          <div className="ev-node ev-n3" />
          <div className="ev-label ev-l1">PURCHASE</div>
          <div className="ev-label ev-l2">
            RECORD
            <br />
            CREATED
          </div>
          <div className="ev-label ev-l3">
            KEPT &amp;
            <br />
            REVISITED
          </div>
        </div>
      </div>

      <style>{`
        .ev-record {
          position: relative;
          overflow: hidden;
          background: #ECEEF0;
          color: #141414;
          padding: clamp(80px, 10vw, 130px) 24px;
        }
        .ev-record__orbs {
          position: absolute;
          inset: -25% -25%;
          background:
            radial-gradient(50% 55% at 22% 32%, rgba(0,178,199,.12), rgba(0,0,0,0) 65%),
            radial-gradient(45% 50% at 78% 65%, rgba(15,20,24,.04), rgba(0,0,0,0) 65%);
          filter: blur(100px) saturate(1.15);
          animation: evOrbs 30s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .ev-record__grain {
          position: absolute;
          inset: 0;
          opacity: .04;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .ev-record__inner {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 460px) minmax(0, 1fr);
          gap: clamp(48px, 7vw, 100px);
          align-items: center;
        }
        .ev-record__eyebrow {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #5E5B57;
          margin-bottom: 24px;
        }
        .ev-record h2 {
          margin: 0 0 24px;
          font-weight: 400;
          font-size: clamp(34px, 3.75vw, 48px);
          line-height: 1.12;
          letter-spacing: -0.02em;
        }
        .ev-record p {
          margin: 0;
          font-size: 18px;
          line-height: 1.55;
          color: #4A4744;
        }
        .ev-orbit {
          position: relative;
          width: min(460px, 78vw);
          aspect-ratio: 1;
          margin: 0 auto;
        }
        .ev-orbit__ring {
          position: absolute;
          border-radius: 50%;
          box-sizing: border-box;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .ev-orbit__ring--1 { width: 100%; height: 100%; border: 1px solid rgba(20,20,20,.14); }
        .ev-orbit__ring--2 { width: 76%; height: 76%; border: 1px solid rgba(20,20,20,.10); }
        .ev-orbit__ring--3 { width: 52%; height: 52%; border: 1px solid rgba(20,20,20,.07); }
        .ev-orbit__piece {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 39%;
          transform: translate(-50%, -50%);
          mix-blend-mode: multiply;
        }
        .ev-orbit__spin {
          position: absolute;
          inset: 0;
          animation: evSpin 9s linear infinite;
        }
        .ev-orbit__dot {
          position: absolute;
          left: 50%;
          top: 0;
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          border-radius: 50%;
          background: #141414;
          box-shadow: 0 0 12px 3px rgba(20,20,20,.18);
        }
        .ev-node {
          position: absolute;
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          border-radius: 50%;
          border: 1px solid #141414;
          box-sizing: border-box;
          background: #ECEEF0;
          animation: evNode 9s linear infinite;
        }
        .ev-label {
          position: absolute;
          width: 120px;
          margin-left: -60px;
          text-align: center;
          font-size: 11px;
          letter-spacing: 2.5px;
          line-height: 1.5;
          color: #5E5B57;
          animation: evLabel 9s linear infinite;
        }
        .ev-n1 { left: 50%; top: 0%; animation-delay: 0s; }
        .ev-n2 { left: 93.3%; top: 75%; animation-delay: 3s; }
        .ev-n3 { left: 6.7%; top: 75%; animation-delay: 6s; }
        .ev-l1 { left: 50%; top: -38px; animation-delay: 0s; }
        .ev-l2 { left: 93.3%; top: calc(75% + 18px); animation-delay: 3s; }
        .ev-l3 { left: 6.7%; top: calc(75% + 18px); animation-delay: 6s; }
        @keyframes evOrbs {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-3%,2%) scale(1.06); }
          100% { transform: translate(2%,-1.5%) scale(1.03); }
        }
        @keyframes evSpin { to { transform: rotate(360deg); } }
        @keyframes evNode {
          0%, 26% { background: #141414; box-shadow: 0 0 0 6px rgba(20,20,20,.08); }
          36%, 100% { background: #ECEEF0; box-shadow: 0 0 0 0 rgba(20,20,20,0); }
        }
        @keyframes evLabel {
          0%, 26% { color: #141414; }
          36%, 100% { color: #5E5B57; }
        }
        @media (max-width: 820px) {
          .ev-record__inner { grid-template-columns: 1fr; }
          .ev-orbit { margin-top: 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ev-record__orbs,
          .ev-orbit__spin,
          .ev-node,
          .ev-label { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
