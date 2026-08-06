"use client";

import { forwardRef } from "react";
import type { ReceiptData } from "@/lib/types";
import { computeTotals, formatDate, PAPER_WIDTH, barcodeBars } from "@/lib/receipt";
import { plain, CURRENCIES } from "@/lib/currency";
import BrandMark from "./BrandMark";

const DENSITY = {
  condensed: { fs: 10.5, lh: 1.42, pad: 14 },
  normal: { fs: 11.5, lh: 1.55, pad: 18 },
  wide: { fs: 13, lh: 1.7, pad: 22 },
} as const;

function TornEdge({ flip = false, color }: { flip?: boolean; color: string }) {
  return (
    <svg
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      className="block w-full"
      style={{ height: 11, transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M0 2 L0 1 L2.5 0.35 L5 1.15 L7.5 0.2 L10 1 L12.5 0.4 L15 1.25 L17.5 0.3 L20 1.05 L22.5 0.25 L25 1.2 L27.5 0.35 L30 1.1 L32.5 0.2 L35 1 L37.5 0.45 L40 1.2 L42.5 0.3 L45 1.05 L47.5 0.2 L50 1.15 L52.5 0.35 L55 1 L57.5 0.25 L60 1.2 L62.5 0.4 L65 1.1 L67.5 0.2 L70 1.05 L72.5 0.3 L75 1.2 L77.5 0.35 L80 1 L82.5 0.25 L85 1.15 L87.5 0.4 L90 1.05 L92.5 0.2 L95 1.2 L97.5 0.35 L100 1 L100 2 Z"
        fill={color}
      />
    </svg>
  );
}

function Rule({ char = "-" }: { char?: string }) {
  return (
    <div
      className="overflow-hidden whitespace-nowrap select-none opacity-70"
      aria-hidden="true"
      style={{ letterSpacing: "0.04em" }}
    >
      {char.repeat(200)}
    </div>
  );
}

function Row({
  left,
  right,
  bold = false,
  size,
}: {
  left: string;
  right: string;
  bold?: boolean;
  size?: number;
}) {
  return (
    <div
      className="flex items-baseline gap-2"
      style={{ fontWeight: bold ? 700 : 400, fontSize: size }}
    >
      <span className="min-w-0 flex-1 break-words">{left}</span>
      <span className="shrink-0 tabular-nums">{right}</span>
    </div>
  );
}

interface Props {
  data: ReceiptData;
  /** Watermark shown on the free preview. */
  watermark?: boolean;
  /** When set (and no uploaded logo), render a generated brand emblem in the header. */
  brand?: { category: string; seed: string };
}

const Receipt = forwardRef<HTMLDivElement, Props>(function Receipt(
  { data, watermark = false, brand },
  ref
) {
  const t = computeTotals(data);
  const paper = PAPER_WIDTH[data.paper];
  const d = DENSITY[data.options.density];
  const cur = data.currency;
  const sym = (CURRENCIES[cur] ?? CURRENCIES.USD).symbol;
  const isDoc = data.paper === "a4";
  const uc = data.options.uppercase;

  const tx = (s: string) => (uc ? s.toUpperCase() : s);
  const m = (v: number) => plain(v, cur);

  const bars = barcodeBars(data.meta.transactionId || "0", 46);

  return (
    <div
      ref={ref}
      className="relative mx-auto bg-white text-black shadow-[0_24px_60px_-18px_rgba(40,30,15,.28),0_6px_16px_-8px_rgba(40,30,15,.14)]"
      style={{
        width: paper.px,
        fontFamily: "var(--font-receipt)",
        fontSize: d.fs,
        lineHeight: d.lh,
        fontVariantLigatures: "none",
        letterSpacing: isDoc ? "0" : "-0.01em",
      }}
      data-receipt-root=""
    >
      {data.options.torn && !isDoc && <TornEdge color="#ffffff" />}

      <div style={{ padding: `${isDoc ? 34 : d.pad}px ${isDoc ? 40 : d.pad}px` }}>
        {/* ── header ── */}
        <div className="text-center">
          {data.business.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={data.business.logo}
              alt=""
              className="mx-auto mb-2 object-contain"
              style={{ maxHeight: isDoc ? 64 : 44, maxWidth: "70%" }}
            />
          ) : brand ? (
            <div className="mb-2 flex justify-center">
              <BrandMark category={brand.category} seed={brand.seed} size={isDoc ? 46 : 38} />
            </div>
          ) : null}
          <div
            style={{
              fontWeight: 700,
              fontSize: isDoc ? d.fs * 1.7 : d.fs * 1.32,
              letterSpacing: isDoc ? "-0.01em" : "0.06em",
              lineHeight: 1.25,
            }}
          >
            {tx(data.business.name)}
          </div>
          {data.business.address && <div>{tx(data.business.address)}</div>}
          {data.business.cityLine && <div>{tx(data.business.cityLine)}</div>}
          {data.business.phone && <div>{data.business.phone}</div>}
          {data.business.website && <div>{data.business.website}</div>}
          {data.business.taxId && <div className="mt-1">{tx(data.business.taxId)}</div>}
        </div>

        <div className="my-2">
          <Rule char="=" />
        </div>

        {/* ── meta ── */}
        <div className="text-center">
          {formatDate(data.meta.date)}
          {data.meta.time ? `  ${data.meta.time}` : ""}
        </div>

        {(data.meta.cashier ||
          data.meta.transactionId ||
          data.meta.register ||
          data.meta.storeNumber) && (
          <>
            <div className="my-2">
              <Rule />
            </div>
            <div className="space-y-0.5">
              {data.meta.cashier && (
                <Row left={tx("Cashier")} right={tx(data.meta.cashier)} />
              )}
              {data.meta.transactionId && (
                <Row left={tx("Transaction")} right={`#${data.meta.transactionId}`} />
              )}
              {data.meta.register && <Row left={tx("Register")} right={tx(data.meta.register)} />}
              {data.meta.storeNumber && (
                <Row left={tx("Store")} right={tx(data.meta.storeNumber)} />
              )}
            </div>
          </>
        )}

        <div className="my-2">
          <Rule />
        </div>

        {/* ── items ── */}
        <div className="space-y-1">
          {data.items.map((item) => {
            const lineTotal = item.qty * item.price;
            const showQty = item.qty !== 1;
            return (
              <div key={item.id}>
                <Row
                  left={`${showQty ? `${+item.qty.toFixed(3)}  ` : ""}${tx(item.name || "—")}`}
                  right={m(lineTotal)}
                />
                {showQty && item.price > 0 && (
                  <div className="opacity-60" style={{ paddingLeft: "1.4em" }}>
                    @ {sym}
                    {m(item.price)} each
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="my-2">
          <Rule />
        </div>

        {/* ── totals ── */}
        <div className="space-y-0.5">
          <Row left={tx("Subtotal")} right={`${sym}${m(t.subtotal)}`} />
          {t.discount > 0 && (
            <Row left={tx("Discount")} right={`-${sym}${m(t.discount)}`} />
          )}
          {data.taxRate > 0 && (
            <Row left={tx(data.taxLabel || "Tax")} right={`${sym}${m(t.tax)}`} />
          )}
          {t.tip > 0 && (
            <Row left={`${tx("Tip")} ${data.tipRate}%`} right={`${sym}${m(t.tip)}`} />
          )}
        </div>

        <div className="my-2">
          <Rule char="=" />
        </div>

        <Row
          left={tx("TOTAL")}
          right={`${sym}${m(t.total)}`}
          bold
          size={isDoc ? d.fs * 1.35 : d.fs * 1.22}
        />

        {/* ── payment ── */}
        <div className="my-2">
          <Rule />
        </div>
        <div className="space-y-0.5">
          <Row left={tx("Payment")} right={tx(data.payment.method)} />
          {data.payment.last4 && (
            <Row left={tx("Card")} right={`************${data.payment.last4}`} />
          )}
          {data.payment.approvalCode && (
            <Row left={tx("Approval")} right={tx(data.payment.approvalCode)} />
          )}
          <Row left={tx("Amount")} right={`${sym}${m(t.total)}`} />
          {data.payment.changeDue > 0 && (
            <Row left={tx("Change Due")} right={`${sym}${m(data.payment.changeDue)}`} />
          )}
        </div>

        {data.footer.showSavings && data.footer.savings > 0 && (
          <>
            <div className="my-2">
              <Rule char="*" />
            </div>
            <div className="text-center" style={{ fontWeight: 700 }}>
              {tx(`You saved ${sym}${m(data.footer.savings)} today!`)}
            </div>
          </>
        )}

        {/* ── footer ── */}
        {(data.footer.headline || data.footer.lines.length > 0) && (
          <>
            <div className="my-2">
              <Rule />
            </div>
            <div className="text-center space-y-0.5">
              {data.footer.headline && (
                <div style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                  {tx(data.footer.headline)}
                </div>
              )}
              {data.footer.lines.filter(Boolean).map((line, i) => (
                <div key={i}>{tx(line)}</div>
              ))}
            </div>
          </>
        )}

        {data.footer.showSurvey && (
          <div className="mt-3 text-center opacity-80">
            <div>{tx("Tell us how we did")}</div>
            <div>{tx("Survey code:")} {data.meta.transactionId}-{data.meta.storeNumber || "01"}</div>
          </div>
        )}

        {data.footer.showBarcode && (
          <div className="mt-4 flex flex-col items-center gap-1">
            <div className="flex h-10 items-end gap-[1px]" aria-hidden="true">
              {bars.map((w, i) => (
                <span
                  key={i}
                  className="block bg-black"
                  style={{ width: w, height: i % 7 === 0 ? "100%" : "88%" }}
                />
              ))}
            </div>
            <div style={{ letterSpacing: "0.22em", fontSize: d.fs * 0.92 }}>
              {data.meta.transactionId}
            </div>
          </div>
        )}

        <div className="mt-4">
          <Rule char="=" />
        </div>
      </div>

      {/* thermal fade */}
      {data.options.fade > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0) 45%, rgba(255,255,255,${
              data.options.fade / 100
            }) 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {watermark && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
          data-watermark=""
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: "180%",
              height: "180%",
              transform: "translate(-50%,-50%) rotate(-32deg)",
              display: "flex",
              flexWrap: "wrap",
              gap: `${paper.px * 0.06}px ${paper.px * 0.05}px`,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: paper.px * 0.052,
                  fontWeight: 700,
                  color: "rgba(30,26,19,.085)",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                BuildMyReceipt
              </span>
            ))}
          </div>
        </div>
      )}

      {data.options.torn && !isDoc && <TornEdge flip color="#ffffff" />}
    </div>
  );
});

export default Receipt;
