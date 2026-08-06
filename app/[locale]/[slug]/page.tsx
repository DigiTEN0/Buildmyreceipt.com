import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, getLocale, getLocaleTemplate, alternatesFor } from "@/lib/locales";
import { getTemplate } from "@/lib/templates";
import { SITE } from "@/lib/site";
import Generator from "@/components/Generator";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((l) => l.templates.map((t) => ({ locale: l.path, slug: t.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = getLocale(locale);
  const t = getLocaleTemplate(locale, slug);
  if (!l || !t) return {};

  // Only cross-link locales that publish an equivalent document.
  const langs: Record<string, string> = {};
  if (t.equivalent) {
    for (const a of alternatesFor(t.equivalent)) langs[a.hreflang] = a.href;
    langs["x-default"] = `/templates/${t.equivalent}`;
  }

  return {
    title: `${t.h1} — Free`,
    description: t.intent,
    alternates: {
      canonical: `/${l.path}/${t.slug}`,
      ...(Object.keys(langs).length ? { languages: langs } : {}),
    },
    openGraph: {
      title: `${t.h1} — Free & Online`,
      description: t.intent,
      url: `${SITE.url}/${l.path}/${t.slug}`,
    },
  };
}

export default async function LocaleTemplatePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = getLocale(locale);
  const t = getLocaleTemplate(locale, slug);
  if (!l || !t) notFound();

  const global = t.equivalent ? getTemplate(t.equivalent) : undefined;
  const siblings = l.templates.filter((x) => x.slug !== t.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: l.country, item: `${SITE.url}/${l.path}` },
          {
            "@type": "ListItem",
            position: 3,
            name: t.name,
            item: `${SITE.url}/${l.path}/${t.slug}`,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: t.h1,
        url: `${SITE.url}/${l.path}/${t.slug}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: t.intent,
        offers: { "@type": "Offer", price: "0", priceCurrency: l.currency },
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map((f) => ({
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

      <div className="no-print border-b border-[var(--line)]">
        <div className="container-x py-10">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.11em] text-ink-500">
              <li>
                <Link href="/" className="transition-colors hover:text-ink-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${l.path}`} className="transition-colors hover:text-ink-200">
                  {l.country}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-300">{t.name}</li>
            </ol>
          </nav>

          <h1 className="max-w-4xl font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-ink-300">
            {t.intent} Free, no signup, and the generator below is preloaded in{" "}
            {l.currency}.
          </p>
        </div>
      </div>

      <Generator seed={t.seed} seedKey={`${l.path}-${t.slug}`} />

      <div className="container-x pt-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,70ch)_1fr] lg:gap-20">
          <article className="space-y-10">
            {t.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.022em]">
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3.5 text-[15px] leading-[1.72] text-ink-300">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <section>
              <h2 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.022em]">
                {t.name} FAQ — {l.country}
              </h2>
              <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {t.faqs.map((f) => (
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
                    <p className="pb-5 pr-8 text-[14px] leading-relaxed text-ink-400">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-[4.5rem] lg:self-start">
            <div className="panel p-5">
              <h2 className="eyebrow mb-4">More for {l.country}</h2>
              <ul className="space-y-1">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${l.path}/${s.slug}`}
                      className="group flex items-baseline justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[var(--bg-2)]"
                    >
                      <span className="text-[13.5px] text-ink-200 transition-colors group-hover:text-[var(--accent)]">
                        {s.name}
                      </span>
                      <span className="font-mono text-[11px] text-ink-600" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${l.path}`}
                className="mt-4 block border-t border-[var(--line)] pt-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors hover:text-ink-200"
              >
                All {l.country} formats →
              </Link>
            </div>

            {global && (
              <div className="panel p-5">
                <h2 className="eyebrow mb-3">Standard version</h2>
                <p className="text-[13px] leading-relaxed text-ink-400">
                  Not in {l.country}? The general {global.name.toLowerCase()} template lets you
                  set any currency and tax label.
                </p>
                <Link
                  href={`/templates/${global.slug}`}
                  className="mt-3 inline-block font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors hover:text-ink-200"
                >
                  {global.name} →
                </Link>
              </div>
            )}

            <div className="panel p-5">
              <h2 className="eyebrow mb-3">Before you download</h2>
              <p className="text-[13px] leading-relaxed text-ink-400">
                Receipts from this tool are for recording your own transactions, reissuing a
                record of a sale that took place, or template and testing use.
              </p>
              <Link
                href="/legal/acceptable-use"
                className="mt-3 inline-block font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors hover:text-ink-200"
              >
                Acceptable Use Policy →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
