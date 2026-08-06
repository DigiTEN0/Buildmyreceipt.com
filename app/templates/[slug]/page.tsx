import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { SITE } from "@/lib/site";
import Generator from "@/components/Generator";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tpl = getTemplate(slug);
  if (!tpl) return {};
  return {
    title: `${tpl.h1} — Free ${tpl.name} Template`,
    description: tpl.intent,
    alternates: { canonical: `/templates/${tpl.slug}` },
    openGraph: {
      title: `${tpl.h1} — Free & Online`,
      description: tpl.intent,
      url: `${SITE.url}/templates/${tpl.slug}`,
    },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tpl = getTemplate(slug);
  if (!tpl) notFound();

  const related = tpl.related
    .map((s) => getTemplate(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Templates", item: `${SITE.url}/templates` },
          {
            "@type": "ListItem",
            position: 3,
            name: tpl.name,
            item: `${SITE.url}/templates/${tpl.slug}`,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: tpl.h1,
        url: `${SITE.url}/templates/${tpl.slug}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: tpl.intent,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: tpl.faqs.map((f) => ({
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

      {/* header */}
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
                <Link href="/templates" className="transition-colors hover:text-ink-200">
                  Templates
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-300">{tpl.name}</li>
            </ol>
          </nav>

          <h1 className="max-w-4xl font-display text-[clamp(1.9rem,4.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {tpl.h1}
          </h1>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-ink-300">
            {tpl.intent} Free, no signup, and the generator below is already loaded with this
            format.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {tpl.fields.map((f) => (
              <li
                key={f}
                className="rounded-full border border-[var(--line-2)] bg-[var(--surface)] px-3 py-1 text-[12px] text-ink-300"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the working tool — this is the page's primary content */}
      <Generator templateSlug={tpl.slug} />

      {/* long-form, type-specific content */}
      <div className="container-x pt-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,70ch)_1fr] lg:gap-20">
          <article className="space-y-10">
            {tpl.sections.map((s) => (
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
                {tpl.name} FAQ
              </h2>
              <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {tpl.faqs.map((f) => (
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
              <h2 className="eyebrow mb-4">Related templates</h2>
              <ul className="space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/templates/${r.slug}`}
                      className="group flex items-baseline justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[var(--bg-2)]"
                    >
                      <span className="text-[13.5px] text-ink-200 transition-colors group-hover:text-[var(--accent)]">
                        {r.name}
                      </span>
                      <span
                        className="font-mono text-[11px] text-ink-600"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/templates"
                className="mt-4 block border-t border-[var(--line)] pt-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors hover:text-ink-200"
              >
                All {TEMPLATES.length} templates →
              </Link>
            </div>

            <div className="panel p-5">
              <h2 className="eyebrow mb-3">Before you download</h2>
              <p className="text-[13px] leading-relaxed text-ink-400">
                Receipts from this tool are for recording your own transactions, reissuing a
                record of a sale that took place, or template and testing use. They must not
                be used to deceive anyone or to support a false claim.
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
