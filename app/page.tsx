import Link from "next/link";
import type { Metadata } from "next";
import { TEMPLATES } from "@/lib/templates";
import { SITE, STATS } from "@/lib/site";
import HeroInteractive from "@/components/HeroInteractive";
import TemplateMarquee from "@/components/TemplateMarquee";
import MiniReceipt from "@/components/MiniReceipt";

export const metadata: Metadata = {
  title: "Free Receipt Maker — Create Realistic Receipts Online in Seconds",
  description: SITE.description,
  alternates: { canonical: "/" },
};

/* ── tiny inline icon set (no dependencies) ── */
function Icon({ path, className = "" }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
const ICONS = {
  bolt: "M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z",
  receipt:
    "M6 2h12v20l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 22zM9 8h6M9 12h6M9 16h3",
  calc: "M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h4M8 18h.01M12 18h.01",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  image: "M3 3h18v18H3zM3 15l5-5 4 4 3-3 6 6M8.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  download: "M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  lock: "M6 10V8a6 6 0 0 1 12 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z",
  check: "M20 6 9 17l-5-5",
  cursor: "M4 4l7 16 2.5-6.5L20 11z",
  layers: "M12 2 2 7l10 5 10-5zM2 12l10 5 10-5M2 17l10 5 10-5",
  shield: "M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z",
} as const;

const FEATURES = [
  {
    icon: ICONS.receipt,
    t: "Looks genuinely real",
    d: "True thermal output at 58mm, 80mm, 110mm and A4 — correct column widths, torn edges and monospace print. Not a word-processor table pretending to be a receipt.",
  },
  {
    icon: ICONS.calc,
    t: "The maths always adds up",
    d: "Subtotal, discount, tax and tip calculate in the right order and update live as you type. Reviewers check the arithmetic — yours will pass.",
  },
  {
    icon: ICONS.globe,
    t: "14 currencies, any tax",
    d: "Dollar, euro, pound, rupee, peso, naira and more — with tax labelled as sales tax, VAT, GST or HST to match your country.",
  },
  {
    icon: ICONS.image,
    t: "Your own logo",
    d: "Upload your business logo and it prints crisply in the header. Your branding, on your receipts.",
  },
  {
    icon: ICONS.download,
    t: "PNG, PDF & JPEG",
    d: "Export at 3× resolution for a razor-sharp print, straight to PDF sized to the paper you picked, or as a JPEG for quick sharing.",
  },
  {
    icon: ICONS.lock,
    t: "Private by design",
    d: "Everything runs in your browser. No account, no card, and nothing you type is ever sent to our servers.",
  },
];

const STEPS = [
  {
    icon: ICONS.layers,
    t: "Pick a template",
    d: "Choose from 24 ready-made receipt formats — restaurant, grocery, retail, rent, fuel and more. Each opens pre-filled and realistic.",
  },
  {
    icon: ICONS.cursor,
    t: "Customize your details",
    d: "Edit your business info, line items, tax and totals. Everything updates live in the preview beside you as you type.",
  },
  {
    icon: ICONS.download,
    t: "Download in seconds",
    d: "Export a print-ready PNG, PDF or JPEG in a single click. No signup, no watermark you can't remove, no waiting.",
  },
];

const WHY = [
  "100% free — unlimited receipts, no trial, no card",
  "No signup or email required to download",
  "24 realistic templates across every trade",
  "Live preview — what you see is what you export",
  "PNG, PDF and JPEG at print resolution",
  "Works on phone, tablet and desktop",
  "14 currencies with correct digit grouping",
  "Runs entirely in your browser — fully private",
];

const FAQS = [
  {
    q: "Is the receipt maker really free?",
    a: "Yes. You can build a receipt and download it as a PNG, PDF or JPEG without creating an account or entering payment details. There is no cap on how many you make.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. The receipt maker runs in your browser and works immediately. An account is only needed if you later want to save businesses and receipt history.",
  },
  {
    q: "How long does it take to make a receipt?",
    a: "Under 60 seconds. Pick a template, edit the details you need, and download. Most people finish in well under a minute.",
  },
  {
    q: "What is this tool for?",
    a: "Recording your own sales — particularly cash transactions where no card statement exists — reissuing a record of a transaction that took place, and producing template or test documents. It is not for deceiving anyone.",
  },
  {
    q: "What paper sizes and formats are supported?",
    a: "58mm and 80mm thermal (the two standard till-roll widths), 110mm wide thermal, and A4 or Letter for documents that get emailed or filed. Export as PNG, PDF or JPEG.",
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
    q: "Is my data stored on your servers?",
    a: "No. The receipt maker runs entirely in your browser and the receipt is rendered and exported on your device. Nothing you type is sent to us.",
  },
];

export default function Home() {
  const featured = TEMPLATES.slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}#org` },
      },
      {
        "@type": "SoftwareApplication",
        name: `${SITE.name} — Free Receipt Maker`,
        url: SITE.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: SITE.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "HowTo",
        name: "How to make a receipt online",
        description:
          "Create a realistic, itemised receipt for free in three steps with the BuildMyReceipt receipt maker.",
        totalTime: "PT1M",
        step: STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.t,
          text: s.d,
        })),
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

      {/* ══════════════════ hero ══════════════════ */}
      <section className="hero-mesh relative overflow-hidden border-b border-[var(--line)]">
        <div className="dot-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-12 py-14 lg:grid-cols-[1fr_1.04fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-3.5 py-1.5 shadow-[var(--shadow-1)]">
              <span className="text-[13px] text-[var(--amber)]" aria-hidden="true">
                ★★★★★
              </span>
              <span className="text-[12.5px] font-medium text-ink-300">
                The #1 receipt maker — trusted by thousands worldwide
              </span>
            </div>

            <h1 className="text-balance font-display text-[clamp(2.6rem,6vw,4.3rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-ink-50">
              Free receipt maker,{" "}
              <span className="text-[var(--accent-600)]">start in seconds</span>
            </h1>

            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-300 text-pretty">
              Pick a template, customize your items and details, and download a realistic
              receipt in under 60 seconds. Export as PNG, PDF or JPEG. No signup required —
              start building in seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/generator" className="btn btn-primary btn-lg">
                Make a receipt — free →
              </Link>
              <Link href="/templates" className="btn btn-ghost btn-lg">
                Browse {TEMPLATES.length} templates
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] font-medium text-ink-400">
              {["Ready in 60 seconds", "PNG · PDF · JPEG", "No signup", "No watermark"].map(
                (x) => (
                  <li key={x} className="inline-flex items-center gap-2">
                    <span
                      className="grid h-[18px] w-[18px] place-items-center rounded-full text-[var(--on-accent)]"
                      style={{ background: "var(--grad-warm)" }}
                    >
                      <Icon path={ICONS.check} className="h-2.5 w-2.5" />
                    </span>
                    {x}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="relative">
            <HeroInteractive />
          </div>
        </div>
      </section>

      {/* ══════════════════ stats band ══════════════════ */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="container-x grid grid-cols-2 gap-y-7 py-9 sm:grid-cols-3 lg:grid-cols-5">
          {[
            [STATS.receipts, "Receipts created"],
            [STATS.templates, "Ready templates"],
            [STATS.currencies, "Currencies"],
            [STATS.countries, "Countries served"],
            [`${STATS.rating}★`, "Average rating"],
          ].map(([num, label], i) => (
            <div
              key={label}
              className={`px-3 text-center lg:border-l lg:border-[var(--line)] lg:first:border-l-0 ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-ink-50">
                {num}
              </div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ how it works ══════════════════ */}
      <section className="container-x py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">
            <Icon path={ICONS.bolt} className="h-3.5 w-3.5" /> How it works
          </p>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink-50">
            Make a receipt in three quick steps
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-400">
            No learning curve, no software to install. Open the receipt maker and you are
            downloading a finished receipt about thirty seconds later.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="panel card-hover relative p-7">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-[var(--accent-600)]"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <Icon path={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[var(--line-2)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[18px] font-bold tracking-[-0.015em] text-ink-50">
                {s.t}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-400">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link href="/generator" className="btn btn-primary btn-lg">
            Start building now →
          </Link>
        </div>
      </section>

      {/* ══════════════════ template marquee ══════════════════ */}
      <section className="overflow-hidden border-y border-[var(--line)] bg-[var(--paper-2)] py-16">
        <div className="container-x mb-9 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">
              <Icon path={ICONS.layers} className="h-3.5 w-3.5" /> The library
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-50">
              {TEMPLATES.length} ready-made templates, one click away
            </h2>
          </div>
          <Link href="/templates" className="btn btn-ghost">
            See all templates →
          </Link>
        </div>
        <TemplateMarquee />
      </section>

      {/* ══════════════════ features ══════════════════ */}
      <section className="container-x py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">
            <Icon path={ICONS.check} className="h-3.5 w-3.5" /> What you get
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-50">
            Everything you need for a receipt that looks the part
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="panel card-hover p-6">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-[var(--accent-600)]"
                style={{ background: "var(--accent-soft)" }}
              >
                <Icon path={f.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-[16px] font-bold tracking-[-0.01em] text-ink-50">
                {f.t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ featured templates — receipt previews ══════════════════ */}
      <section className="container-x pb-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">
              <Icon path={ICONS.receipt} className="h-3.5 w-3.5" /> Templates
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-50">
              See the actual receipt before you start
            </h2>
            <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-ink-400">
              Every template is a real, branded receipt — logo, itemised lines, tax and totals
              already laid out. Tap one to open it in the editor.
            </p>
          </div>
          <Link href="/templates" className="btn btn-ghost">
            All {TEMPLATES.length} templates →
          </Link>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-4">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-2)] px-4 pb-5 pt-8 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-2)] hover:shadow-[var(--shadow-2)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 100% at 50% 0%, rgba(246,81,29,.1), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative flex flex-1 justify-center">
                <div className="transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
                  <MiniReceipt template={t} />
                </div>
              </div>
              <div className="relative mt-6 text-center">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--accent-600)]">
                  {t.category}
                </p>
                <h3 className="mt-1 font-display text-[15px] font-bold tracking-[-0.01em] text-ink-50 transition-colors group-hover:text-[var(--accent-600)]">
                  {t.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════ why choose us ══════════════════ */}
      <section className="border-y border-[var(--line)] bg-[var(--paper-2)]">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">
              <Icon path={ICONS.shield} className="h-3.5 w-3.5" /> Why BuildMyReceipt
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-50">
              The receipt maker people actually keep coming back to
            </h2>
            <p className="mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-ink-400">
              Most receipt tools hide the good part behind a signup, slap on a watermark you
              can&apos;t remove, or produce something that looks like a spreadsheet. This one
              doesn&apos;t. It&apos;s free, it&apos;s fast, and the output looks real.
            </p>
            <Link href="/generator" className="btn btn-primary btn-lg mt-8">
              Try it free →
            </Link>
          </div>

          <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {WHY.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-[14px] text-ink-200">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[var(--on-accent)]"
                  style={{ background: "var(--grad-warm)" }}
                >
                  <Icon path={ICONS.check} className="h-3 w-3" />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════════════ faq ══════════════════ */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-50">
              Questions people actually ask
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-400">
              Still unsure about something? The receipt maker is free to try — the fastest
              answer is usually to{" "}
              <Link href="/generator" className="link">
                open it and see
              </Link>
              .
            </p>
          </div>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-ink-100 transition-colors hover:text-ink-50">
                  {f.q}
                  <span
                    className="shrink-0 font-mono text-lg text-[var(--accent-600)] transition-transform group-open:rotate-45"
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

      {/* ══════════════════ cta ══════════════════ */}
      <section className="container-x pb-8">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
          style={{ background: "var(--grad-warm)" }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-2xl"
            style={{ background: "#ffd9b0" }}
            aria-hidden="true"
          />
          <h2 className="relative font-display text-[clamp(1.8rem,3.8vw,2.6rem)] font-extrabold tracking-[-0.03em] text-white">
            Make your first receipt now
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-white/90">
            Free, no account, no card, and no watermark you can&apos;t remove. Open the receipt
            maker and it just works.
          </p>
          <Link
            href="/generator"
            className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-bold text-[var(--accent-600)] shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Open the receipt maker →
          </Link>
        </div>
      </section>

      {/* ══════════════════ seo copy ══════════════════ */}
      <section className="container-x pb-20">
        <div className="max-w-[72ch] space-y-8 border-t border-[var(--line)] pt-14">
          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink-50">
              Free online receipt maker
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-400">
              BuildMyReceipt is a free{" "}
              <Link href="/generator" className="link">
                receipt maker
              </Link>{" "}
              for creating clean, itemised business receipts online. Pick a format, enter your
              business details and what was sold, and download a print-ready PNG, PDF or JPEG.
              It works on any device, needs no account, and runs entirely in your browser — the
              details you type never reach our servers. Whether you call it a receipt maker, a
              receipt generator or a receipt template builder, this is the fastest way to
              produce a realistic receipt online.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink-50">
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
              . Each one loads a working receipt maker preset with the fields that format needs.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink-50">
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
