"use client";

export default function Terminal() {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        padding: "clamp(4rem,6vw,6rem) clamp(1.5rem,3vw,3rem) 3rem",
        borderTop: "1px solid var(--grid-hot)",
        background:
          "linear-gradient(180deg, transparent, rgba(var(--cyan-rgb),0.04))",
      }}
    >
      <div
        className="absolute flex justify-between items-center"
        style={{
          top: "clamp(1.5rem,3vw,3rem)",
          left: "clamp(1.5rem,3vw,3rem)",
          right: "clamp(1.5rem,3vw,3rem)",
        }}
      >
        <div className="corner tl" />
        <div className="mono">SECTION 08 ▸ TERMINAL.EXIT</div>
        <div className="mono-sm">CLOSE_SESSION</div>
        <div className="corner tr" />
      </div>

      <div
        className="font-display font-black lowercase"
        style={{
          fontSize: "clamp(5rem,13vw,13rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          color: "var(--bg)",
          WebkitTextStroke: "1.5px var(--cyan)",
          textShadow: "0 0 30px rgba(var(--cyan-rgb),0.25)",
          marginTop: "4rem",
          marginBottom: "2rem",
        }}
      >
        etex
      </div>

      <div
        className="grid terminal-cols"
        style={{
          gridTemplateColumns: "1.3fr 1fr 1fr",
          gap: "3rem",
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "1rem",
            }}
          >
            ◢ CONTACT
          </h4>
          {[
            ["tel  ", "+357 22 433 244"],
            ["fax  ", "+357 22 437 522"],
            ["mail ", "info@etex.com.cy"],
            ["web  ", "etex.com.cy"],
          ].map(([k, v]) => (
            <p
              key={k}
              className="mono"
              style={{
                fontSize: 12,
                lineHeight: 1.9,
                letterSpacing: "0.05em",
                color: "var(--muted)",
                textTransform: "none",
              }}
            >
              <span style={{ color: "var(--cyan)" }}>› </span>
              {k}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>{v}</strong>
            </p>
          ))}
        </div>
        <div>
          <h4
            style={{
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "1rem",
            }}
          >
            ◢ HEAD OFFICE
          </h4>
          {["6 KENNEDY AVENUE", "PALLOURIOTISSA", "1035 NICOSIA", "CYPRUS"].map(
            (line) => (
              <p
                key={line}
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  lineHeight: 1.9,
                  letterSpacing: "0.05em",
                  color: "var(--muted)",
                }}
              >
                {line}
              </p>
            )
          )}
          <p
            style={{
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              lineHeight: 1.9,
              letterSpacing: "0.05em",
              color: "var(--cyan)",
              marginTop: "0.75rem",
            }}
          >
            ► P.O. BOX 21879, 1514
          </p>
        </div>
        <div>
          <h4
            style={{
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "1rem",
            }}
          >
            ◢ SESSION
          </h4>
          {[
            ["FOUNDED  ", "1971"],
            ["OPS      ", "55 YRS"],
            ["OUTLETS  ", "06 · CYPRUS"],
            ["STAFF    ", "66"],
            ["LINES    ", "30 · 23 SUPPL."],
            ["STORAGE  ", "4,500 SQ.M"],
          ].map(([k, v]) => (
            <p
              key={k}
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 12,
                lineHeight: 1.9,
                letterSpacing: "0.05em",
                color: "var(--muted)",
                whiteSpace: "pre",
              }}
            >
              {k}
              <strong style={{ color: "var(--text)", fontWeight: 400 }}>{v}</strong>
            </p>
          ))}
        </div>
      </div>

      <div
        className="flex justify-between items-center"
        style={{
          marginTop: "3rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid var(--grid-hot)",
          fontFamily: "var(--font-mono),monospace",
          fontSize: 12,
          letterSpacing: "0.18em",
          color: "var(--dim)",
          textTransform: "uppercase",
        }}
      >
        <span>◉ etex · the auto parts company · since 1971</span>
        <span style={{ color: "var(--cyan)" }}>
          SESSION 2026.04.10 <span className="blink">█</span>
        </span>
        <span>© etex ltd · nicosia · cyprus</span>
      </div>
    </section>
  );
}
