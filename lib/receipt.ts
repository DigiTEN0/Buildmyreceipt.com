import type { ReceiptData, LineItem, PaperSize } from "./types";
import type { TemplateDef } from "./types";

export const PAPER_WIDTH: Record<PaperSize, { px: number; cols: number; label: string }> = {
  "58mm": { px: 260, cols: 32, label: "58mm — compact thermal" },
  "80mm": { px: 340, cols: 42, label: "80mm — standard thermal" },
  "110mm": { px: 440, cols: 56, label: "110mm — wide thermal" },
  a4: { px: 620, cols: 76, label: "A4 / Letter — document" },
};

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function randomDigits(n: number): string {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyItem(): LineItem {
  return { id: newId(), qty: 1, name: "", price: 0 };
}

/**
 * Deterministic base state.
 *
 * Date, time and transaction ref are intentionally left blank: this runs during
 * static generation AND during client hydration, and any value derived from the
 * clock or Math.random would differ between the two and trip a hydration
 * mismatch. `hydrateVolatile` fills them once, after mount.
 */
export function defaultReceipt(): ReceiptData {
  return {
    style: "thermal",
    paper: "80mm",
    business: {
      name: "Your Business Name",
      address: "123 Example Street",
      cityLine: "Springfield, IL 62704",
      phone: "(555) 555-0100",
      website: "",
      taxId: "",
      logo: null,
    },
    meta: {
      date: "",
      time: "",
      cashier: "",
      transactionId: "",
      register: "",
      storeNumber: "",
    },
    items: [
      { id: "seed-1", qty: 1, name: "Item description", price: 12.0 },
      { id: "seed-2", qty: 2, name: "Another item", price: 6.5 },
    ],
    currency: "USD",
    taxRate: 8.25,
    taxLabel: "Tax",
    discount: 0,
    tipRate: 0,
    showTip: false,
    payment: { method: "Visa", last4: "4892", approvalCode: "", changeDue: 0 },
    footer: {
      headline: "THANK YOU",
      lines: [],
      showBarcode: false,
      showSurvey: false,
      showSavings: false,
      savings: 0,
    },
    options: { density: "normal", fade: 0, curl: true, torn: true, uppercase: false },
  };
}

/**
 * Merge a template seed over the defaults. Deterministic — safe to call during
 * static generation and during hydration. Item ids are derived from the slug so
 * they match on both sides.
 */
export function fromTemplate(tpl: TemplateDef): ReceiptData {
  const base = defaultReceipt();
  const seed = tpl.seed;

  return {
    ...base,
    ...seed,
    business: { ...base.business, ...(seed.business ?? {}) },
    meta: { ...base.meta, ...(seed.meta ?? {}) },
    payment: { ...base.payment, ...(seed.payment ?? {}) },
    footer: { ...base.footer, ...(seed.footer ?? {}) },
    options: { ...base.options, ...(seed.options ?? {}) },
    items: (seed.items ?? base.items).map((i, idx) => ({
      ...i,
      id: `${tpl.slug}-${idx}`,
    })),
  };
}

/**
 * Fill the clock- and random-derived fields. Call once from an effect, never
 * during render — see the note on `defaultReceipt`.
 */
export function hydrateVolatile(r: ReceiptData): ReceiptData {
  return {
    ...r,
    meta: {
      ...r.meta,
      date: r.meta.date || todayISO(),
      time: r.meta.time || nowTime(),
      transactionId: r.meta.transactionId || randomDigits(6),
    },
    payment: {
      ...r.payment,
      approvalCode:
        r.payment.approvalCode ||
        (r.payment.method === "Cash" ? "" : randomDigits(6)),
    },
  };
}

export interface Totals {
  subtotal: number;
  discount: number;
  taxable: number;
  tax: number;
  tip: number;
  total: number;
}

export function computeTotals(r: ReceiptData): Totals {
  const subtotal = r.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const discount = Math.min(Math.max(r.discount || 0, 0), subtotal);
  const taxable = subtotal - discount;
  const tax = taxable * ((r.taxRate || 0) / 100);
  const tip = r.showTip ? taxable * ((r.tipRate || 0) / 100) : 0;
  const total = taxable + tax + tip;
  return { subtotal, discount, taxable, tax, tip, total };
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${m}/${d}/${y}`;
}

/** Deterministic pseudo-barcode bar widths from a seed string. */
export function barcodeBars(seed: string, count = 48): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    bars.push((Math.abs(h) % 3) + 1);
  }
  return bars;
}
