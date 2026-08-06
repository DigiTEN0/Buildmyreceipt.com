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
           high numbers = paper. Tuned for a light background. */
        ink: {
          50: "#1b1813",
          100: "#26221b",
          200: "#3a352c",
          300: "#4f493e",
          400: "#6d665a",
          500: "#8b8477",
          600: "#a9a294",
          700: "#c6bfb1",
          800: "#ded7c9",
          900: "#eee8dc",
          950: "#f7f3ea",
        },
        accent: {
          400: "#ff7a4d",
          500: "#f9542a",
          600: "#e0400f",
        },
      },
      keyframes: {
        "slide-up": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        print: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(0)" } },
        "marquee-l": { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-r": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "slide-up": "slide-up .4s cubic-bezier(.22,1,.36,1) both",
        print: "print .8s cubic-bezier(.22,1,.36,1) both",
        "marquee-l": "marquee-l 60s linear infinite",
        "marquee-r": "marquee-r 60s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
