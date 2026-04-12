"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PART_CATEGORIES } from "@/lib/parts";
import { motion, AnimatePresence } from "framer-motion";
import CanvasErrorBoundary from "../three/CanvasErrorBoundary";

const CarScene = dynamic(() => import("../three/CarScene"), { ssr: false });

export default function Products() {
  const [activeId, setActiveId] = useState<string>("idle");
  const [canvasMounted, setCanvasMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const active = PART_CATEGORIES.find((c) => c.id === activeId);
  const isIdle = !active;

  const handleCategoryClick = (id: string) => {
    setActiveId((prev) => (prev === id ? "idle" : id));
  };

  useEffect(() => {
    console.log("[Products] useEffect fired, mounting canvas");
    setCanvasMounted(true);
  }, []);

  useEffect(() => {
    console.log("[Products] canvasMounted =", canvasMounted);
  }, [canvasMounted]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative"
      style={{
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,3vw,3rem) clamp(6rem,10vw,10rem)",
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
        <div className="mono">SECTION 04 ▸ PRODUCTS.INTERACTIVE</div>
        <div className="mono-sm neon-text">◉ 3D MODEL · LIVE</div>
        <div className="corner tr" />
      </div>

      <div
        className="grid items-baseline"
        style={{
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          marginBottom: "2rem",
          marginTop: "4rem",
        }}
      >
        <h2
          className="font-display font-black uppercase"
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
          }}
        >
          SELECT{" "}
          <span className="neon-text">COMPONENT.</span>
          <br />
          <span
            style={{ color: "var(--bg)", WebkitTextStroke: "2px var(--text)" }}
          >
            ROTATE MACHINE.
          </span>
        </h2>
        <div className="mono text-right" style={{ maxWidth: "26ch" }}>
          CLICK ANY CATEGORY
          <br />
          TO ROTATE &amp; HIGHLIGHT
        </div>
      </div>

      <div
        className="grid bleed-horiz products-layout"
        style={{
          gridTemplateColumns: "280px 1fr 320px",
          gap: 0,
          border: "1px solid var(--grid-hot)",
          minHeight: 620,
          background: "linear-gradient(180deg, rgba(var(--cyan-rgb),0.03), transparent)",
        }}
      >
        {/* category list */}
        <div
          style={{
            borderRight: "1px solid var(--grid-hot)",
            padding: "1.25rem 0",
            overflowY: "auto",
          }}
        >
          <div
            className="mono-sm flex justify-between"
            style={{ padding: "0 1.25rem 1rem" }}
          >
            <span>◢ CATEGORIES</span>
            <span>09</span>
          </div>
          {PART_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 4, transition: { duration: 0.2, ease: "easeOut" } }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.45,
                delay: i * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="w-full grid items-center text-left"
              style={{
                gridTemplateColumns: "auto 1fr auto",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                borderTop: "1px solid var(--grid)",
                background:
                  activeId === cat.id
                    ? "rgba(var(--cyan-rgb),0.1)"
                    : "transparent",
                color: activeId === cat.id ? "var(--cyan)" : "var(--text)",
                textShadow:
                  activeId === cat.id
                    ? "0 0 6px rgba(var(--cyan-rgb),0.6)"
                    : "none",
                cursor: "pointer",
                border: "none",
                borderLeft:
                  activeId === cat.id
                    ? "3px solid var(--cyan)"
                    : "3px solid transparent",
                transition:
                  "background 0.3s ease, color 0.3s ease, border-left 0.3s ease, text-shadow 0.3s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  color:
                    activeId === cat.id ? "var(--cyan)" : "var(--dim)",
                  letterSpacing: "0.1em",
                }}
              >
                [{cat.code}]
              </span>
              <span
                className="font-display font-bold uppercase"
                style={{
                  fontSize: 14,
                  letterSpacing: "0.04em",
                }}
              >
                {cat.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  color: activeId === cat.id ? "var(--cyan)" : "var(--dim)",
                  transition: "color 0.3s ease, transform 0.3s ease",
                }}
              >
                ▸
              </span>
            </motion.button>
          ))}
        </div>

        {/* canvas host */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(var(--cyan-rgb),0.12), transparent 55%), rgba(5,6,8,0.7)",
          }}
        >
          <div className="corner tl" style={{ width: 16, height: 16 }} />
          <div className="corner tr" style={{ width: 16, height: 16 }} />
          <div className="corner bl" style={{ width: 16, height: 16 }} />
          <div className="corner br" style={{ width: 16, height: 16 }} />

          <div
            className="absolute z-10"
            style={{
              top: 12,
              left: 16,
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "var(--cyan)",
              opacity: 0.8,
            }}
          >
            MODEL ▸ ferrari.glb · GLTF v2
          </div>
          <div
            className="absolute z-10 flex gap-4"
            style={{
              top: 12,
              right: 16,
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              color: "var(--dim)",
              letterSpacing: "0.15em",
            }}
          >
            <span style={{ color: "var(--cyan)" }}>
              ◢ {active?.code ?? "IDLE"}
            </span>
            <span>CAM TRACK</span>
            <span>LIGHT 3PT</span>
          </div>
          <div
            className="absolute z-10"
            style={{
              bottom: 12,
              right: 16,
              fontFamily: "var(--font-mono),monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "var(--cyan)",
              opacity: 0.8,
            }}
          >
            {isIdle
              ? "MODE ▸ IDLE · AUTO ROTATE"
              : `HIGHLIGHT ▸ ${active.id.toUpperCase()} · ${active.markers.length} MARKER${active.markers.length > 1 ? "S" : ""}`}
          </div>

          <div className="absolute inset-0">
            {canvasMounted ? (
              <CanvasErrorBoundary
                fallback={
                  <div className="w-full h-full flex items-center justify-center mono neon-text">
                    ◢ WEBGL UNAVAILABLE
                  </div>
                }
              >
                <CarScene activeId={activeId} />
              </CanvasErrorBoundary>
            ) : (
              <div className="w-full h-full flex items-center justify-center mono neon-text">
                ◢ MODEL LOADING...
              </div>
            )}
          </div>
        </div>

        {/* metadata panel */}
        <div
          style={{
            borderLeft: "1px solid var(--grid-hot)",
            padding: "1.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div className="flex justify-between items-baseline">
            <span
              style={{
                fontFamily: "var(--font-mono),monospace",
                fontSize: 12,
                color: "var(--cyan)",
                letterSpacing: "0.18em",
              }}
            >
              {active ? `[${active.code}] ◆ ACTIVE` : "[ -- ] ◆ IDLE"}
            </span>
            <span className="mono-sm" style={{ color: "var(--dim)" }}>
              {isIdle
                ? "0/9"
                : `${PART_CATEGORIES.findIndex((c) => c.id === activeId) + 1}/9`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isIdle ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-4"
              >
                <h3
                  className="font-display font-black uppercase"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 0.9,
                    letterSpacing: "-0.01em",
                    color: "var(--bg)",
                    WebkitTextStroke: "1.5px var(--cyan)",
                  }}
                >
                  SELECT A<br />COMPONENT.
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  etex carries nine product categories — thirty lines in
                  total, from twenty-three manufacturers across ten countries.
                  Pick any category from the list to see the parts etex
                  distributes for it and where they sit on the car.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono),monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--dim)",
                    textTransform: "uppercase",
                  }}
                >
                  ▸ click a category to isolate it
                  <br />
                  ▸ click the same one again to reset
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-4"
              >
                <h3
                  className="font-display font-black uppercase neon-text"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 0.9,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {active.name.toUpperCase()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {active.brands.map((b) => (
                    <span
                      key={b}
                      style={{
                        fontFamily: "var(--font-mono),monospace",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.6rem",
                        border: "1px solid var(--grid-hot)",
                        color: "var(--text)",
                        background: "rgba(var(--cyan-rgb),0.04)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--muted)" }}>
                  {active.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="grid mt-auto"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              borderTop: "1px solid var(--grid-hot)",
              paddingTop: "1rem",
            }}
          >
            <div className="flex flex-col gap-1 pr-3">
              <div
                className="font-display font-extrabold neon-text"
                style={{ fontSize: "1.35rem" }}
              >
                JP·KR·EU
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                }}
              >
                COVERAGE
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="font-display font-extrabold neon-text"
                style={{ fontSize: "1.35rem" }}
              >
                06
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono),monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                }}
              >
                OUTLETS IN STOCK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== PRODUCT GALLERY ========== */}
      <div
        className="bleed-horiz products-gallery"
        style={{
          marginTop: "2rem",
          border: "1px solid var(--grid-hot)",
          borderTop: "none",
          background: "rgba(var(--cyan-rgb),0.02)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid var(--grid-hot)",
            fontFamily: "var(--font-mono),monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--cyan)",
          }}
        >
          <span>
            ◢ CATALOGUE ▸{" "}
            {active ? active.name.toUpperCase() : "SELECT A CATEGORY"}
          </span>
          <span style={{ color: "var(--dim)" }}>
            {active ? `${active.products.length} SUB-LINES` : `30 TOTAL LINES`}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active ? active.id : "idle"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="products-gallery-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 0,
            }}
          >
            {(active
              ? active.products
              : PART_CATEGORIES.flatMap((c) => c.products).slice(0, 8)
            ).map((p, i) => (
              <motion.div
                key={`${active?.id ?? "idle"}-${p.src}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="relative group"
                style={{
                  borderRight: "1px solid var(--grid-hot)",
                  borderBottom: "1px solid var(--grid-hot)",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  background: "var(--bg-1)",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={p.src}
                  alt={p.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 220px"
                  className="object-cover"
                  style={{
                    filter:
                      "grayscale(0.35) contrast(1.05) brightness(0.75) saturate(0.9)",
                    mixBlendMode: "screen",
                    transition:
                      "filter 0.4s ease, transform 0.5s ease, opacity 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7,9,14,0.15) 0%, rgba(7,9,14,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    top: 8,
                    left: 10,
                    fontFamily: "var(--font-mono),monospace",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "var(--cyan)",
                    textTransform: "uppercase",
                    opacity: 0.85,
                  }}
                >
                  ◆ {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="absolute"
                  style={{
                    bottom: 10,
                    left: 10,
                    right: 10,
                    fontFamily: "var(--font-display),sans-serif",
                    fontSize: 13,
                    lineHeight: 1.15,
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  }}
                >
                  {p.label}
                </div>
                <div
                  className="absolute corner tl"
                  style={{ width: 10, height: 10 }}
                />
                <div
                  className="absolute corner br"
                  style={{ width: 10, height: 10 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
