import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Free Receipt Maker, Optional Pro",
  description:
    "The receipt maker is free with no signup and no watermark. Pro adds saved businesses, receipt history, bulk export and accounting integrations.",
  alternates: { canonical: "/pricing" },
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    note: "No account needed",
    cta: { href: "/generator", label: "Start now", primary: true },
    features: [
      "Unlimited receipts",
      "No watermark",
      "All 24 templates",
      "PNG, PDF and JPEG export at 3×",
      "58mm, 80mm, 110mm and A4",
      "14 currencies",
      "Your own logo",
    ],
    hero: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    cadence: "per month",
    note: "or $79/year — save 34%",
    cta: { href: "/generator", label: "Coming soon", primary: false },
    features: [
      "Everything in Free",
      "Saved businesses and customers",
      "Receipt history and reissue",
      "Sequential receipt numbering",
      "Bulk create from CSV",
      "Custom footer presets",
      "Email support",
    ],
    hero: true,
  },
  {
    name: "Business",
    price: "$24.99",
    cadence: "per month",
    note: "or $199/year",
    cta: { href: "/generator", label: "Coming soon", primary: false },
    features: [
      "Everything in Pro",
      "3 team seats",
      "QuickBooks and Xero CSV export",
      "VAT, GST and HST formats",
      "Recurring receipts",
      "Priority support",
    ],
    hero: false,
  },
];

export default function Pricing() {
  return (
    <>
      <div className="hero-mesh border-b border-[var(--line)]">
        <div className="container-x py-14 text-center">
          <p className="eyebrow mb-3 justify-center">Pricing</p>
          <h1 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink-50">
            The receipt maker is free. Properly free.
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-300">
            No signup, no watermark, no cap on how many you make. Paid plans exist for
            people who issue receipts regularly and want them saved, numbered and exported
            into their books.
          </p>
        </div>
      </div>

      <div className="container-x py-14">
        <div className="grid gap-4 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-[12px] p-8 ${
                t.hero
                  ? "bg-[var(--surface-dark)] text-white"
                  : "border border-[var(--line)] bg-white text-ink-200 shadow-[var(--shadow-1)]"
              }`}
            >
              {t.hero && (
                <span className="absolute -top-2.5 left-8 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                  Most useful
                </span>
              )}

              <h2
                className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${
                  t.hero ? "text-white/60" : "text-ink-400"
                }`}
              >
                {t.name}
              </h2>

              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`font-display text-[38px] font-extrabold tabular-nums leading-none tracking-[-0.035em] ${
                    t.hero ? "text-white" : "text-ink-50"
                  }`}
                >
                  {t.price}
                </span>
                <span className={`text-[13px] ${t.hero ? "text-white/60" : "text-ink-400"}`}>
                  {t.cadence}
                </span>
              </div>
              <p className={`mt-2 text-[12px] ${t.hero ? "text-white/55" : "text-ink-400"}`}>
                {t.note}
              </p>

              <ul className="mt-7 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-[13.5px] ${
                      t.hero ? "text-white/85" : "text-ink-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                        t.hero ? "bg-white/15 text-white" : "bg-[var(--accent-soft)] text-[var(--accent)]"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={t.cta.href}
                className={`btn mt-8 w-full ${
                  t.hero ? "btn-invert" : t.cta.primary ? "btn-primary" : "btn-ghost"
                }`}
                aria-disabled={!t.cta.primary}
              >
                {t.cta.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-[68ch]">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
            Why is the free tier this generous?
          </h2>
          <p className="mt-3 text-[14.5px] leading-[1.72] text-ink-400">
            Because most people need one receipt, once, and putting a watermark across it or
            demanding an email first is a bad trade for both of us. The generator costs us
            almost nothing to run — it executes in your browser, not on our servers — so
            giving it away is cheap and it is how people find us.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.72] text-ink-400">
            The paid plans solve a different problem: issuing receipts <em>repeatedly</em>.
            If you run a cash business and write up receipts every week, you want saved
            customers, a numbered sequence you can prove is unbroken, and a CSV your
            bookkeeper can import. That is worth paying for. A single receipt is not.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold tracking-[-0.02em]">
            Questions
          </h2>
          <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {[
              {
                q: "Is the free plan a trial?",
                a: "No. It does not expire and it does not ask for a card. Unlimited receipts, no watermark.",
              },
              {
                q: "When are the paid plans launching?",
                a: "Pro and Business are in build. The free generator is fully working now and will stay free.",
              },
              {
                q: "Will you add a watermark later?",
                a: "No. What is free today stays free. Paid plans add capability, they do not remove it.",
              },
              {
                q: "Do you store my receipt data?",
                a: "No. The generator runs in your browser and the export is produced on your device. Nothing you type reaches our servers.",
              },
            ].map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-ink-100 transition-colors hover:text-ink-50">
                  {f.q}
                  <span
                    className="shrink-0 font-mono text-ink-500 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-8 text-[14px] leading-relaxed text-ink-400">{f.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-ink-500">
            Questions about pricing? {SITE.email}
          </p>
        </div>
      </div>
    </>
  );
}
