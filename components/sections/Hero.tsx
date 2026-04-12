"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!wordRef.current) return;
    const st = gsap.to(wordRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: wordRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
      style={{
        padding:
          "clamp(3rem,6vw,6rem) clamp(1.5rem,3vw,3rem) clamp(5rem,8vw,7rem)",
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
        <div className="corner tr" />
      </div>

      {/* wordmark */}
      <h1
        ref={wordRef}
        className="font-display font-black lowercase relative wordmark-pull"
        style={{
          fontSize: "clamp(7rem,24vw,25rem)",
          lineHeight: 0.78,
          letterSpacing: "-0.05em",
          color: "var(--cyan)",
          textShadow:
            "0 0 16px rgba(var(--cyan-rgb),0.6), 0 0 42px rgba(var(--cyan-rgb),0.35), 0 0 90px rgba(var(--cyan-rgb),0.18)",
          marginTop: "clamp(2rem,4vw,4rem)",
        }}
      >
        <span
          style={{
            color: "var(--bg)",
            WebkitTextStroke: "2px var(--gold)",
            textShadow:
              "0 0 22px rgba(var(--gold-rgb),0.45), 0 0 50px rgba(var(--gold-rgb),0.22)",
          }}
        >
          et
        </span>
        ex
      </h1>

      <div
        className="grid items-end hero-subline"
        style={{
          gridTemplateColumns: "1.3fr 1.2fr 0.8fr",
          gap: "2rem",
          marginTop: "clamp(1rem,2vw,2rem)",
          paddingRight: "clamp(1rem,3vw,3rem)",
        }}
      >
        <div>
          <div className="mono mb-3">◢ THE AUTO PARTS COMPANY</div>
          <h2
            className="font-display font-extrabold uppercase"
            style={{
              fontSize: "clamp(2rem,5vw,4.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            PARTS.<br />
            <span
              style={{
                color: "var(--bg)",
                WebkitTextStroke: "1.5px var(--text)",
              }}
            >
              PRECISION.
            </span>
            <br />
            <span className="neon-text">POWER.</span>
          </h2>
        </div>
        <div>
          <div className="mono mb-3">FILE ▸ ABOUT.DAT</div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "34ch",
            }}
          >
            Cyprus&apos;s{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              largest and most dependable
            </strong>{" "}
            stockist-wholesale distributor of automotive spare parts. Founded
            1971 by Andreas Theocharous. Six outlets. Sixty-six specialists.
            Thirty product lines for Japanese, Korean and European cars, vans
            and light trucks.
          </p>
        </div>
        {/* 1971 founding-year plate (miniaturized to fit the portrait slot) */}
        <div
          className="hero-plate relative w-full flex flex-col justify-between overflow-hidden"
          style={{
            aspectRatio: "1/1.15",
            border: "1px solid var(--grid-hot)",
            padding: "1rem 0.85rem",
            background:
              "radial-gradient(circle at 50% 35%, rgba(var(--gold-rgb),0.12), transparent 70%), linear-gradient(180deg, rgba(var(--cyan-rgb),0.05), transparent)",
          }}
        >
          <div
            className="absolute pointer-events-none opacity-55"
            style={{
              left: "50%",
              top: "48%",
              transform: "translate(-50%,-50%)",
              width: "86%",
              aspectRatio: "1/1",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              width="100%"
              height="100%"
              fill="none"
              stroke="rgba(255,204,51,0.4)"
              strokeWidth="1"
            >
              <circle cx="100" cy="100" r="92" />
              <circle cx="100" cy="100" r="72" strokeDasharray="2 4" />
              <circle cx="100" cy="100" r="52" />
              <circle cx="100" cy="100" r="32" strokeDasharray="1 3" />
              <line
                x1="100"
                y1="2"
                x2="100"
                y2="18"
                stroke="#ffcc33"
                strokeWidth="2"
              />
              <line
                x1="100"
                y1="182"
                x2="100"
                y2="198"
                stroke="#ffcc33"
                strokeWidth="2"
              />
              <line
                x1="2"
                y1="100"
                x2="18"
                y2="100"
                stroke="#ffcc33"
                strokeWidth="2"
              />
              <line
                x1="182"
                y1="100"
                x2="198"
                y2="100"
                stroke="#ffcc33"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            className="mono-sm flex justify-between relative z-10"
            style={{ fontSize: 10 }}
          >
            <span>REC ◆ ORIGIN</span>
            <span>SESSION.START</span>
          </div>
          <div
            className="font-display font-black text-center relative z-10"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 0.85,
              color: "var(--bg)",
              WebkitTextStroke: "1.5px var(--gold)",
              textShadow: "0 0 22px rgba(var(--gold-rgb),0.35)",
              letterSpacing: "-0.03em",
            }}
          >
            <span
              style={{
                color: "var(--gold)",
                WebkitTextStroke: 0,
                textShadow:
                  "0 0 14px rgba(var(--gold-rgb),0.75), 0 0 28px rgba(var(--gold-rgb),0.4)",
              }}
            >
              19
            </span>
            71
          </div>
          <div
            className="flex justify-between relative z-10"
            style={{
              fontFamily: "var(--font-mono),monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              opacity: 0.9,
            }}
          >
            <span>◆ FOUNDED</span>
            <span>NICOSIA · CY</span>
          </div>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 flex justify-between items-center gap-8 hero-ticker"
        style={{
          borderTop: "1px solid var(--grid-hot)",
          padding:
            "0.85rem clamp(1.5rem,3vw,3rem) 0.85rem clamp(5rem,7vw,7rem)",
          fontFamily: "var(--font-mono),monospace",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
          background: "rgba(5,6,8,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        <span>
          ▸ MONROE
          <Bar />
          VALEO
          <Bar />
          FERODO
          <Bar />
          CHAMPION
          <Bar />
          MOOG
          <Bar />
          DAIKIN
          <Bar />
          GOETZE
        </span>
        <span style={{ color: "var(--cyan)" }}>
          SINCE 1971 <span className="blink">█</span>
        </span>
        <span>SCROLL ▾ LEGACY</span>
      </div>
    </section>
  );
}

function Bar() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 24,
        height: 1,
        background: "var(--cyan)",
        margin: "0 0.5rem",
        verticalAlign: "middle",
      }}
    />
  );
}
