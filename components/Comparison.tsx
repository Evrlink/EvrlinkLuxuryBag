const rows: {
  label: string;
  marks: ["yes" | "no" | "muted"][];
}[] = [
  { label: "Non-intrusive to production", marks: ["yes", "no", "no"] },
  { label: "Created at checkout", marks: ["yes", "no", "no"] },
  { label: "Piece's story accessible for its lifecycle", marks: ["yes", "no", "no"] },
  { label: "Shopify app and API available", marks: ["yes", "no", "no"] },
  { label: "Custom fields for every brand", marks: ["yes", "no", "no"] },
  { label: "Brand dashboard", marks: ["yes", "muted", "muted"] },
  { label: "Authenticity proof on owner's phone", marks: ["yes", "no", "no"] },
  { label: "No app needed", marks: ["yes", "muted", "muted"] },
];

function Mark({ kind }: { kind: "yes" | "no" | "muted" }) {
  if (kind === "no") {
    return (
      <svg
        aria-label="No"
        role="img"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="#9A9692"
        strokeWidth="1.3"
      >
        <path d="M2 2 L12 12 M12 2 L2 12" />
      </svg>
    );
  }

  if (kind === "muted") {
    return (
      <svg
        aria-label="Yes"
        role="img"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#9A9692"
        strokeWidth="1.4"
      >
        <path d="M4 10.5 L8.2 14.5 L16 5.5" />
      </svg>
    );
  }

  return (
    <svg
      aria-label="Yes"
      role="img"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#141414"
      strokeWidth="1.5"
    >
      <path d="M4 10.5 L8.2 14.5 L16 5.5" />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" data-nav="light">
      <div className="ev-container">
        <div className="ev-intro">
          <div className="ev-kicker">THE DIFFERENCE</div>
          <h2>
            Beyond Authentication.
            <br />
            A lasting Journey.
          </h2>
        </div>

        <div className="ev-scroll">
          <div className="ev-table">
            <div className="ev-band" aria-hidden="true" />

            <div className="ev-grid ev-grid--head">
              <div />
              <div className="ev-head ev-head--evrlink">EVRLINK</div>
              <div className="ev-head">MICROCHIPS</div>
              <div className="ev-head">NFC / QR TAGS</div>
            </div>

            {rows.map((row) => (
              <div className="ev-grid ev-row" key={row.label}>
                <div className="ev-label">{row.label}</div>
                {row.marks.map((mark, i) => (
                  <div className="ev-cell" key={`${row.label}-${i}`}>
                    <Mark kind={mark} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #comparison {
          background: #FFFFFF;
          color: #141414;
          font-family: var(--font-frutiger), Frutiger, "Avenir Next", "Segoe UI", Arial, sans-serif;
          padding: 8px 0 36px;
          scroll-margin-top: 80px;
        }
        #comparison .ev-intro {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 28px;
        }
        #comparison .ev-kicker {
          font-size: 12px;
          letter-spacing: 3px;
          color: #5E5B57;
        }
        #comparison h2 {
          margin: 0;
          font-size: 46px;
          line-height: 1.12;
          font-weight: 400;
          letter-spacing: -1px;
        }
        #comparison .ev-scroll { overflow-x: auto; }
        #comparison .ev-table { position: relative; }
        #comparison .ev-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; }
        #comparison .ev-grid--head,
        #comparison .ev-row { position: relative; }
        #comparison .ev-row {
          border-top: 1px solid rgba(20,20,20,.1);
          transition: background-color .35s ease;
        }
        #comparison .ev-row:last-child { border-bottom: 1px solid rgba(20,20,20,.1); }
        #comparison .ev-row:hover { background-color: rgba(20,20,20,.02); }
        #comparison .ev-label {
          position: static;
          width: auto;
          margin: 0;
          text-align: left;
          letter-spacing: normal;
          line-height: normal;
          animation: none;
          padding: 0 24px;
          height: 52px;
          display: flex;
          align-items: center;
          font-size: 17px;
          color: #141414;
          white-space: nowrap;
        }
        #comparison .ev-cell {
          height: 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        #comparison .ev-note {
          font-size: 11px;
          letter-spacing: .3px;
          color: #7A7672;
        }
        #comparison .ev-head {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          letter-spacing: 2.5px;
          color: #5E5B57;
        }
        #comparison .ev-head--evrlink {
          color: #141414;
          font-weight: 600;
          letter-spacing: 4px;
        }
        #comparison .ev-band {
          position: absolute;
          left: 40%;
          width: 20%;
          top: 0;
          bottom: 0;
          background: #F1F0EC;
          border-radius: 14px;
          pointer-events: none;
        }
        @media (max-width: 960px) {
          #comparison .ev-label,
          #comparison .ev-cell {
            height: auto;
            min-height: 52px;
          }
          #comparison .ev-label {
            white-space: normal;
            line-height: 1.3;
          }
        }
        @media (max-width: 860px) {
          #comparison { padding: 4px 0 32px; }
          #comparison h2 { font-size: 34px; }
        }
        @media (max-width: 720px) {
          #comparison .ev-label {
            font-size: 15px;
            padding: 14px 12px 14px 0;
            min-height: 48px;
          }
          #comparison .ev-cell { min-height: 48px; }
          #comparison .ev-head {
            height: auto;
            min-height: 52px;
            padding: 8px 4px;
            font-size: 9px;
            letter-spacing: 0.4px;
            line-height: 1.25;
            text-align: center;
          }
          #comparison .ev-head--evrlink {
            font-size: 10px;
            letter-spacing: 1px;
          }
        }
      `}</style>
    </section>
  );
}
