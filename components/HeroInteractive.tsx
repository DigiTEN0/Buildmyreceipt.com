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
      <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
        {PICKS.map((p) => {
          const on = p.slug === active;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(p.slug)}
              aria-pressed={on}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-150 ${
                on
                  ? "border-transparent text-[var(--on-accent)] shadow-[var(--shadow-glow)]"
                  : "border-[var(--line-2)] bg-[var(--surface)] text-ink-300 hover:border-ink-500 hover:text-ink-100"
              }`}
              style={on ? { background: "var(--grad-warm)" } : undefined}
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
            style={{ transform: "rotate(-1.4deg) scale(.94)" }}
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
          <div className="absolute -right-3 top-6 hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 shadow-[var(--shadow-2)] sm:block">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--mint)" }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-400">
                Live total
              </span>
            </div>
            <div className="mt-0.5 font-display text-xl font-extrabold tabular-nums tracking-[-0.02em] text-ink-50">
              {total}
            </div>
          </div>

          {/* export badge */}
          <div className="absolute -left-4 bottom-10 hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 shadow-[var(--shadow-2)] sm:block">
            <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--accent-600)]">
              Export
            </div>
            <div className="mt-0.5 text-[12px] font-bold text-ink-100">PNG · PDF · JPEG</div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[12.5px] text-ink-400 lg:text-left">
        Tap a format to preview it live —{" "}
        <Link href="/generator" className="link">
          or open the full editor
        </Link>
        .
      </p>
    </div>
  );
}
