"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Receipt from "./Receipt";
import type { ReceiptData, LineItem, PaperSize, PaymentMethod } from "@/lib/types";
import {
  defaultReceipt,
  fromTemplate,
  computeTotals,
  emptyItem,
  hydrateVolatile,
  fromSeed,
  PAPER_WIDTH,
} from "@/lib/receipt";
import { CURRENCIES, money } from "@/lib/currency";
import { getTemplate, TEMPLATES } from "@/lib/templates";

const PAPERS: PaperSize[] = ["58mm", "80mm", "110mm", "a4"];
const METHODS: PaymentMethod[] = [
  "Cash", "Visa", "Mastercard", "Amex", "Discover", "Debit",
  "Apple Pay", "Google Pay", "PayPal", "Bank Transfer", "Check",
];

/* ────────────────────────────── primitives ────────────────────────────── */

function Section({
  title,
  hint,
  children,
  defaultOpen = false,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--line)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--bg-2)]"
      >
        <span className="flex items-baseline gap-2.5">
          <span className="text-[13.5px] font-semibold text-ink-50">{title}</span>
          {hint && <span className="text-[11px] text-ink-500">{hint}</span>}
        </span>
        <span
          className="font-mono text-sm text-ink-500 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && <div className="space-y-3 px-4 pb-5 pt-1">{children}</div>}
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  ...rest
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        className="field"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-[var(--line-2)] bg-[var(--bg-2)] px-3 py-2 text-left transition-colors hover:border-ink-600"
    >
      <span className="text-[13px] text-ink-200">{label}</span>
      <span
        className="relative h-[18px] w-8 shrink-0 rounded-full transition-colors"
        style={{ background: checked ? "var(--acid)" : "var(--line-2)" }}
        aria-hidden="true"
      >
        <span
          className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all"
          style={{ left: checked ? 16 : 2 }}
        />
      </span>
    </button>
  );
}

/* ────────────────────────────── generator ────────────────────────────── */

