import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[58vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">404</p>
      <h1 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink-50">
        No receipt for that one
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-400">
        The page you asked for does not exist. It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/generator" className="btn btn-primary">
          Open the generator
        </Link>
        <Link href="/templates" className="btn btn-ghost">
          Browse templates
        </Link>
      </div>
    </div>
  );
}
