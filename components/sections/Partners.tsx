"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STRIP = [
  { n: "MONROE", t: "cy" },
  { n: "VALEO", t: "" },
  { n: "FERODO", t: "go" },
  { n: "CHAMPION", t: "" },
  { n: "MOOG", t: "cy" },
  { n: "DAIKIN", t: "" },
  { n: "GOETZE", t: "go" },
  { n: "NISSHINBO", t: "" },
];

const GRID = [
  { code: "P/01 · EXCL", tag: "SHOCK ABSORBERS", nm: "MONROE", tone: "cy" },
  { code: "P/02 · DIST", tag: "ELECTRICAL · CLUTCH", nm: "VALEO", tone: "" },
  { code: "P/03 · DIST", tag: "BRAKE SYSTEM", nm: "FERODO", tone: "go" },
  { code: "P/04 · DIST", tag: "IGNITION · FILTERS", nm: "CHAMPION", tone: "" },
  { code: "P/05 · EXCL", tag: "STEERING · JOINTS", nm: "MOOG", tone: "cy" },
  { code: "P/06 · DIST", tag: "CLUTCH SYSTEMS", nm: "DAIKIN", tone: "" },
  { code: "P/07 · DIST", tag: "PISTON RINGS", nm: "GOETZE", tone: "go" },
  { code: "P/08 · EXCL", tag: "BRAKE FRICTION", nm: "NISSHINBO", tone: "" },
  { code: "P/09 · DIST", tag: "ENGINE BEARINGS", nm: "GLYCO", tone: "cy" },
  { code: "P/10 · EXCL", tag: "WATER PUMPS", nm: "GMB", tone: "" },
  { code: "P/11 · EXCL", tag: "OIL SEALS", nm: "NATIONAL", tone: "go" },
  { code: "P/12 · EXCL", tag: "SPRINGS", nm: "LESJÖFORS", tone: "" },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // marquee shifts with scroll — parallax-drives the brand strip
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative"
      style={{
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,3vw,3rem) clamp(5rem,8vw,8rem)",
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
        <div className="mono">SECTION 05 ▸ PARTNERS.ARCHIVE</div>
        <div className="mono-sm">AUTHORIZED · EXCLUSIVE</div>
        <div className="corner tr" />
      </div>

      <motion.div
        style={{ y: titleY, marginTop: "4rem", marginBottom: "2.5rem" }}
      >
        <h2
          className="font-display font-black uppercase"
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
          }}
        >
          TRUSTED BY
          <br />
          THE <span className="neon-gold">BEST.</span>
        </h2>
        <div
          style={{
            fontFamily: "var(--font-mono),monospace",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginTop: "0.75rem",
          }}
        >
          ◆ 20+ EXCLUSIVE CYPRUS DISTRIBUTION RIGHTS ◆
        </div>
      </motion.div>

      {/* full-bleed marquee — scroll-driven + auto-scroll combined */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50% - 34px)",
          borderTop: "1px solid var(--grid-hot)",
          borderBottom: "1px solid var(--grid-hot)",
          padding: "1.25rem 0",
          background: "rgba(var(--cyan-rgb),0.025)",
        }}
      >
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ width: "max-content", x: marqueeX }}
        >
          {[...STRIP, ...STRIP, ...STRIP].map((s, i) => (
            <div key={i} className="flex items-center gap-16">
              <span
                className="font-display font-black uppercase"
                style={{
                  fontSize: "clamp(2.5rem,6vw,5rem)",
                  letterSpacing: "0.02em",
                  color:
                    s.t === "cy"
                      ? "var(--cyan)"
                      : s.t === "go"
                      ? "var(--gold)"
                      : "var(--text)",
                  textShadow:
                    s.t === "cy"
                      ? "0 0 18px rgba(var(--cyan-rgb),0.5)"
                      : s.t === "go"
                      ? "0 0 18px rgba(var(--gold-rgb),0.4)"
                      : "none",
                  opacity: 0.92,
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 10px var(--cyan)",
                  flex: "0 0 auto",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 4×3 partner grid with logos */}
      <div
        className="grid partners-grid"
        style={{
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 0,
          marginTop: "3rem",
          borderTop: "1px solid var(--grid-hot)",
          borderLeft: "1px solid var(--grid-hot)",
        }}
      >
        {GRID.map((p, i) => (
          <motion.div
            key={p.nm}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="relative flex flex-col justify-between cursor-pointer group"
            style={{
              borderRight: "1px solid var(--grid-hot)",
              borderBottom: "1px solid var(--grid-hot)",
              aspectRatio: "1.2/1",
              padding: "1.25rem",
              background: "rgba(var(--cyan-rgb),0.015)",
              transition: "background 0.3s ease, transform 0.3s ease",
              overflow: "hidden",
            }}
          >
            {/* diagonal cyan hairlines in the background for texture */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(34,240,255,0.04) 24px, rgba(34,240,255,0.04) 25px)",
                opacity: 0.6,
              }}
            />

            <div
              className="relative z-10"
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 12,
                color: "var(--cyan)",
                letterSpacing: "0.18em",
                opacity: 0.85,
              }}
            >
              {p.code}
            </div>
            <div
              className="relative z-10"
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 11,
                color: "var(--dim)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {p.tag}
            </div>
            <div
              className="relative z-10 font-display font-black uppercase text-right self-end"
              style={{
                fontSize: "clamp(1.35rem,2vw,2rem)",
                lineHeight: 0.9,
                color:
                  p.tone === "cy"
                    ? "var(--cyan)"
                    : p.tone === "go"
                    ? "var(--gold)"
                    : "var(--text)",
                textShadow:
                  p.tone === "cy"
                    ? "0 0 14px rgba(var(--cyan-rgb),0.6)"
                    : p.tone === "go"
                    ? "0 0 14px rgba(var(--gold-rgb),0.5)"
                    : "none",
              }}
            >
              {p.nm}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
