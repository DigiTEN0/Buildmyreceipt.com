import Link from "next/link";

export interface LegalBlock {
  heading: string;
  body: string[];
  list?: string[];
}

export default function LegalPage({
  title,
  updated,
  intro,
  blocks,
}: {
  title: string;
  updated: string;
  intro: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <div className="border-b border-[var(--line)]">
        <div className="container-x py-12">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.11em] text-ink-500">
              <li>
                <Link href="/" className="transition-colors hover:text-ink-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-300">Legal</li>
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(1.9rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.033em] text-ink-50">
            {title}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.13em] text-ink-500">
            Last updated {updated}
          </p>
        </div>
      </div>

      <div className="container-x py-14">
        <div className="max-w-[72ch]">
          <p className="text-[16px] leading-[1.72] text-ink-200">{intro}</p>

          <div className="mt-12 space-y-10">
            {blocks.map((b, i) => (
              <section key={b.heading}>
                <h2 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.02em]">
                  <span className="mr-2.5 font-mono text-[13px] tabular-nums text-ink-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {b.heading}
                </h2>
                {b.body.map((p, j) => (
                  <p key={j} className="mt-3.5 text-[14.5px] leading-[1.75] text-ink-300">
                    {p}
                  </p>
                ))}
                {b.list && (
                  <ul className="mt-4 space-y-2 border-l-2 border-[var(--line-2)] pl-5">
                    {b.list.map((li, k) => (
                      <li key={k} className="text-[14.5px] leading-[1.7] text-ink-300">
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-[var(--line)] pt-8">
            <p className="text-[13px] leading-relaxed text-ink-500">
              This page is general information and is not legal advice. If you need advice on
              how these terms apply to your situation, speak to a qualified professional in
              your jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
