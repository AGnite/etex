"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STORES = [
  {
    n: "[01]",
    name: "NICOSIA",
    addr: "6 KENNEDY AVE · PALLOURIOTISSA 1035 · +357 22 433 244",
    gps: ["35.17°N", "33.36°E"],
    hq: true,
  },
  {
    n: "[02]",
    name: "AGIOS DOMETIOS",
    addr: "35 GR. AFXENTIOU STR · NICOSIA · +357 22 771 211",
    gps: ["35.17°N", "33.31°E"],
    hq: false,
  },
  {
    n: "[03]",
    name: "LIMASSOL",
    addr: "42 VASILEOS PAVLOU A' · OMONOIAS 3052 · +357 25 568 444",
    gps: ["34.68°N", "33.04°E"],
    hq: false,
  },
  {
    n: "[04]",
    name: "LARNACA",
    addr: "23 IACOVOU PATATSOU · ARADIPPOU 7101 · +357 24 638 383",
    gps: ["34.92°N", "33.62°E"],
    hq: false,
  },
  {
    n: "[05]",
    name: "PAFOS",
    addr: "4 CHR. TSELEPOU · KTIMA 8021 · +357 26 931 383",
    gps: ["34.77°N", "32.42°E"],
    hq: false,
  },
  {
    n: "[06]",
    name: "PERA HORIO NISOU",
    addr: "3B ARCH. MAKARIOS AV · 2572 · +357 22 523 888",
    gps: ["35.01°N", "33.43°E"],
    hq: false,
  },
];

