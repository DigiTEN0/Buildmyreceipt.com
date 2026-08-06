import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        receipt: ["var(--font-receipt)"],
      },
      colors: {
        /* Cool neutral ramp, dark → light. Low numbers = ink (text),
           high numbers = paper. Tuned for a white canvas. */
        ink: {
          50: "#111111",
          100: "#1f2430",
          200: "#374151",
          300: "#4b5563",
          400: "#6b7280",
          500: "#9ca3af",
          600: "#d1d5db",
          700: "#e5e7eb",
          800: "#f3f4f6",
          900: "#f8f9fa",
          950: "#ffffff",
        },
        accent: {
          400: "#3b82f6",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
      },
      keyframes: {
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        print: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(0)" } },
        "marquee-l": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-r": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "slide-up": "slide-up .5s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fade-in .6s ease both",
        print: "print .8s cubic-bezier(.22,1,.36,1) both",
        "marquee-l": "marquee-l 60s linear infinite",
        "marquee-r": "marquee-r 60s linear infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
