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
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              position: "relative",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg,#ff7a3d,#f6511d 60%,#e23c0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="44" viewBox="0 0 20 22">
              <path
                d="M3 1.6H17V19.2L14.67 20.8 12.33 19.2 10 20.8 7.67 19.2 5.33 20.8 3 19.2Z"
                fill="#fff"
              />
              <rect x="6" y="5" width="8" height="2.3" rx="1.15" fill="#f6511d" />
              <rect x="6" y="9.4" width="8" height="1.5" rx=".75" fill="#ffb59e" />
              <rect x="6" y="12.4" width="5" height="1.5" rx=".75" fill="#ffb59e" />
            </svg>
            <div
              style={{
                position: "absolute",
                right: -7,
                bottom: -7,
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,.22)",
              }}
            >
              <svg width="17" viewBox="0 0 24 24" fill="none" stroke="#dc3f0c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#141210" }}>BuildMyReceipt</div>
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
