"use client";

import { useEffect, useState } from "react";
import Receipt from "./Receipt";
import { fromTemplate, hydrateVolatile } from "@/lib/receipt";
import { getTemplate } from "@/lib/templates";
import type { ReceiptData } from "@/lib/types";

/**
 * Hero visual. Rendered client-side so the date/time and transaction ref are
 * live rather than baked into the static HTML.
 */
export default function HeroReceipt() {
  const [data, setData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const tpl = getTemplate("grocery-receipt");
    if (tpl) setData(hydrateVolatile(fromTemplate(tpl)));
  }, []);

  return (
    <div className="relative">
      {/* glow */}
      <div
        className="pointer-events-none absolute -inset-16 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(200,242,77,.16), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative max-h-[560px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg,#000 76%,transparent 99%)",
          WebkitMaskImage: "linear-gradient(180deg,#000 76%,transparent 99%)",
        }}
      >
        <div
          className="animate-print"
          style={{ transform: "rotate(-1.4deg)", transformOrigin: "top center" }}
        >
          {data ? (
            <Receipt data={data} />
          ) : (
            <div
              className="mx-auto rounded-sm bg-white/[.06]"
              style={{ width: 340, height: 520 }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
