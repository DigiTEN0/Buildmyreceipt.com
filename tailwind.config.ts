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
        ink: {
          50: "#f6f7f9", 100: "#eceef2", 200: "#d5d9e2", 300: "#b0b8c9",
          400: "#8591a9", 500: "#66738d", 600: "#515c74", 700: "#424b5e",
          800: "#39404f", 900: "#181b22", 950: "#0c0e13",
        },
        acid: {
          400: "#c8f24d", 500: "#b5e626", 600: "#93bf16",
        },
      },
      keyframes: {
        "slide-up": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        "print": { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(0)" } },
      },
      animation: {
        "slide-up": "slide-up .35s cubic-bezier(.22,1,.36,1) both",
        "print": "print .8s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
