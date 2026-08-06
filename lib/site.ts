export const SITE = {
  name: "BuildMyReceipt",
  domain: "buildmyreceipt.com",
  url: "https://buildmyreceipt.com",
  tagline: "Receipt generator for business records",
  description:
    "Free online receipt generator. Create clean, itemised business receipts in seconds — restaurant, retail, rent, fuel, service and more. No signup required.",
  email: "support@buildmyreceipt.com",
  abuseEmail: "abuse@buildmyreceipt.com",
} as const;

export const NAV = [
  { href: "/generator", label: "Generator" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
] as const;
