/**
 * BrandMark — an original, fictional brand emblem for a receipt header.
 *
 * These are generated marks for the fictional example businesses used in the
 * templates. They are NOT real third-party logos or trademarks — every receipt
 * gets its own icon + brand colour so the previews look like distinct real
 * businesses without impersonating any actual company.
 */

type IconKey =
  | "cup"
  | "utensils"
  | "bag"
  | "cart"
  | "car"
  | "fuel"
  | "home"
  | "bed"
  | "store"
  | "briefcase"
  | "heart"
  | "wrench"
  | "cross"
  | "pill"
  | "parking"
  | "sparkle"
  | "bolt"
  | "shirt";

const ICONS: Record<IconKey, string> = {
  cup: "M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M8 2c0 1-1 1.5-1 2.5M12 2c0 1-1 1.5-1 2.5",
  utensils: "M5 2v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2M7 11v11M17 2c-1.5 0-2.5 2.5-2.5 5.5S15.5 13 17 13h.5v9",
  bag: "M6 7 4 7 5 21h14l1-14h-2M6 7h12M9 7V5a3 3 0 0 1 6 0v2",
  cart: "M4 4h2l1.6 10.4A2 2 0 0 0 9.6 16h8.2a2 2 0 0 0 2-1.6L21 7H6M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  car: "M5 13l1.6-4.8A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.4L19 13m-14 0h14m-14 0a2 2 0 0 0-2 2v3h3m13-5a2 2 0 0 1 2 2v3h-3m0 0H8m0 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m14 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0",
  fuel: "M4 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17M3 22h12M4 11h10M14 8l3 0 0 8a2 2 0 0 0 4 0V9l-3-3",
  home: "M4 11 12 4l8 7M6 9.5V20h5v-6h2v6h5V9.5",
  bed: "M3 7v13M3 12h13a4 4 0 0 1 4 4v4M3 20h18M6 12V9h5v3",
  store: "M4 9 5 4h14l1 5M4 9h16M4 9v11h16V9M4 9a2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0 2.5 2.5 0 0 0 4 0M9 20v-5h6v5",
  briefcase: "M4 8h16v11H4zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16",
  heart: "M12 20S3.5 14.5 3.5 8.8A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 8.5 2.8C20.5 14.5 12 20 12 20z",
  wrench: "M14.5 6.2a4 4 0 0 0-5.3 5.3L3 17.7V21h3.3l6.2-6.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.3-.6-.6-2.3z",
  cross: "M9.5 3h5v6h6v5h-6v6h-5v-6h-6v-5h6z",
  pill: "M10.5 20.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7zM7.5 7.5l7 7",
  parking: "M6 3h7a5 5 0 0 1 0 10h-4v8H6V3zm3 3v4h3.5a2 2 0 0 0 0-4z",
  sparkle: "M9 3l1.6 4.4L15 9l-4.4 1.6L9 15l-1.6-4.4L3 9l4.4-1.6zM18 13l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  shirt: "M8 3l4 3 4-3 4 3-2.5 3H18v12H6V9H4.5L2 6z",
};

const CATEGORY_ICON: Record<string, IconKey> = {
  "Food & Drink": "utensils",
  Retail: "bag",
  Transport: "car",
  Property: "home",
  Travel: "bed",
  General: "store",
  Business: "briefcase",
  Nonprofit: "heart",
  Services: "wrench",
  Health: "cross",
};

// More specific per-slug icons where the category is broad.
const SLUG_ICON: Record<string, IconKey> = {
  "cafe-receipt": "cup",
  "grocery-receipt": "cart",
  "gas-station-receipt": "fuel",
  "taxi-receipt": "car",
  "parking-receipt": "parking",
  "hotel-receipt": "bed",
  "pharmacy-receipt": "pill",
  "medical-receipt": "cross",
  "cleaning-receipt": "sparkle",
  "electronics-receipt": "bolt",
  "clothing-receipt": "shirt",
  "car-repair-receipt": "wrench",
  "handyman-receipt": "wrench",
  "convenience-store-receipt": "store",
  "bar-receipt": "cup",
  "food-delivery-receipt": "utensils",
};

// Curated, on-brand-adjacent palette; deterministic per business so each
// template keeps a stable identity across the site.
const PALETTE = [
  "#b45309",
  "#7c4a2d",
  "#1d4ed8",
  "#0e7490",
  "#047857",
  "#7c3aed",
  "#b91c1c",
  "#0f766e",
  "#be185d",
  "#3f3f46",
  "#0891b2",
  "#c2410c",
  "#4d7c0f",
  "#9333ea",
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function brandColor(seed: string): string {
  return PALETTE[hash(seed) % PALETTE.length];
}

export default function BrandMark({
  category,
  seed,
  size = 34,
  color,
}: {
  category: string;
  seed: string;
  size?: number;
  /** Override the generated colour (e.g. force monochrome). */
  color?: string;
}) {
  const key = SLUG_ICON[seed] ?? CATEGORY_ICON[category] ?? "store";
  const bg = color ?? brandColor(seed);
  const s = Math.round(size * 0.56);
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ICONS[key]} />
      </svg>
    </span>
  );
}
