import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES, CATEGORIES, templatesByCategory } from "@/lib/templates";
import { SITE } from "@/lib/site";
import MiniReceipt from "@/components/MiniReceipt";

export const metadata: Metadata = {
  title: `${TEMPLATES.length} Free Receipt Templates — Receipt Maker Presets`,
  description: `Browse ${TEMPLATES.length} free receipt templates: restaurant, grocery, retail, fuel, taxi, hotel, rent, donation, medical, trade and more. Each opens the receipt maker preloaded and ready to download as PNG, PDF or JPEG.`,
  alternates: { canonical: "/templates" },
};

export default function TemplatesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Receipt Templates",
    url: `${SITE.url}/templates`,
    hasPart: TEMPLATES.map((t) => ({
      "@type": "WebPage",
      name: t.name,
      url: `${SITE.url}/templates/${t.slug}`,
      description: t.blurb,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-mesh border-b border-[var(--line)]">
        <div className="container-x py-14">
          <p className="eyebrow mb-3">Templates</p>
          <h1 className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink-50">
            {TEMPLATES.length} free receipt templates, each with a working preset
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-300">
            Every template opens the receipt maker preloaded with the fields that format needs
            — the right paper width, the right tax label, realistic line items. Change what you
            need and download as PNG, PDF or JPEG.
          </p>
        </div>
      </div>

      <div className="container-x py-14">
        <nav aria-label="Categories" className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-300 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {c}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {CATEGORIES.map((cat) => (
            <section key={cat} id={cat.toLowerCase().replace(/[^a-z]+/g, "-")}>
              <div className="mb-6 flex items-baseline gap-4">
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  {cat}
                </h2>
                <span className="h-px flex-1 bg-[var(--line)]" aria-hidden="true" />
                <span className="font-mono text-[11px] tabular-nums text-ink-500">
                  {templatesByCategory(cat).length}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templatesByCategory(cat).map((t) => (
                  <Link
                    key={t.slug}
                    href={`/templates/${t.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-1)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-2)] hover:shadow-[var(--shadow-2)]"
                  >
                    <div className="relative flex justify-center overflow-hidden border-b border-[var(--line)] bg-[var(--paper-2)] px-4 pb-6 pt-8">
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-70"
                        style={{
                          background:
                            "radial-gradient(60% 100% at 50% 0%, rgba(246,81,29,.09), transparent 70%)",
                        }}
                        aria-hidden="true"
                      />
                      <div className="relative transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
                        <MiniReceipt template={t} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[15.5px] font-bold tracking-[-0.012em] transition-colors group-hover:text-[var(--accent-600)]">
                        {t.name}
                      </h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-400">
                        {t.blurb}
                      </p>
                      <span className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors group-hover:text-ink-300">
                        Open template →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
