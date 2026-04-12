import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        dim: "var(--dim)",
        cyan: {
          DEFAULT: "var(--cyan)",
          hot: "var(--cyan-hot)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          hot: "var(--gold-hot)",
        },
        grid: "var(--grid)",
        "grid-hot": "var(--grid-hot)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.04em",
        "mono-wide": "0.14em",
        "mono-wider": "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
