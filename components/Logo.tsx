/**
 * BuildMyReceipt logo — faithful SVG recreation of the supplied mark:
 * a receipt/document with a torn (zigzag) base and three text lines,
 * overlaid by a bold blue check, next to the "BuildMyReceipt" wordmark.
 *
 * Colours are fixed to the brand (navy + blue) so the mark reads correctly
 * on any surface. Pass `wordmark={false}` for the icon alone.
 */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="BuildMyReceipt"
    >
      {/* receipt body with torn bottom edge */}
      <path
        d="M9 6.5h26a2 2 0 0 1 2 2v30.5l-3.4-2.4-3.5 2.4-3.5-2.4-3.5 2.4-3.5-2.4-3.5 2.4L9 39V8.5a2 2 0 0 1 2-2Z"
        stroke="#16202e"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* text lines */}
      <path
        d="M14.5 14.5h12M14.5 20h9"
        stroke="#16202e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* blue check */}
      <path
        d="M12.5 27.5l6 6L34 15.5"
        stroke="#1f8ff2"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({
  size = 30,
  wordmark = true,
}: {
  size?: number;
  wordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {wordmark && (
        <span
          className="font-display font-bold tracking-[-0.02em]"
          style={{ fontSize: size * 0.62, color: "var(--navy)" }}
        >
          BuildMyReceipt
        </span>
      )}
    </span>
  );
}
