"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "HERO" },
  { id: "legacy", label: "LEGACY" },
  { id: "metrics", label: "METRICS" },
  { id: "products", label: "PRODUCTS" },
  { id: "partners", label: "PARTNERS" },
  { id: "coverage", label: "COVERAGE" },
  { id: "network", label: "NETWORK" },
  { id: "contact", label: "CONTACT" },
];

export default function LeftRail() {
  const [active, setActive] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      mql.removeEventListener("change", update);
    };
  }, []);

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <nav
          className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-[52px]"
          style={{
            borderBottom: "1px solid var(--grid-hot)",
            background: "rgba(5,6,8,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <a
            href="#hero"
            className="font-display font-black lowercase"
            style={{
              fontSize: 26,
              color: "var(--cyan)",
              textShadow:
                "0 0 10px rgba(var(--cyan-rgb),0.8), 0 0 24px rgba(var(--cyan-rgb),0.4)",
              letterSpacing: "-0.02em",
            }}
            onClick={() => handleNav("hero")}
          >
            etex
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="toggle menu"
            className="flex items-center gap-2 px-3 py-2"
            style={{
              border: "1px solid var(--grid-hot)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--cyan)",
              textTransform: "uppercase",
              background: "transparent",
            }}
          >
            {open ? "✕ CLOSE" : "≡ MENU"}
          </button>
        </nav>

        {open && (
          <div
            className="fixed inset-0 z-20 flex flex-col justify-center items-start pl-6 gap-4"
            style={{
              top: 52,
              background: "rgba(5,6,8,0.96)",
              backdropFilter: "blur(12px)",
            }}
          >
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className="font-display font-black uppercase text-left"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: active === s.id ? "var(--cyan)" : "var(--text)",
                  textShadow:
                    active === s.id
                      ? "0 0 14px rgba(var(--cyan-rgb),0.7)"
                      : "none",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: "var(--dim)",
                    marginRight: 12,
                    verticalAlign: "middle",
                  }}
                >
                  0{i + 1}
                </span>
                {s.label}
              </button>
            ))}
            <div
              style={{
                marginTop: "2rem",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--dim)",
                textTransform: "uppercase",
              }}
            >
              etex // nicosia 35.1695°N · 33.3591°E
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <nav
      className="fixed left-0 top-0 bottom-0 w-[68px] z-20 flex flex-col items-center justify-between py-6"
      style={{
        borderRight: "1px solid var(--grid-hot)",
        background: "rgba(5,6,8,0.65)",
        backdropFilter: "blur(6px)",
      }}
    >
      <a
        href="#hero"
        className="font-display font-black text-[24px] lowercase"
        style={{
          color: "var(--cyan)",
          textShadow:
            "0 0 10px rgba(var(--cyan-rgb),0.8), 0 0 24px rgba(var(--cyan-rgb),0.4)",
          letterSpacing: "-0.02em",
        }}
      >
        et
      </a>

      <ul className="flex flex-col gap-6 items-center list-none p-0 m-0">
        {SECTIONS.map((s) => (
          <li
            key={s.id}
            className="cursor-pointer transition-colors duration-200"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: active === s.id ? "var(--cyan)" : "var(--muted)",
              textShadow:
                active === s.id ? "0 0 8px rgba(var(--cyan-rgb),0.7)" : "none",
            }}
            onClick={() => handleNav(s.id)}
          >
            {active === s.id ? `› ${s.label}` : s.label}
          </li>
        ))}
      </ul>

      <div
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "9px",
          color: "var(--dim)",
          letterSpacing: "0.18em",
        }}
      >
        35.1695°N · 33.3591°E
      </div>
    </nav>
  );
}

