"use client";

import { useState } from "react";
import { LOGO_URL } from "@/lib/site";

/**
 * Brand logo. Renders the hosted image; if it fails to load (offline preview,
 * blocked host, etc.) it falls back to a clean typographic wordmark so a broken
 * image is never shown.
 */
export default function SiteLogo({
  height = 28,
  dark = false,
}: {
  height?: number;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-display font-extrabold tracking-[-0.03em] ${
          dark ? "text-white" : "text-ink-50"
        }`}
        style={{ fontSize: Math.round(height * 0.62) }}
      >
        BuildMyReceipt
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={LOGO_URL}
      alt="BuildMyReceipt"
      style={{ height }}
      className="w-auto"
      onError={() => setFailed(true)}
    />
  );
}
