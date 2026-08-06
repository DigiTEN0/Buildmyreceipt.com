import type { Metadata } from "next";
import Generator from "@/components/Generator";

export const metadata: Metadata = {
  title: "Receipt Generator — Build a Receipt Online Free",
  description:
    "Free online receipt generator. Enter your business details and line items, pick a paper size, and download a print-ready PNG or PDF. No signup.",
  alternates: { canonical: "/generator" },
};

export default function GeneratorPage() {
  return (
    <>
      <div className="no-print border-b border-[var(--line)]">
        <div className="container-x py-7">
          <p className="eyebrow mb-2.5">Generator</p>
          <h1 className="font-display text-[clamp(1.6rem,3.4vw,2.1rem)] font-semibold tracking-[-0.03em]">
            Build your receipt
          </h1>
          <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-ink-400">
            Everything updates live. Nothing is sent to a server — the receipt is rendered
            and exported on your device.
          </p>
        </div>
      </div>
      <Generator />
    </>
  );
}
