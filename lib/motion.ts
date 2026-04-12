// Central motion presets — keep all transitions, eases and stagger values here.
// Every section imports from this file so timings stay in sync.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;
export const EASE_SNAP = [0.2, 0.8, 0.2, 1] as const;
export const EASE_SPRING_SOFT = [0.34, 1.2, 0.64, 1] as const;

export const DURATION_FAST = 0.25;
export const DURATION_BASE = 0.6;
export const DURATION_SLOW = 0.9;
export const DURATION_EPIC = 1.2;

export const STAGGER_TIGHT = 0.025;
export const STAGGER_BASE = 0.06;
export const STAGGER_LOOSE = 0.12;

// Framer Motion variant presets
export const fadeUp = {
  hidden: { opacity: 0, y: 24, transition: { duration: DURATION_FAST } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE_SNAP },
  },
};

export const fadeUpLarge = {
  hidden: { opacity: 0, y: 48, transition: { duration: DURATION_FAST } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_SNAP },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, transition: { duration: DURATION_FAST } },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_BASE, ease: EASE_SNAP },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24, transition: { duration: DURATION_FAST } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE_SNAP },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 24, transition: { duration: DURATION_FAST } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_BASE, ease: EASE_SNAP },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: DURATION_FAST },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_BASE, ease: EASE_SPRING_SOFT },
  },
};

export const hoverLift = {
  scale: 1.02,
  y: -2,
  transition: { duration: DURATION_FAST, ease: "easeOut" as const },
};

export const hoverNudgeRight = {
  x: 6,
  transition: { duration: DURATION_FAST, ease: "easeOut" as const },
};

export const hoverGlow = {
  opacity: 1,
  transition: { duration: DURATION_FAST, ease: "easeOut" as const },
};

// GSAP ScrollTrigger defaults — parallax, scrub, pin helpers
export const parallaxFromScroll = (intensity = 0.15) => ({
  yPercent: intensity * -100,
  ease: "none",
});

export const scrubScroll = {
  scrub: 0.8,
  start: "top bottom",
  end: "bottom top",
} as const;

export const pinScroll = {
  start: "top top",
  end: "+=100%",
  pin: true,
  scrub: true,
} as const;

// SplitType entrance — chars stagger rise
export const splitCharsRise = {
  initial: { yPercent: 120, opacity: 0, rotate: 6 },
  animate: {
    yPercent: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: DURATION_SLOW,
      stagger: STAGGER_TIGHT,
      ease: "power3.out",
    },
  },
};

// Keyframe marquee — infinite horizontal scroll
export const marqueeScroll = (duration = 30) => ({
  x: ["0%", "-50%"],
  transition: {
    duration,
    ease: "linear" as const,
    repeat: Infinity,
  },
});

// Pulse — for neon accents and live-indicator dots
export const neonPulse = {
  opacity: [0.6, 1, 0.6],
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

// Reduced-motion fallback — returns no animation
export const reducedMotion = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
};

// ───── Extended transform / transition / easing presets ─────
// Keeps the animation library centralized for the whole project.

export const translateUp = (distance = 20) => ({
  transform: `translateY(-${distance}px)`,
  transition: "transform 0.45s ease-out, opacity 0.45s ease-out",
});

export const translateDown = (distance = 20) => ({
  transform: `translateY(${distance}px)`,
  transition: "transform 0.45s ease-out, opacity 0.45s ease-out",
});

export const scaleBounce = {
  transform: "scale(1.05)",
  transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const rotateSlow = {
  animation: "rotate 20s linear infinite",
  transform: "rotate(0deg)",
};

export const pulseGlow = {
  animation: "pulse 2s ease-in-out infinite",
  transition: "opacity 0.4s ease, transform 0.4s ease",
};

export const flickerNeon = {
  animation: "flicker 4s ease-in-out infinite",
  opacity: 1,
  transform: "translateZ(0)",
};

// viewport-triggered entrance variants with stagger
export const staggerContainer = (staggerTime = STAGGER_BASE) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: 0.1,
    },
  },
});

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.96,
    transition: { duration: DURATION_FAST },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION_BASE, ease: EASE_SNAP },
  },
};

// scroll-parallax helper — returns inline style for a parallax translate
export const parallaxOffset = (scrollY: number, strength = 0.3) => ({
  transform: `translate3d(0, ${scrollY * -strength}px, 0)`,
  willChange: "transform",
});

// Framer Motion's useScroll + useTransform friendly ranges
export const parallaxRange = {
  input: [0, 1],
  outputSlow: [0, -60],
  outputFast: [0, -180],
  outputRotate: [0, 10],
  outputScale: [1, 1.15],
};

// GSAP timeline defaults for section intros
export const sectionIntroTl = {
  defaults: {
    duration: DURATION_BASE,
    ease: "power3.out",
  },
  opacity: 0,
  transform: "translateY(40px)",
};

// Mouse-follow spotlight offset easing
export const spotlightEase = (x: number, y: number, intensity = 0.25) => ({
  transform: `translate(${x * intensity}px, ${y * intensity}px)`,
  transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
});

// Clip-path reveal animation (for section mask-ins)
export const clipPathReveal = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    transition: { duration: DURATION_FAST },
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: DURATION_SLOW, ease: EASE_SNAP },
  },
};

// Text character stagger (used alongside SplitType)
export const charStagger = {
  hidden: { opacity: 0, y: 18, rotate: 3 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * STAGGER_TIGHT,
      duration: DURATION_BASE,
      ease: EASE_SNAP,
    },
  }),
};

// Fade-through transition (cross-fade between states)
export const fadeThrough = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: DURATION_BASE } },
  exit: { opacity: 0, scale: 1.03, transition: { duration: DURATION_FAST } },
};

// Layout transition defaults for framer-motion layoutId swaps
export const layoutTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.9,
};
