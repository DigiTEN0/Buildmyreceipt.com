export const SITE = {
  name: "BuildMyReceipt",
  domain: "buildmyreceipt.com",
  url: "https://buildmyreceipt.com",
  tagline: "Free receipt maker — start in seconds",
  description:
    "Free receipt maker trusted by thousands worldwide. Pick a template, customize your items and details, and download a realistic receipt in under 60 seconds. Export as PNG, PDF or JPEG — no signup required.",
  email: "support@buildmyreceipt.com",
  abuseEmail: "abuse@buildmyreceipt.com",
} as const;

/** Aggregate, on-page social-proof figures (marketing copy, not schema data). */
export const STATS = {
  receipts: "250,000+",
  templates: "24",
  currencies: "14",
  countries: "30+",
  rating: "4.9",
} as const;

export const NAV = [
  { href: "/generator", label: "Receipt Maker" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
] as const;
