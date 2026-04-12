"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Counter({
  target,
  duration = 1.5,
}: {
  target: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = String(target).length;
    const pad = (n: number) => String(n).padStart(digits, "0");
    el.textContent = pad(0);

    // ScrollTrigger fires reliably even when Lenis controls the scroll
    let raf = 0;
    const runTween = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - t, 3);
        if (ref.current) ref.current.textContent = pad(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 95%",
      once: true,
      onEnter: runTween,
    });

    // fallback: if ScrollTrigger hasn't fired within 400ms (element already in view
    // or ST sync issue with Lenis), run the counter anyway
    const fallback = setTimeout(() => {
      if (ref.current && ref.current.textContent === pad(0)) runTween();
    }, 400);

    return () => {
      st.kill();
      clearTimeout(fallback);
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return <span ref={ref}>00</span>;
}

const STATS = [
  {
    idx: "[ 01 ]",
    value: 55,
    label: "YEARS IN OPERATION",
    sublabel: "SINCE 1971 · NICOSIA",
    tone: "cyan" as const,
  },
  {
    idx: "[ 02 ]",
    value: 6,
    label: "DISTRIBUTION OUTLETS",
    sublabel: "FULL-ISLAND COVERAGE",
  },
  {
    idx: "[ 03 ]",
    value: 9,
    label: "PRODUCT CATEGORIES",
    sublabel: "30 LINES · 23 SUPPLIERS",
    tone: "gold" as const,
  },
  {
    idx: "[ 04 ]",
    value: 66,
    label: "SPECIALISTS",
    sublabel: "4,500 SQ.M WAREHOUSING",
  },
];

export default function Metrics() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars", tagName: "span" });
    const chars = split.chars || [];

    gsap.set(chars, { yPercent: 110, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, []);

  return (
    <section
      id="metrics"
      className="relative"
      style={{
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,3vw,3rem) clamp(6rem,10vw,10rem)",
        minHeight: "100vh",
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
        <div className="mono">SECTION 03 ▸ METRICS.LIVE</div>
        <div className="mono-sm neon-text">◉ RECORDING</div>
        <div className="corner tr" />
      </div>

      <div
        className="flex justify-between items-baseline"
        style={{ marginBottom: "3rem", marginTop: "4rem" }}
      >
        <h2
          ref={headlineRef}
          className="font-display font-black uppercase bleed-left"
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            overflow: "hidden",
          }}
        >
          BY THE NUMBERS.
        </h2>
        <div className="mono text-right" style={{ maxWidth: "26ch" }}>
          SNAPSHOT ▸ 2026 Q2
          <br />
          SOURCE ▸ etex://ops.stats
        </div>
      </div>

      <div
        className="grid bleed-horiz metrics-hud"
        style={{
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 0,
          border: "1px solid var(--grid-hot)",
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden flex flex-col justify-between"
            style={{
              borderRight:
                i < STATS.length - 1 ? "1px solid var(--grid-hot)" : "none",
              padding: "2.25rem 1.75rem 2rem",
              minHeight: 320,
              background: "rgba(var(--cyan-rgb),0.015)",
            }}
          >
            <div className="corner tl" style={{ width: 12, height: 12 }} />
            <div className="corner br" style={{ width: 12, height: 12 }} />
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                height: 3,
                background:
                  "linear-gradient(90deg, transparent, var(--cyan), transparent)",
                opacity: 0.4,
              }}
            />
            <div
              className="flex justify-between items-center hud-idx"
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "var(--cyan)",
                textTransform: "uppercase",
              }}
            >
              <span>{s.idx}</span>
              <span
                className="hud-idx-line"
                style={{
                  flex: "0 0 24px",
                  height: 1,
                  background: "var(--cyan)",
                  opacity: 0.5,
                  marginLeft: "0.5rem",
                }}
              />
            </div>
            <div
              className="font-display font-black hud-value"
              style={{
                fontSize: "clamp(5rem,10vw,9rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
                margin: "1rem 0",
                color:
                  s.tone === "cyan"
                    ? "var(--cyan)"
                    : s.tone === "gold"
                    ? "var(--gold)"
                    : "var(--text)",
                textShadow:
                  s.tone === "cyan"
                    ? "0 0 20px rgba(var(--cyan-rgb),0.6), 0 0 40px rgba(var(--cyan-rgb),0.3)"
                    : s.tone === "gold"
                    ? "0 0 20px rgba(var(--gold-rgb),0.6), 0 0 40px rgba(var(--gold-rgb),0.3)"
                    : "none",
              }}
            >
              <Counter target={s.value} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                  marginTop: "0.4rem",
                }}
              >
                {s.sublabel}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="flex justify-between bleed-horiz"
        style={{
          padding: "0.75rem 1rem",
          border: "1px solid var(--grid-hot)",
          borderTop: "none",
          fontFamily: "var(--font-mono),monospace",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span>◆ LOG ▸ OPS.STATS.LIVE</span>
        <span style={{ color: "var(--cyan)" }}>
          ◉ SYNC 2026-04-10 · 14:32:08 UTC+2
        </span>
        <span>▸ DENSITY 100%</span>
      </div>
    </section>
  );
}