export default function Network() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section
      id="network"
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
        <div className="mono">SECTION 07 ▸ NETWORK.NODES</div>
        <div className="mono-sm neon-text">6 ACTIVE</div>
        <div className="corner tr" />
      </div>

      <div
        className="flex justify-between items-baseline flex-wrap gap-4"
        style={{ marginTop: "4rem", marginBottom: "2rem" }}
      >
        <h2
          className="font-display font-black uppercase"
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
          }}
        >
          SIX NODES.
          <br />
          <span
            style={{ color: "var(--bg)", WebkitTextStroke: "2px var(--text)" }}
          >
            ONE ISLAND.
          </span>
        </h2>
        <div className="mono text-right">
          CYPRUS ▸ 35.1°N · 33.4°E
          <br />
          NETWORK ▸ FULL MESH
        </div>
      </div>

      <div
        className="grid bleed-horiz network-body"
        style={{
          gridTemplateColumns: "1.2fr 1fr",
          gap: 0,
          border: "1px solid var(--grid-hot)",
          minHeight: 540,
        }}
      >
        {/* map */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRight: "1px solid var(--grid-hot)",
            padding: "1.5rem",
            background:
              "radial-gradient(circle at 40% 50%, rgba(var(--cyan-rgb),0.08), transparent 60%)",
          }}
        >
          <div
            className="absolute flex justify-between"
            style={{
              top: "1rem",
              left: "1.25rem",
              right: "1.25rem",
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              color: "var(--cyan)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            <span>CYPRUS · NET.GRID</span>
            <span>◉ LIVE</span>
          </div>
          <svg
            viewBox="0 0 600 340"
            fill="none"
            stroke="rgba(34,240,255,0.4)"
            strokeWidth="1"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              padding: "2rem",
              filter: "drop-shadow(0 0 12px rgba(34,240,255,0.4))",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* graticule lines (lat/long lines) */}
            <g
              stroke="rgba(34,240,255,0.08)"
              strokeWidth="0.5"
              strokeDasharray="2 5"
            >
              <line x1="40" y1="120" x2="580" y2="120" />
              <line x1="40" y1="170" x2="580" y2="170" />
              <line x1="40" y1="220" x2="580" y2="220" />
              <line x1="130" y1="60" x2="130" y2="300" />
              <line x1="230" y1="60" x2="230" y2="300" />
              <line x1="330" y1="60" x2="330" y2="300" />
              <line x1="430" y1="60" x2="430" y2="300" />
              <line x1="510" y1="60" x2="510" y2="300" />
            </g>

            {/* Embedded real map as an SVG image so dots share its coordinate
                space. Rendered with a cyan-boost filter and brightness lift so
                the coastline reads as a neon outline. */}
            <defs>
              <filter
                id="cyprusNeon"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feColorMatrix
                  type="matrix"
                  values="
                    0   0   0   0   0.13
                    0   0   0   0   0.94
                    0   0   0   0   1.00
                    0.4 0.4 0.4 0   0
                  "
                />
                <feGaussianBlur stdDeviation="0.35" />
              </filter>
            </defs>
            <image
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/stores/cyprus-map.jpg`}
              x="0"
              y="20"
              width="600"
              height="300"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#cyprusNeon)"
              opacity="0.55"
            />

            {/* Nicosia HQ — right home icon of the pair at Nicosia.
                Image 1312×816 rendered at SVG x=58.8..541.2, y=20..320. */}
            <g>
              <circle
                cx="262"
                cy="140"
                r={hover === 0 ? 10 : 7}
                fill="#ffcc33"
              />
              <circle
                cx="262"
                cy="140"
                r="16"
                stroke="#ffcc33"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              {/* HQ leader line into the sea */}
              <line
                x1="272"
                y1="132"
                x2="380"
                y2="85"
                stroke="#ffcc33"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
              <text
                x="384"
                y="82"
                fill="#ffcc33"
                fontFamily="JetBrains Mono"
                fontSize="10"
                letterSpacing="1.5"
              >
                ◆ NICOSIA · HQ
              </text>
            </g>

            {[
              // Agios Dometios — left home icon of the pair at Nicosia
              { cx: 240, cy: 140, label: "AG.DOMETIOS", tx: 90, ty: 78, i: 1 },
              // Larnaca — home icon on east coast
              { cx: 325, cy: 150, label: "LARNACA", tx: 410, ty: 112, i: 3 },
              // Limassol — home icon on south coast
              { cx: 200, cy: 224, label: "LIMASSOL", tx: 120, ty: 268, i: 2 },
              // Pafos — home icon on SW coast
              { cx: 120, cy: 204, label: "PAFOS", tx: 32, ty: 195, i: 4 },
              // Nisou / Pera Horio — home icon below Nicosia
              { cx: 245, cy: 178, label: "PERA HORIO", tx: 360, ty: 205, i: 5 },
            ].map((p) => (
              <g key={p.label}>
                {/* leader line to the label in the sea */}
                <line
                  x1={p.cx}
                  y1={p.cy}
                  x2={p.tx + 4}
                  y2={p.ty - 3}
                  stroke="#22f0ff"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                  opacity="0.5"
                />
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={hover === p.i ? 7 : 4}
                  fill="#22f0ff"
                />
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r="11"
                  fill="none"
                  stroke="#22f0ff"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  opacity={hover === p.i ? 1 : 0.45}
                />
                <text
                  x={p.tx}
                  y={p.ty}
                  fill="#22f0ff"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  letterSpacing="1"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* mesh lines — all branches radiate from Nicosia HQ */}
            <g stroke="rgba(34,240,255,0.25)" strokeDasharray="3 3">
              <line x1="262" y1="140" x2="240" y2="140" />
              <line x1="262" y1="140" x2="245" y2="178" />
              <line x1="262" y1="140" x2="325" y2="150" />
              <line x1="262" y1="140" x2="200" y2="224" />
              <line x1="262" y1="140" x2="120" y2="204" />
            </g>

            {/* sea labels — subtle */}
            <text
              x="300"
              y="85"
              fill="rgba(34,240,255,0.3)"
              fontFamily="JetBrains Mono"
              fontSize="9"
              letterSpacing="3"
            >
              MEDITERRANEAN
            </text>

            {/* compass rose — top-left */}
            <g
              stroke="rgba(34,240,255,0.5)"
              strokeWidth="0.8"
              fill="none"
            >
              <circle cx="55" cy="60" r="14" />
              <line x1="55" y1="46" x2="55" y2="74" />
              <line x1="41" y1="60" x2="69" y2="60" />
              <text
                x="50"
                y="40"
                fill="#22f0ff"
                fontFamily="JetBrains Mono"
                fontSize="9"
                letterSpacing="1"
              >
                N
              </text>
            </g>
          </svg>
          <div
            className="absolute flex justify-between"
            style={{
              bottom: "1rem",
              left: "1.25rem",
              right: "1.25rem",
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              color: "var(--dim)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span>MESH ▸ 100%</span>
            <span>LAT ▸ &lt;24H</span>
          </div>
        </div>

        {/* store list */}
        <div>
          {STORES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{
                x: 6,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="grid items-center cursor-pointer"
              style={{
                gridTemplateColumns: "auto 1fr auto",
                gap: "1rem",
                padding: "1rem 1.5rem",
                borderBottom:
                  i < STORES.length - 1 ? "1px solid var(--grid)" : "none",
                background:
                  hover === i ? "rgba(var(--cyan-rgb),0.08)" : "transparent",
                transition:
                  "background 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  color: "var(--cyan)",
                  letterSpacing: "0.15em",
                  width: 32,
                }}
              >
                {s.n}
              </div>
              <div>
                <h4
                  className="font-display font-extrabold uppercase"
                  style={{
                    fontSize: "1.25rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.name}
                  {s.hq && (
                    <span
                      style={{
                        marginLeft: 8,
                        color: "var(--gold)",
                        fontFamily: "var(--font-mono),monospace",
                        fontSize: 12,
                        letterSpacing: "0.2em",
                      }}
                    >
                      ◆ HQ
                    </span>
                  )}
                </h4>
                <div
                  style={{
                    fontFamily: "var(--font-mono),monospace",
                    fontSize: 12,
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    marginTop: "0.2rem",
                    textTransform: "uppercase",
                  }}
                >
                  {s.addr}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  color: "var(--dim)",
                  letterSpacing: "0.15em",
                  textAlign: "right",
                  textTransform: "uppercase",
                }}
              >
                {s.gps[0]}
                <br />
                {s.gps[1]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
