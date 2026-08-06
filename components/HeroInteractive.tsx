"use client";

import { useEffect, useState } from "react";
import Receipt from "./Receipt";
import { fromTemplate, hydrateVolatile, computeTotals } from "@/lib/receipt";
import { money } from "@/lib/currency";
import { getTemplate } from "@/lib/templates";
import type { ReceiptData } from "@/lib/types";

const PICKS = [
  { slug: "cafe-receipt", label: "Coffee shop" },
  { slug: "restaurant-receipt", label: "Restaurant" },
  { slug: "retail-receipt", label: "Retail" },
  { slug: "grocery-receipt", label: "Grocery" },
  { slug: "gas-station-receipt", label: "Fuel" },
  { slug: "taxi-receipt", label: "Taxi" },
];

export default function HeroInteractive() {
  const [active, setActive] = useState(PICKS[0].slug);
  const [data, setData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const tpl = getTemplate(active);
    if (tpl) setData(hydrateVolatile(fromTemplate(tpl)));
  }, [active]);

  const totals = data ? computeTotals(data) : null;
  const total = data && totals ? money(totals.total, data.currency) : "";
  const fileName = `${active.replace(/-receipt$/, "")}-receipt.pdf`;

  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px]"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 25%, rgba(246,81,29,.18), transparent 70%), radial-gradient(50% 50% at 20% 80%, rgba(247,161,43,.16), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* the app stage */}
      <div className="relative rounded-[26px] border border-[var(--line)] bg-[rgba(255,255,255,.72)] p-3.5 shadow-[var(--shadow-3)] backdrop-blur-md sm:p-4">
        {/* window bar */}
        <div className="mb-3.5 flex items-center gap-3 px-1">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffb4a1" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffd7a1" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#c8e6cf" }} />
          </div>
          <div className="flex-1 truncate rounded-md bg-[var(--bg-2)] px-2.5 py-1 text-center font-mono text-[10px] text-ink-500">
            buildmyreceipt.com/generator
          </div>
        </div>

        {/* format switcher */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {PICKS.map((p) => {
            const on = p.slug === active;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(p.slug)}
                aria-pressed={on}
                className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-all duration-150 ${
                  on
                    ? "text-white shadow-[var(--shadow-glow)]"
                    : "bg-[var(--bg-2)] text-ink-400 hover:text-ink-100"
                }`}
                style={on ? { background: "var(--grad-warm)" } : undefined}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* receipt viewport — height-capped so long receipts fade instead of ballooning */}
        <div className="relative h-[366px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 20%, rgba(255,255,255,.9), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <div className="flex justify-center pt-7">
            {data ? (
              <div
                key={active}
                className="animate-slide-up origin-top"
                style={{ transform: "scale(.72) rotate(-1.4deg)" }}
              >
                <Receipt data={data} />
              </div>
            ) : (
              <div
                className="rounded bg-black/[.04]"
                style={{ width: 240, height: 300 }}
                aria-hidden="true"
              />
            )}
          </div>
          {/* fade the tail of long receipts */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: "linear-gradient(180deg, transparent, var(--paper-2) 88%)" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* floating: live total */}
      <div className="absolute -right-3 top-24 hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 shadow-[var(--shadow-2)] sm:block">
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: "var(--mint)" }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-400">
            Live total
          </span>
        </div>
        <div className="mt-0.5 font-display text-[22px] font-extrabold tabular-nums leading-none tracking-[-0.02em] text-ink-50">
          {total}
        </div>
      </div>

      {/* floating: download success */}
      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 shadow-[var(--shadow-2)] sm:flex">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
          style={{ background: "var(--mint)" }}
          aria-hidden="true"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div className="min-w-0">
          <div className="truncate font-mono text-[11px] font-medium text-ink-100">{fileName}</div>
          <div className="text-[10px] text-ink-500">Downloaded · 3× resolution</div>
        </div>
      </div>
    </div>
  );
}
