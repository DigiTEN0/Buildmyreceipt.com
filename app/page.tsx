import Link from "next/link";
import type { Metadata } from "next";
import { TEMPLATES } from "@/lib/templates";
import { SITE } from "@/lib/site";
import HeroReceipt from "@/components/HeroReceipt";

export const metadata: Metadata = {
  title: "Free Receipt Generator — Create Business Receipts Online | BuildMyReceipt",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    t: "Real thermal output",
    d: "58mm, 80mm, 110mm and A4, with correct column widths, torn edges and monospace print. Not a word-processor table pretending to be a receipt.",
  },
  {
    t: "Automatic maths",
    d: "Subtotal, discount, tax and tip calculate in the right order and update as you type. The arithmetic on the page always adds up.",
  },
  {
    t: "14 currencies",
    d: "Dollar, euro, pound, rupee, peso, naira and more, with tax labelled as sales tax, VAT, GST or HST to match your jurisdiction.",
  },
  {
    t: "Your own logo",
    d: "Upload your business logo and it prints in the header. Your branding, on your receipts.",
  },
  {
    t: "PNG and PDF",
    d: "Export at 3× resolution for a crisp print, or straight to PDF sized to the paper you picked.",
  },
  {
    t: "No signup",
    d: "Open the generator and start. Nothing to create, nothing to confirm, no card.",
  },
];

const FAQS = [
  {
    q: "Is the receipt generator really free?",
    a: "Yes. You can build a receipt and download it as a PNG or PDF without creating an account or entering payment details.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. The generator runs in your browser and works immediately. An account is only needed if you want to save businesses and receipt history.",
  },
  {
    q: "What is this tool for?",
    a: "Recording your own sales — particularly cash transactions where no card statement exists — reissuing a record of a transaction that took place, and producing template or test documents. It is not for deceiving anyone.",
  },
  {
    q: "What paper sizes are supported?",
    a: "58mm and 80mm thermal (the two standard till-roll widths), 110mm wide thermal, and A4 or Letter for documents that get emailed or filed.",
  },
  {
    q: "Can I add my own logo?",
    a: "Yes. Upload a PNG, JPG, SVG or WebP and it prints in the receipt header. Only upload logos you own or are authorised to use.",
  },
  {
    q: "Can I change the date on a receipt?",
    a: "Yes. If you are writing up a cash sale from last week, set the date to when the sale actually happened — that is what makes the record accurate.",
  },
  {
    q: "Which currencies and taxes are supported?",
    a: "Fourteen currencies, with a free-text tax label so you can show sales tax, VAT, GST, HST or any local equivalent at whatever rate applies.",
  },
  {
    q: "Is my data stored on your servers?",
    a: "No. The generator runs entirely in your browser and the receipt is rendered and exported on your device. Nothing you type is sent to us.",
  },
];

