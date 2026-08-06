import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, getLocale } from "@/lib/locales";
import { TEMPLATES } from "@/lib/templates";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l.path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = getLocale(locale);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: {
      canonical: `/${l.path}`,
      languages: Object.fromEntries([
        ...LOCALES.map((x) => [x.hreflang, `/${x.path}`]),
        ["x-default", "/"],
      ]),
    },
    openGraph: { title: l.title, description: l.description, url: `${SITE.url}/${l.path}` },
  };
}

export default async function LocaleHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = getLocale(locale);
  if (!l) notFound();

  const others = LOCALES.filter((x) => x.path !== l.path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: l.country,
            item: `${SITE.url}/${l.path}`,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: l.title,
        url: `${SITE.url}/${l.path}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: l.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: l.currency },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-[var(--line)]">
        <div className="container-x py-14">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.11em] text-ink-500">
              <li>
                <Link href="/" className="transition-colors hover:text-ink-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-300">{l.country}</li>
            </ol>
          </nav>

          <h1 className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Receipt generator for {l.country}
          </h1>

          <div className="mt-5 max-w-[64ch] space-y-3">
            {l.intro.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-ink-300">
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--line)] pt-7">
            {[
              ["Currency", l.currency],
              ["Tax", l.taxLabel],
              ["Standard rate", l.taxRate ? `${l.taxRate}%` : "—"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500">
                  {k}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold tracking-[-0.02em]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* locale formats */}
      <div className="container-x py-14">
        <p className="eyebrow mb-3">Formats for {l.country}</p>
        <h2 className="max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
          The documents that work differently here
        </h2>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ink-400">
          These are not translations of the standard templates — they are formats with
          requirements specific to {l.country}, preloaded with the right currency, tax
          treatment and fields.
        </p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {l.templates.map((t) => (
            <Link
              key={t.slug}
              href={`/${l.path}/${t.slug}`}
              className="panel group flex flex-col p-5 transition-all duration-150 hover:border-ink-600 hover:bg-[var(--bg-2)]"
            >
              <h3 className="font-display text-[15.5px] font-semibold tracking-[-0.012em] transition-colors group-hover:text-[var(--acid)]">
                {t.name}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-400">{t.blurb}</p>
              <span className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-500 transition-colors group-hover:text-ink-300">
                Open template →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* tax notes */}
      <div className="border-y border-[var(--line)] bg-[var(--bg-2)]">
        <div className="container-x py-14">
          <div className="max-w-[70ch] space-y-10">
            {l.notes.map((n) => (
              <section key={n.heading}>
                <h2 className="font-display text-[21px] font-semibold leading-tight tracking-[-0.022em]">
                  {n.heading}
                </h2>
                {n.body.map((p, i) => (
                  <p key={i} className="mt-3.5 text-[15px] leading-[1.72] text-ink-300">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* cross-links */}
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="eyebrow mb-4">Other regions</h2>
            <ul className="space-y-1">
              {others.map((o) => (
                <li key={o.path}>
                  <Link
                    href={`/${o.path}`}
                    className="group flex items-baseline justify-between gap-3 rounded-lg border border-[var(--line)] px-4 py-3 transition-colors hover:border-ink-600 hover:bg-[var(--panel)]"
                  >
                    <span className="text-[14px] text-ink-200 transition-colors group-hover:text-[var(--acid)]">
                      {o.country}
                    </span>
                    <span className="font-mono text-[11px] text-ink-500">
                      {o.currency} · {o.taxLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-4">Standard templates</h2>
            <p className="mb-4 text-[14px] leading-relaxed text-ink-400">
              The full library works anywhere — set your currency and tax label in the
              generator.
            </p>
            <Link href="/templates" className="btn btn-ghost">
              All {TEMPLATES.length} templates →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
