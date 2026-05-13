import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Fonts ────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-sans)",    "Space Grotesk",   "Helvetica Neue", "sans-serif"],
        mono:    ["var(--font-mono)",    "JetBrains Mono",  "ui-monospace",   "monospace"],
        display: ["var(--font-display)", "Archivo Black",   "Helvetica",      "sans-serif"],
      },

      // ── shadcn/ui color tokens ────────────────────────────────
      colors: {
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // ── Raw design tokens (use as bg-paper, text-ink, etc.) ──
        paper:   "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink:     "var(--ink)",
        "ink-2": "var(--ink-2)",
        line:    "var(--line)",
        lime:    "var(--brand-accent)",
        ok:      "var(--ok)",
        danger:  "var(--danger)",
      },

      // ── Border radius ─────────────────────────────────────────
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg:      "var(--radius)",
        md:      "var(--radius)",
        sm:      "var(--radius)",
      },

      // ── Border width ─────────────────────────────────────────
      borderWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
