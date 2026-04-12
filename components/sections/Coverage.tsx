"use client";

import { motion } from "framer-motion";

const REGIONS = [
  {
    num: "◢ REGION 01 · JPN",
    flag: ["JAPANESE", "ORIGIN."],
    brands: [
      "HONDA",
      "NISSAN",
      "MAZDA",
      "MITSUBISHI",
      "SUZUKI",
      "SUBARU",
      "ISUZU",
      "DAIHATSU",
    ],
    code: "JP",
  },
  {
    num: "◢ REGION 02 · KOR",
    flag: ["KOREAN", "ORIGIN."],
    brands: ["HYUNDAI", "KIA", "DAEWOO", "SSANGYONG"],
    code: "KR",
  },
  {
    num: "◢ REGION 03 · EUR",
    flag: ["EUROPEAN", "ORIGIN."],
    brands: [
      "BMW",
      "MERCEDES",
      "AUDI",
      "PORSCHE",
      "VW",
      "OPEL",
      "PEUGEOT",
      "RENAULT",
      "CITROËN",
      "FIAT",
      "ALFA",
      "VOLVO",
      "SEAT",
      "SKODA",
      "SAAB",
      "FORD",
      "JEEP",
      "MINI",
      "JAGUAR",
      "LAND ROVER",
    ],
    code: "EU",
  },
];

export default function Coverage() {
  return (
    <section
      id="coverage"
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
        <div className="mono">SECTION 06 ▸ COVERAGE.FLEET</div>
        <div className="mono-sm">3 CONTINENTS · 1 ISLAND</div>
        <div className="corner tr" />
      </div>

      <div
        className="flex justify-between items-baseline gap-8 flex-wrap"
        style={{ marginTop: "4rem", marginBottom: "2rem" }}
      >
        <h2
          className="font-display font-black uppercase"
          style={{
            fontSize: "clamp(2.5rem,6vw,5rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            maxWidth: "20ch",
          }}
        >
          EVERY VEHICLE.
          <br />
          EVERY ORIGIN.
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "42ch",
            textAlign: "right",
          }}
        >
          etex carries spare parts for Japanese, Korean and European cars, vans
          and light trucks — sourced from twenty-three manufacturers across ten
          countries. If it runs on Cypriot asphalt, etex stocks the part.
        </p>
      </div>

      <div
        className="grid bleed-horiz coverage-grid"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 0,
          border: "1px solid var(--grid-hot)",
        }}
      >
        {REGIONS.map((r, i) => (
          <motion.div
            key={r.code}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.75,
              delay: i * 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="relative flex flex-col justify-between"
            style={{
              padding: "2rem 1.75rem",
              borderRight:
                i < REGIONS.length - 1 ? "1px solid var(--grid-hot)" : "none",
              minHeight: 380,
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="corner tl" style={{ width: 12, height: 12 }} />
            <div className="corner br" style={{ width: 12, height: 12 }} />
            <div
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 12,
                color: "var(--cyan)",
                letterSpacing: "0.18em",
              }}
            >
              {r.num}
            </div>
            <div style={{ marginTop: "auto" }}>
              <div
                className="font-display font-black uppercase"
                style={{
                  fontSize: "clamp(2rem,3.5vw,3rem)",
                  lineHeight: 0.9,
                  marginTop: "1.5rem",
                }}
              >
                {r.flag[0]}
                <br />
                <span
                  style={{
                    color: "var(--bg)",
                    WebkitTextStroke: "1.5px var(--text)",
                  }}
                >
                  {r.flag[1]}
                </span>
              </div>
              <ul
                className="list-none flex flex-wrap gap-1 mt-4 p-0"
                style={{ marginBottom: "1.5rem" }}
              >
                {r.brands.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-mono),monospace",
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      padding: "0.3rem 0.55rem",
                      border: "1px solid var(--grid)",
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <div
                className="flex justify-between items-baseline"
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                }}
              >
                <span>SUPPLY ORIGIN</span>
                <span
                  className="font-display font-black neon-text"
                  style={{
                    fontSize: "2.25rem",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {r.code}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
