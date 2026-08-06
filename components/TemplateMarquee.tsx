import Link from "next/link";
import MiniReceipt from "./MiniReceipt";
import { TEMPLATES } from "@/lib/templates";
import type { TemplateDef } from "@/lib/types";

function Row({
  items,
  direction,
}: {
  items: TemplateDef[];
  direction: "l" | "r";
}) {
  // Duplicate the list so the -50% translate loop is seamless.
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask flex overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 pr-4 ${
          direction === "l" ? "animate-marquee-l" : "animate-marquee-r"
        }`}
      >
        {doubled.map((t, i) => (
          <Link
            key={`${t.slug}-${i}`}
            href={`/templates/${t.slug}`}
            className="group block transition-transform duration-200 hover:-translate-y-1.5"
            tabIndex={-1}
            aria-hidden="true"
          >
            <MiniReceipt template={t} />
            <p className="mt-2.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink-500 transition-colors group-hover:text-[var(--accent-600)]">
              {t.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function TemplateMarquee() {
  const half = Math.ceil(TEMPLATES.length / 2);
  const top = TEMPLATES.slice(0, half);
  const bottom = TEMPLATES.slice(half);

  return (
    <div className="space-y-2">
      <Row items={top} direction="l" />
      <Row items={bottom} direction="r" />
    </div>
  );
}