export default function Generator({
  templateSlug,
  seed,
  seedKey,
}: {
  templateSlug?: string;
  /** Arbitrary starting state — used by the locale template pages. */
  seed?: Partial<ReceiptData>;
  /** Stable id for the seed, so item keys match between server and client. */
  seedKey?: string;
}) {
  const [data, setData] = useState<ReceiptData>(() => {
    if (seed) return fromSeed(seed, seedKey ?? "seed");
    const tpl = templateSlug ? getTemplate(templateSlug) : undefined;
    return tpl ? fromTemplate(tpl) : defaultReceipt();
  });
  const [busy, setBusy] = useState<null | "png" | "pdf">(null);
  const [toast, setToast] = useState<string | null>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const totals = useMemo(() => computeTotals(data), [data]);

  // Clock- and random-derived fields are filled after mount so the server-rendered
  // markup and the first client render match exactly.
  useEffect(() => {
    setData((d) => hydrateVolatile(d));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---- setters ---- */
  const set = useCallback(<K extends keyof ReceiptData>(key: K, value: ReceiptData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);

  const setIn = useCallback(
    <K extends keyof ReceiptData>(key: K, patch: Partial<ReceiptData[K]>) => {
      setData((d) => ({ ...d, [key]: { ...(d[key] as object), ...patch } as ReceiptData[K] }));
    },
    []
  );

  const updateItem = (id: string, patch: Partial<LineItem>) =>
    setData((d) => ({
      ...d,
      items: d.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));

  const removeItem = (id: string) =>
    setData((d) => ({ ...d, items: d.items.filter((i) => i.id !== id) }));

  const addItem = () => setData((d) => ({ ...d, items: [...d.items, emptyItem()] }));

  const moveItem = (id: string, dir: -1 | 1) =>
    setData((d) => {
      const idx = d.items.findIndex((i) => i.id === id);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= d.items.length) return d;
      const items = [...d.items];
      [items[idx], items[next]] = [items[next], items[idx]];
      return { ...d, items };
    });

  const onLogo = (file: File | null) => {
    if (!file) return setIn("business", { logo: null });
    if (file.size > 1_500_000) {
      setToast("Logo must be under 1.5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setIn("business", { logo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  /* ---- export ---- */
  const filename = () =>
    `${(data.business.name || "receipt").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${data.meta.date || "receipt"}`;

  const capture = async () => {
    const { toPng } = await import("html-to-image");
    const node = paperRef.current;
    if (!node) throw new Error("Nothing to export");
    return toPng(node, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });
  };

  const downloadPng = async () => {
    setBusy("png");
    try {
      const url = await capture();
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename()}.png`;
      a.click();
      setToast("PNG downloaded");
    } catch {
      setToast("Export failed — try again");
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    setBusy("pdf");
    try {
      const [{ jsPDF }, url] = await Promise.all([import("jspdf"), capture()]);
      const img = new Image();
      img.src = url;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

      const wPt = (img.width / 3) * 0.75;
      const hPt = (img.height / 3) * 0.75;
      const pdf = new jsPDF({
        orientation: hPt > wPt ? "portrait" : "landscape",
        unit: "pt",
        format: data.paper === "a4" ? "a4" : [wPt, hPt],
      });

      if (data.paper === "a4") {
        const pw = pdf.internal.pageSize.getWidth();
        const ph = pdf.internal.pageSize.getHeight();
        const scale = Math.min((pw - 48) / wPt, (ph - 48) / hPt, 1);
        const w = wPt * scale;
        const h = hPt * scale;
        pdf.addImage(url, "PNG", (pw - w) / 2, 24, w, h, undefined, "FAST");
      } else {
        pdf.addImage(url, "PNG", 0, 0, wPt, hPt, undefined, "FAST");
      }

      pdf.setProperties({
        title: `Receipt — ${data.business.name}`,
        creator: "BuildMyReceipt",
        subject: `Receipt ${data.meta.transactionId}`,
      });
      pdf.save(`${filename()}.pdf`);
      setToast("PDF downloaded");
    } catch {
      setToast("Export failed — try again");
    } finally {
      setBusy(null);
    }
  };

  const loadTemplate = (slug: string) => {
    const tpl = getTemplate(slug);
    if (tpl) {
      setData(hydrateVolatile(fromTemplate(tpl)));
      setToast(`Loaded ${tpl.name}`);
    }
  };

  const cur = CURRENCIES[data.currency] ?? CURRENCIES.USD;

  return (
    <div className="container-x grid gap-6 py-6 lg:grid-cols-[minmax(340px,400px)_1fr] lg:items-start">
      {/* ══════════ editor rail ══════════ */}
      <div className="no-print panel rail max-h-[calc(100vh-6rem)] overflow-y-auto lg:sticky lg:top-[4.5rem]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
          <h2 className="font-display text-sm font-semibold tracking-[-0.01em]">
            Receipt details
          </h2>
          <button
            type="button"
            className="btn-quiet font-mono text-[11px] uppercase tracking-wider"
            onClick={() => {
              setData(hydrateVolatile(defaultReceipt()));
              setToast("Reset");
            }}
          >
            Reset
          </button>
        </div>

        <Section title="Start from a template" hint={`${TEMPLATES.length} available`}>
          <select
            className="field"
            value={templateSlug ?? ""}
            onChange={(e) => e.target.value && loadTemplate(e.target.value)}
          >
            <option value="">Choose a template…</option>
            {TEMPLATES.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Section>

        <Section title="Business" defaultOpen>
          <Text
            label="Business name"
            value={data.business.name}
            onChange={(v) => setIn("business", { name: v })}
            placeholder="Your Business Name"
          />
          <Text
            label="Street address"
            value={data.business.address}
            onChange={(v) => setIn("business", { address: v })}
            placeholder="123 Example Street"
          />
          <Text
            label="City / region / postcode"
            value={data.business.cityLine}
            onChange={(v) => setIn("business", { cityLine: v })}
            placeholder="Springfield, IL 62704"
          />
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Phone"
              value={data.business.phone}
              onChange={(v) => setIn("business", { phone: v })}
              placeholder="(555) 555-0100"
            />
            <Text
              label="Website"
              value={data.business.website}
              onChange={(v) => setIn("business", { website: v })}
              placeholder="example.com"
            />
          </div>
          <Text
            label="Tax / VAT / registration number"
            value={data.business.taxId}
            onChange={(v) => setIn("business", { taxId: v })}
            placeholder="VAT GB 123 4567 89"
          />
          <div>
            <span className="label">Logo</span>
            <div className="flex items-center gap-2">
              <label className="btn btn-ghost cursor-pointer !py-2 !text-[12.5px]">
                {data.business.logo ? "Replace" : "Upload"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="sr-only"
                  onChange={(e) => onLogo(e.target.files?.[0] ?? null)}
                />
              </label>
              {data.business.logo && (
                <button
                  type="button"
                  className="btn-quiet text-[12.5px]"
                  onClick={() => setIn("business", { logo: null })}
                >
                  Remove
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-500">
              Upload your own logo only. Do not use logos or trade marks belonging to other
              businesses.
            </p>
          </div>
        </Section>

        <Section title="Transaction" defaultOpen>
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Date"
              type="date"
              value={data.meta.date}
              onChange={(v) => setIn("meta", { date: v })}
            />
            <Text
              label="Time"
              type="time"
              value={data.meta.time}
              onChange={(v) => setIn("meta", { time: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Cashier / server"
              value={data.meta.cashier}
              onChange={(v) => setIn("meta", { cashier: v })}
              placeholder="Maria G."
            />
            <Text
              label="Transaction no."
              value={data.meta.transactionId}
              onChange={(v) => setIn("meta", { transactionId: v })}
              placeholder="458921"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Register / table"
              value={data.meta.register}
              onChange={(v) => setIn("meta", { register: v })}
              placeholder="3"
            />
            <Text
              label="Store no."
              value={data.meta.storeNumber}
              onChange={(v) => setIn("meta", { storeNumber: v })}
              placeholder="1842"
            />
          </div>
        </Section>

        <Section title="Line items" hint={`${data.items.length}`} defaultOpen>
          <div className="space-y-2">
            {data.items.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-lg border border-[var(--line-2)] bg-[var(--bg-2)] p-2.5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-ink-500">
                    Item {idx + 1}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={idx === 0}
                      onClick={() => moveItem(item.id, -1)}
                      className="rounded px-1.5 py-0.5 font-mono text-[11px] text-ink-500 hover:bg-[var(--panel)] hover:text-ink-100 disabled:opacity-25"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={idx === data.items.length - 1}
                      onClick={() => moveItem(item.id, 1)}
                      className="rounded px-1.5 py-0.5 font-mono text-[11px] text-ink-500 hover:bg-[var(--panel)] hover:text-ink-100 disabled:opacity-25"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove item ${idx + 1}`}
                      onClick={() => removeItem(item.id)}
                      className="rounded px-1.5 py-0.5 font-mono text-[11px] text-ink-500 hover:bg-[var(--panel)] hover:text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <input
                  className="field mb-2"
                  value={item.name}
                  placeholder="Item description"
                  aria-label={`Item ${idx + 1} description`}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                />
                <div className="grid grid-cols-[1fr_1.3fr_auto] items-center gap-2">
                  <input
                    className="field"
                    type="number"
                    step="any"
                    min="0"
                    value={item.qty}
                    aria-label={`Item ${idx + 1} quantity`}
                    onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) || 0 })}
                  />
                  <div className="relative">
                    <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-ink-500">
                      {cur.symbol}
                    </span>
                    <input
                      className="field !pl-6"
                      type="number"
                      step="any"
                      min="0"
                      value={item.price}
                      aria-label={`Item ${idx + 1} unit price`}
                      onChange={(e) =>
                        updateItem(item.id, { price: Number(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <span className="w-[76px] shrink-0 truncate text-right font-mono text-[12px] tabular-nums text-ink-300">
                    {money(item.qty * item.price, data.currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-ghost w-full !py-2" onClick={addItem}>
            + Add item
          </button>
        </Section>

        <Section title="Currency, tax & tip">
          <label className="block">
            <span className="label">Currency</span>
            <select
              className="field"
              value={data.currency}
              onChange={(e) => set("currency", e.target.value)}
            >
              {Object.entries(CURRENCIES).map(([code, c]) => (
                <option key={code} value={code}>
                  {c.symbol} {code} — {c.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Tax rate %"
              type="number"
              step="any"
              min="0"
              value={data.taxRate}
              onChange={(v) => set("taxRate", Number(v) || 0)}
            />
            <Text
              label="Tax label"
              value={data.taxLabel}
              onChange={(v) => set("taxLabel", v)}
              placeholder="Sales Tax / VAT / GST"
            />
          </div>
          <Text
            label="Discount amount"
            type="number"
            step="any"
            min="0"
            value={data.discount}
            onChange={(v) => set("discount", Number(v) || 0)}
          />
          <Toggle
            label="Show tip line"
            checked={data.showTip}
            onChange={(v) => set("showTip", v)}
          />
          {data.showTip && (
            <Text
              label="Tip %"
              type="number"
              step="any"
              min="0"
              value={data.tipRate}
              onChange={(v) => set("tipRate", Number(v) || 0)}
            />
          )}
        </Section>

        <Section title="Payment">
          <label className="block">
            <span className="label">Method</span>
            <select
              className="field"
              value={data.payment.method}
              onChange={(e) => setIn("payment", { method: e.target.value as PaymentMethod })}
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Text
              label="Card last 4"
              value={data.payment.last4}
              onChange={(v) => setIn("payment", { last4: v.replace(/\D/g, "").slice(0, 4) })}
              placeholder="4892"
              inputMode="numeric"
            />
            <Text
              label="Approval code"
              value={data.payment.approvalCode}
              onChange={(v) => setIn("payment", { approvalCode: v })}
              placeholder="087453"
            />
          </div>
          <Text
            label="Change due"
            type="number"
            step="any"
            min="0"
            value={data.payment.changeDue}
            onChange={(v) => setIn("payment", { changeDue: Number(v) || 0 })}
          />
        </Section>

        <Section title="Footer">
          <Text
            label="Headline"
            value={data.footer.headline}
            onChange={(v) => setIn("footer", { headline: v })}
            placeholder="THANK YOU"
          />
          <label className="block">
            <span className="label">Additional lines</span>
            <textarea
              className="field min-h-[76px] resize-y font-mono text-[12px]"
              value={data.footer.lines.join("\n")}
              placeholder={"One line per row\nReturns within 30 days"}
              onChange={(e) => setIn("footer", { lines: e.target.value.split("\n") })}
            />
          </label>
          <Toggle
            label="Barcode"
            checked={data.footer.showBarcode}
            onChange={(v) => setIn("footer", { showBarcode: v })}
          />
          <Toggle
            label="Survey invitation"
            checked={data.footer.showSurvey}
            onChange={(v) => setIn("footer", { showSurvey: v })}
          />
          <Toggle
            label="Savings line"
            checked={data.footer.showSavings}
            onChange={(v) => setIn("footer", { showSavings: v })}
          />
          {data.footer.showSavings && (
            <Text
              label="Savings amount"
              type="number"
              step="any"
              min="0"
              value={data.footer.savings}
              onChange={(v) => setIn("footer", { savings: Number(v) || 0 })}
            />
          )}
        </Section>

        <Section title="Paper & style">
          <label className="block">
            <span className="label">Paper size</span>
            <select
              className="field"
              value={data.paper}
              onChange={(e) => set("paper", e.target.value as PaperSize)}
            >
              {PAPERS.map((p) => (
                <option key={p} value={p}>
                  {PAPER_WIDTH[p].label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="label">Density</span>
            <select
              className="field"
              value={data.options.density}
              onChange={(e) =>
                setIn("options", {
                  density: e.target.value as ReceiptData["options"]["density"],
                })
              }
            >
              <option value="condensed">Condensed</option>
              <option value="normal">Normal</option>
              <option value="wide">Wide</option>
            </select>
          </label>
          <Text
            label="Thermal fade %"
            type="number"
            min="0"
            max="70"
            value={data.options.fade}
            onChange={(v) =>
              setIn("options", { fade: Math.min(70, Math.max(0, Number(v) || 0)) })
            }
          />
          <Toggle
            label="Torn paper edges"
            checked={data.options.torn}
            onChange={(v) => setIn("options", { torn: v })}
          />
          <Toggle
            label="Uppercase text"
            checked={data.options.uppercase}
            onChange={(v) => setIn("options", { uppercase: v })}
          />
        </Section>
      </div>

      {/* ══════════ preview ══════════ */}
      <div className="min-w-0">
        <div className="no-print mb-4 flex flex-wrap items-center gap-2">
          <div className="mr-auto flex items-baseline gap-3">
            <span className="eyebrow">Preview</span>
            <span className="font-mono text-[12px] tabular-nums text-ink-300">
              {money(totals.total, data.currency)}
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-[var(--line-2)] bg-[var(--panel)] p-1">
            {PAPERS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => set("paper", p)}
                aria-pressed={data.paper === p}
                className="rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors"
                style={
                  data.paper === p
                    ? { background: "var(--acid)", color: "#0c0e13", fontWeight: 700 }
                    : { color: "var(--fg-3)" }
                }
              >
                {p === "a4" ? "A4" : p.replace("mm", "")}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => window.print()}
          >
            Print
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={downloadPng}
            disabled={busy !== null}
          >
            {busy === "png" ? "Exporting…" : "PNG"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadPdf}
            disabled={busy !== null}
          >
            {busy === "pdf" ? "Exporting…" : "Download PDF"}
          </button>
        </div>

        <div className="flex justify-center overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--bg-2)] p-6 sm:p-10">
          <div className="animate-slide-up">
            <Receipt ref={paperRef} data={data} />
          </div>
        </div>

        <p className="no-print mt-4 text-center text-[11.5px] leading-relaxed text-ink-500">
          Receipts you generate are for recording your own transactions, reissuing records of
          sales that took place, or template and testing use. They must not be used to
          deceive anyone. See the{" "}
          <a href="/legal/acceptable-use" className="link">
            Acceptable Use Policy
          </a>
          .
        </p>
      </div>

      {toast && (
        <div
          role="status"
          className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[var(--line-2)] bg-[var(--panel)] px-4 py-2.5 text-[13px] shadow-2xl"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
