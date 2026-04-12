"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Legacy() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const split = new SplitType(el, { types: "lines,words", tagName: "span" });
    const words = split.words || [];
    gsap.set(words, { yPercent: 110, opacity: 0 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.06,
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
      id="legacy"
      className="relative grid items-center"
      style={{
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: "clamp(2rem,4vw,5rem)",
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,3vw,3rem)",
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
        <div className="mono">SECTION 02 ▸ LEGACY.ARCHIVE</div>
        <div className="mono-sm">55 YR OPERATIONAL CYCLE</div>
        <div className="corner tr" />
      </div>

      {/* Chairman portrait plate (enlarged to 4/5 aspect) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex flex-col justify-between overflow-hidden"
        style={{
          border: "1px solid var(--grid-hot)",
          padding: "1.25rem 1.25rem",
          background: "rgba(var(--cyan-rgb),0.04)",
          aspectRatio: "4/5",
        }}
      >
        {/* chairman image fills the plate */}
        <Image
          src="/images/chairman-portrait.jpg"
          alt="Andreas Theocharous"
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-cover"
          style={{
            filter: "contrast(1.08) saturate(1.02) brightness(0.92)",
            zIndex: 0,
          }}
          priority
        />

        {/* gradient scrim so the metadata reads clearly */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(7,9,14,0.55) 0%, rgba(7,9,14,0.0) 30%, rgba(7,9,14,0.0) 55%, rgba(7,9,14,0.9) 100%)",
            zIndex: 1,
          }}
        />

        {/* corner brackets */}
        <div className="corner tl" style={{ zIndex: 2 }} />
        <div className="corner tr" style={{ zIndex: 2 }} />
        <div className="corner bl" style={{ zIndex: 2 }} />
        <div className="corner br" style={{ zIndex: 2 }} />

        {/* top meta strip */}
        <div
          className="mono-sm flex justify-between relative"
          style={{ zIndex: 3, color: "var(--cyan)" }}
        >
          <span>REC ◆ 001</span>
          <span>CHAIRMAN.FILE</span>
        </div>

        {/* bottom name plate */}
        <div
          className="relative"
          style={{ zIndex: 3 }}
        >
          <div
            className="font-display font-black uppercase"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              textShadow: "0 2px 14px rgba(0,0,0,0.85)",
            }}
          >
            ANDREAS
            <br />
            THEOCHAROUS
          </div>
          <div
            className="flex justify-between items-baseline"
            style={{
              marginTop: "0.75rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(34,240,255,0.5)",
            }}
          >
            <span className="mono-sm neon-gold">CHAIRMAN &amp; CEO</span>
            <span className="mono-sm">EST. 1971</span>
          </div>
        </div>
      </motion.div>

      {/* body copy */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
      >
        <h2
          ref={titleRef}
          className="font-display font-extrabold uppercase"
          style={{
            fontSize: "clamp(2.5rem,5.5vw,5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.015em",
            marginBottom: "1.5rem",
            overflow: "hidden",
          }}
        >
          FIFTY-FIVE{" "}
          <em
            style={{
              fontStyle: "normal",
              color: "var(--cyan)",
              textShadow: "0 0 12px rgba(var(--cyan-rgb),0.5)",
            }}
          >
            YEARS
          </em>
          <br />
          OF HONEST
          <br />
          HARD WORK.
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "54ch",
            marginBottom: "1.25rem",
          }}
        >
          In{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>1971</strong>,
          Andreas Theocharous founded etex in Nicosia with a simple commitment —
          provide Cypriot workshops with the latest-technology spare parts at the
          highest quality standards, from the most prominent manufacturers
          worldwide.
        </p>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "54ch",
          }}
        >
          Half a century later, etex is the island&apos;s{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>
            largest and most dependable
          </strong>{" "}
          stockist-wholesale distributor of automotive aftermarket spare parts —
          predominant retailer too, through six distribution outlets covering the
          entire Cyprus market. Thirty product lines. Twenty-three supplier
          countries. One family, still running it.
        </p>
        <blockquote
          className="font-display font-bold"
          style={{
            marginTop: "2rem",
            padding: "1.5rem 1.75rem",
            borderLeft: "2px solid var(--gold)",
            background: "rgba(var(--gold-rgb),0.04)",
            fontSize: "clamp(1.25rem,2vw,1.75rem)",
            lineHeight: 1.2,
            color: "var(--text)",
          }}
        >
          &ldquo;Profits are the natural by-product of hard work and good business
          ethics.&rdquo;
          <span
            className="block mt-3 mono-sm"
            style={{ color: "var(--gold)", fontWeight: 400 }}
          >
            — A. THEOCHAROUS · CHAIRMAN &amp; CEO
          </span>
        </blockquote>
      </motion.div>
    </section>
  );
}
