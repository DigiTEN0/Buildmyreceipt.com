import { fromTemplate, computeTotals, barcodeBars } from "@/lib/receipt";
import { money } from "@/lib/currency";
import type { TemplateDef } from "@/lib/types";
import BrandMark from "./BrandMark";

/**
 * Compact, static receipt card for the marquee and template grids. Deliberately
 * lightweight — not the full editable renderer — so we can show dozens at once.
 */
export default function MiniReceipt({
  template,
  className = "",
}: {
  template: TemplateDef;
  className?: string;
}) {
  const data = fromTemplate(template);
  const totals = computeTotals(data);
  const items = data.items.slice(0, 5);
  const bars = barcodeBars(template.slug, 34);
  const cur = data.currency;

  return (
    <figure
      className={`w-[188px] shrink-0 rounded-[10px] bg-white px-4 pb-4 pt-4 text-black shadow-[0_10px_30px_-12px_rgba(40,30,15,.25),0_2px_8px_-4px_rgba(40,30,15,.12)] ${className}`}
      style={{ fontFamily: "var(--font-receipt)", fontSize: 8.5, lineHeight: 1.5 }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center text-center">
        <BrandMark category={template.category} seed={template.slug} size={26} />
        <div className="mt-1.5" style={{ fontWeight: 700, fontSize: 10, letterSpacing: "0.04em" }}>
          {data.business.name.toUpperCase()}
        </div>
        {data.business.cityLine && (
          <div className="text-black/60">{data.business.cityLine}</div>
        )}
      </div>

      <div className="my-1.5 border-t border-dashed border-black/25" />

      <div className="space-y-[3px]">
        {items.map((it) => (
          <div key={it.id} className="flex justify-between gap-2">
            <span className="min-w-0 truncate">
              {it.qty !== 1 ? `${+it.qty.toFixed(2)} ` : ""}
              {it.name}
            </span>
            <span className="shrink-0 tabular-nums">{money(it.qty * it.price, cur)}</span>
          </div>
        ))}
      </div>

      <div className="my-1.5 border-t border-dashed border-black/25" />

      <div className="flex justify-between" style={{ fontWeight: 700, fontSize: 9.5 }}>
        <span>TOTAL</span>
        <span className="tabular-nums">{money(totals.total, cur)}</span>
      </div>

      <div className="mt-2.5 flex h-6 items-end justify-center gap-[1px]">
        {bars.map((w, i) => (
          <span
            key={i}
            className="block bg-black"
            style={{ width: w * 0.9, height: i % 6 === 0 ? "100%" : "82%" }}
          />
        ))}
      </div>
    </figure>
  );
}
