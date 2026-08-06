import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BuildMyReceipt — Free Receipt Maker, Start in Seconds";
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
          background: "#faf8f4",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "linear-gradient(135deg,#ff7a3d,#f6511d 60%,#e23c0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 32 32">
              <path
                d="M9 5.5h14v21l-2.33-1.6L18.33 26.5 16 24.9l-2.33 1.6L11.33 24.9 9 26.5z"
                fill="#fff"
              />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#141210" }}>BuildMyReceipt</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#141210",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Free Receipt Maker,&nbsp;
            <span
              style={{
                background: "linear-gradient(135deg,#ff7a3d,#e23c0b)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Start in Seconds
            </span>
          </div>
          <div style={{ fontSize: 32, color: "#514b40", maxWidth: 900, lineHeight: 1.35 }}>
            Pick a template, customize, and download a realistic receipt in under 60 seconds —
            PNG, PDF or JPEG. No signup.
          </div>
        </div>

        {/* footer badges */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {["★★★★★ Trusted by thousands", "100% free", "No signup", "PNG · PDF · JPEG"].map(
            (b) => (
              <div
                key={b}
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#dc3f0c",
                  background: "#ffe7dc",
                  border: "1px solid #ffd0be",
                  padding: "10px 22px",
                  borderRadius: 999,
                  display: "flex",
                }}
              >
                {b}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
