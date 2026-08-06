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
        /* Cool navy → light ramp. Low numbers = ink (text), high = paper.
           Tuned to sit under the navy/blue brand logo. */
        ink: {
          50: "#16202e",
          100: "#1f2b3b",
          200: "#334153",
          300: "#46515f",
          400: "#606b7a",
          500: "#7c8695",
          600: "#9aa4b2",
          700: "#bcc4cf",
          800: "#d6dce5",
          900: "#e9edf3",
          950: "#f4f7fb",
        },
        accent: {
          400: "#52a8f6",
          500: "#1f8ff2",
          600: "#1670c4",
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
