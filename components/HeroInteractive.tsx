"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Receipt from "./Receipt";
import { fromTemplate, hydrateVolatile, computeTotals } from "@/lib/receipt";
import { money } from "@/lib/currency";
import { getTemplate } from "@/lib/templates";
import type { ReceiptData } from "@/lib/types";

// Thermal-width templates only, so the hero preview keeps a consistent size.
const PICKS = [
  { slug: "grocery-receipt", label: "Grocery" },
  { slug: "restaurant-receipt", label: "Restaurant" },
  { slug: "cafe-receipt", label: "Coffee shop" },
  { slug: "gas-station-receipt", label: "Fuel" },
  { slug: "retail-receipt", label: "Retail" },
  { slug: "itemized-receipt", label: "Itemized" },
  { slug: "pharmacy-receipt", label: "Pharmacy" },
];

export default function HeroInteractive() {
  const [active, setActive] = useState(PICKS[0].slug);
  const [data, setData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const tpl = getTemplate(active);
    if (tpl) setData(hydrateVolatile(fromTemplate(tpl)));
  }, [active]);

  const total = data ? money(computeTotals(data).total, data.currency) : "";

  return (
    <div className="relative">
      <div className="warm-wash pointer-events-none absolute -inset-10 -z-10 rounded-[40px]" aria-hidden="true" />

      {/* switcher */}
      <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
        {PICKS.map((p) => {
          const on = p.slug === active;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(p.slug)}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-all duration-150 ${
                on
                  ? "border-transparent text-[var(--on-accent)] shadow-[0_6px_16px_-6px_rgba(31,143,242,.5)]"
                  : "border-[var(--line-2)] bg-[var(--surface)] text-ink-300 hover:border-ink-500"
              }`}
              style={on ? { background: "var(--accent)" } : undefined}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-start justify-center gap-5 lg:justify-start">
        {/* the live preview */}
        <div className="relative">
          <div
            key={active}
            className="animate-slide-up origin-top"
            style={{ transform: "rotate(-1deg) scale(.92)" }}
          >
            {data ? (
              <Receipt data={data} />
            ) : (
              <div
                className="rounded bg-black/[.04]"
                style={{ width: 340, height: 480 }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* live total chip */}
          <div className="absolute -right-3 top-6 hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 shadow-[var(--shadow-2)] sm:block">
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-400">
              Total
            </div>
            <div className="font-display text-lg font-semibold tabular-nums tracking-[-0.02em]">
              {total}
            </div>
          </div>
        </div>

        {/* feature ticks — desktop only, kept compact */}
        <ul className="hidden shrink-0 space-y-3 pt-8 xl:block">
          {[
            "Real thermal print",
            "Live totals",
            "Your logo",
            "PNG · PDF · JPG",
            "No signup",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13px] text-ink-300">
              <span
                className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-[var(--on-accent)]"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-[12px] text-ink-400 lg:text-left">
        Click a format above to preview it —{" "}
        <Link href="/generator" className="link">
          or open the editor
        </Link>
        .
      </p>
    </div>
  );
}
