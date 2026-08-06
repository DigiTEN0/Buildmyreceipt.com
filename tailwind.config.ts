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
        /* Warm neutral ramp, dark → light. Low numbers = ink (text),
           high numbers = paper. Tuned for a bright, warm background. */
        ink: {
          50: "#141210",
          100: "#211d18",
          200: "#38332b",
          300: "#514b40",
          400: "#726b5e",
          500: "#948d7f",
          600: "#b4ac9d",
          700: "#cec7b9",
          800: "#e2dccf",
          900: "#efe9dd",
          950: "#f8f4ec",
        },
        accent: {
          400: "#ff7a4d",
          500: "#f6511d",
          600: "#dc3f0c",
          700: "#b8330a",
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
