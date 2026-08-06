import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BuildMyReceipt — Free Receipt Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="34" viewBox="0 0 20 22">
              <path d="M3 1.6H17V19.2L14.67 20.8 12.33 19.2 10 20.8 7.67 19.2 5.33 20.8 3 19.2Z" fill="#fff" />
              <rect x="6" y="5" width="8" height="2.2" rx="1.1" fill="#2563eb" />
              <rect x="6" y="9.4" width="8" height="1.6" rx=".8" fill="#c7d2fe" />
              <rect x="6" y="12.6" width="5" height="1.6" rx=".8" fill="#c7d2fe" />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
            BuildMyReceipt
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.03,
              color: "#111111",
            }}
          >
            The better way to make a receipt
          </div>
          <div style={{ fontSize: 30, color: "#4b5563", maxWidth: 920, lineHeight: 1.35 }}>
            Pick a template, customize, and download a realistic receipt in under 60 seconds —
            PNG, PDF or JPEG. No signup.
          </div>
        </div>

        {/* footer badges */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {["Free forever", "No signup", "PNG · PDF · JPEG", "24 templates"].map((b) => (
            <div
              key={b}
              style={{
                fontSize: 23,
                fontWeight: 600,
                color: "#111111",
                background: "#f5f5f5",
                border: "1px solid #e5e7eb",
                padding: "10px 22px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
