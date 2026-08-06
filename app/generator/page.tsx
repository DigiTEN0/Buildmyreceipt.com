import type { Metadata } from "next";
import Generator from "@/components/Generator";

export const metadata: Metadata = {
  title: "Free Receipt Maker — Build a Receipt Online in Seconds",
  description:
    "Free online receipt maker. Enter your business details and line items, pick a paper size, and download a print-ready PNG, PDF or JPEG. No signup, no watermark.",
  alternates: { canonical: "/generator" },
};

export default function GeneratorPage() {
  return (
    <>
      <div className="no-print hero-mesh border-b border-[var(--line)]">
        <div className="container-x py-8">
          <p className="eyebrow mb-2.5">Receipt maker</p>
          <h1 className="font-display text-[clamp(1.7rem,3.4vw,2.2rem)] font-extrabold tracking-[-0.03em] text-ink-50">
            Build your receipt
          </h1>
          <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-ink-400">
            Everything updates live. Nothing is sent to a server — the receipt is rendered
            and exported on your device as a PNG, PDF or JPEG.
          </p>
        </div>
      </div>
      <Generator />
    </>
  );
}