export default function Home() {
  const featured = TEMPLATES.slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: SITE.name,
        url: SITE.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: SITE.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════ hero ══════ */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--acid)" }}
                aria-hidden="true"
              />
              Free · No signup · Runs in your browser
            </p>

            <h1 className="max-w-[15ch] text-balance font-display text-[clamp(2.3rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Receipts that look like they came off a till.
            </h1>

            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-ink-300">
              A proper receipt generator for business records. Real thermal widths, real
              monospace print, maths that adds up. Build one in about thirty seconds and
              download it as a PNG or PDF.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/generator" className="btn btn-primary !px-6 !py-3 !text-[15px]">
                Create a receipt — free
              </Link>
              <Link href="/templates" className="btn btn-ghost !px-5 !py-3 !text-[15px]">
                Browse {TEMPLATES.length} templates
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--line)] pt-7">
              {[
                ["4", "paper sizes"],
                ["14", "currencies"],
                ["0", "signup steps"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                    {n}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <HeroReceipt />
          </div>
        </div>
      </section>

      {/* ══════ features ══════ */}
      <section className="container-x py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">What you get</p>
          <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
            Built by someone who looked at a real receipt first
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="bg-[var(--panel)] p-6">
              <h3 className="font-display text-[15px] font-semibold tracking-[-0.01em]">
                {f.t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ templates ══════ */}
      <section className="container-x pb-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Templates</p>
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
              Start from the format you actually need
            </h2>
          </div>
          <Link href="/templates" className="btn btn-ghost">
            All templates →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="panel group p-5 transition-all duration-150 hover:border-ink-600 hover:bg-[var(--bg-2)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                {t.category}
              </p>
              <h3 className="mt-2.5 font-display text-[15px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-[var(--acid)]">
                {t.name}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ how ══════ */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-2)]">
        <div className="container-x py-20">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
            Three steps, about thirty seconds
          </h2>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Enter your business",
                d: "Name, address, phone. Upload your logo if you have one. This becomes the header block.",
              },
              {
                t: "Add what was sold",
                d: "One line per item with quantity and unit price. Set your tax rate and the totals calculate themselves.",
              },
              {
                t: "Download",
                d: "Pick your paper width, then export a 3× PNG or a PDF sized to match. Print it or email it.",
              },
            ].map((s, i) => (
              <li key={s.t} className="border-t-2 border-[var(--acid)] pt-5">
                <span className="font-mono text-[11px] tabular-nums text-ink-500">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-semibold tracking-[-0.015em]">
                  {s.t}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════ faq ══════ */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
              Questions people actually ask
            </h2>
          </div>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-ink-100 transition-colors hover:text-white">
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
        </div>
      </section>

      {/* ══════ cta ══════ */}
      <section className="container-x pb-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-8 py-14 text-center">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,var(--acid),transparent)",
            }}
            aria-hidden="true"
          />
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-[-0.028em]">
            Make your first receipt
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-400">
            No account, no card, no watermark. Open the generator and it works.
          </p>
          <Link
            href="/generator"
            className="btn btn-primary mt-7 !px-7 !py-3 !text-[15px]"
          >
            Open the generator
          </Link>
        </div>
      </section>

      {/* ══════ seo copy ══════ */}
      <section className="container-x pb-20">
        <div className="max-w-[70ch] space-y-8 border-t border-[var(--line)] pt-14">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
              Free online receipt generator
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">
              BuildMyReceipt is a free{" "}
              <Link href="/generator" className="link">
                receipt generator
              </Link>{" "}
              for creating clean, itemised business receipts online. Pick a format, enter your
              business details and what was sold, and download a print-ready PNG or PDF. It
              works on any device, needs no account, and runs entirely in your browser — the
              details you type never reach our servers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
              Receipt templates for every trade
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">
              The library covers the formats small businesses actually issue:{" "}
              <Link href="/templates/restaurant-receipt" className="link">
                restaurant
              </Link>{" "}
              and{" "}
              <Link href="/templates/cafe-receipt" className="link">
                coffee shop
              </Link>{" "}
              receipts,{" "}
              <Link href="/templates/grocery-receipt" className="link">
                grocery
              </Link>{" "}
              and{" "}
              <Link href="/templates/retail-receipt" className="link">
                retail
              </Link>{" "}
              receipts,{" "}
              <Link href="/templates/gas-station-receipt" className="link">
                fuel
              </Link>{" "}
              and{" "}
              <Link href="/templates/taxi-receipt" className="link">
                taxi
              </Link>{" "}
              receipts,{" "}
              <Link href="/templates/rent-receipt" className="link">
                rent receipts
              </Link>
              ,{" "}
              <Link href="/templates/donation-receipt" className="link">
                donation receipts
              </Link>
              ,{" "}
              <Link href="/templates/car-repair-receipt" className="link">
                auto repair
              </Link>{" "}
              and{" "}
              <Link href="/templates/handyman-receipt" className="link">
                trade receipts
              </Link>
              . Each one loads a working generator preset with the fields that format needs.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
              Why cash businesses need receipts
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">
              Card payments leave a statement, a processor record and a bank entry. Cash
              leaves nothing. For a trade, a market stall, a tutor or a cleaner, the receipt
              is the only artefact the transaction produces — it is what lets declared income
              be reconciled later, and what lets a customer claim under a warranty or an
              expense policy. Issuing one on every job, numbered in sequence, is the cheapest
              bookkeeping discipline available. That is what this tool is built for.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
