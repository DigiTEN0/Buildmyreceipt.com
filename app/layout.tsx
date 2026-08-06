import type { Metadata } from "next";
import { Instrument_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SITE, NAV, STATS } from "@/lib/site";

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free Receipt Maker — Create Realistic Receipts Online in Seconds | BuildMyReceipt",
    template: "%s | BuildMyReceipt",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "receipt maker",
    "free receipt maker",
    "receipt generator",
    "free receipt generator",
    "online receipt maker",
    "make a receipt",
    "create a receipt",
    "receipt template",
    "itemized receipt",
    "receipt maker online",
    "fake receipt maker",
    "printable receipt",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "business",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Free Receipt Maker — Create Realistic Receipts Online in Seconds",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Receipt Maker — Create Realistic Receipts in Seconds",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: "var(--grad-warm)",
        boxShadow:
          "0 5px 14px -4px rgba(246,81,29,.55), inset 0 1px 0 rgba(255,255,255,.32)",
      }}
      aria-hidden="true"
    >
      <svg width={size * 0.52} viewBox="0 0 20 22" fill="none">
        <path
          d="M3 1.6H17V19.2L14.67 20.8 12.33 19.2 10 20.8 7.67 19.2 5.33 20.8 3 19.2Z"
          fill="#fff"
        />
        <rect x="6" y="5" width="8" height="2.3" rx="1.15" fill="#f6511d" />
        <rect x="6" y="9.4" width="8" height="1.5" rx=".75" fill="#ffb59e" />
        <rect x="6" y="12.4" width="5" height="1.5" rx=".75" fill="#ffb59e" />
      </svg>
      {/* verified badge */}
      <span
        className="absolute grid place-items-center rounded-full bg-white"
        style={{
          width: size * 0.42,
          height: size * 0.42,
          right: -size * 0.1,
          bottom: -size * 0.1,
          boxShadow: "0 2px 5px rgba(60,30,10,.25)",
        }}
      >
        <svg
          width={size * 0.24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent-600)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    </span>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={34} />
      <span className="font-display text-[17px] font-extrabold leading-none tracking-[-0.03em] text-ink-50">
        BuildMy<span className="gradient-text">Receipt</span>
      </span>
    </span>
  );
}

function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,248,244,.82)] backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={SITE.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-ink-300 transition-colors hover:bg-[var(--bg-2)] hover:text-ink-50"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden items-center gap-1.5 text-[13px] font-medium text-ink-300 lg:flex"
            title={`Rated ${STATS.rating} out of 5`}
          >
            <span className="text-[var(--amber)]" aria-hidden="true">
              ★★★★★
            </span>
            <span className="text-ink-400">{STATS.rating}</span>
          </span>
          <Link href="/generator" className="btn btn-primary !py-2.5 !text-[13.5px]">
            Make a receipt
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        { href: "/generator", label: "Receipt maker" },
        { href: "/templates", label: "All templates" },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      title: "Popular",
      links: [
        { href: "/templates/restaurant-receipt", label: "Restaurant receipt" },
        { href: "/templates/grocery-receipt", label: "Grocery receipt" },
        { href: "/templates/rent-receipt", label: "Rent receipt" },
        { href: "/templates/gas-station-receipt", label: "Gas receipt" },
        { href: "/templates/cash-receipt", label: "Cash receipt" },
      ],
    },
    {
      title: "Regions",
      links: [
        { href: "/in", label: "India — HRA & GST" },
        { href: "/uk", label: "United Kingdom — VAT" },
        { href: "/ca", label: "Canada — GST/HST" },
        { href: "/au", label: "Australia — GST" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/legal/terms", label: "Terms of Service" },
        { href: "/legal/acceptable-use", label: "Acceptable Use" },
        { href: "/legal/privacy", label: "Privacy Policy" },
      ],
    },
  ];

  return (
    <footer className="no-print mt-24 border-t border-[var(--line)] bg-[var(--paper-2)]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(2,1fr)] lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              The free receipt maker for business record-keeping. Pick a template, customize
              it, and download a realistic receipt in under 60 seconds — PNG, PDF or JPEG, no
              signup.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[13px] text-ink-400">
              <span className="text-[var(--amber)]" aria-hidden="true">
                ★★★★★
              </span>
              <span>Trusted by thousands worldwide</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                {c.title}
              </h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-400 transition-colors hover:text-ink-50"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-3 border-t border-[var(--line)] pt-8 text-xs leading-relaxed text-ink-500">
          <p>
            <strong className="text-ink-400">Disclaimer:</strong> All templates contain
            fictional example content for illustration only. Business names, addresses and
            transaction details shown in previews do not represent real businesses,
            transactions or individuals.
          </p>
          <p>
            <strong className="text-ink-400">Intended use:</strong> Receipts generated with
            this tool are for legitimate business documentation — recording your own sales,
            reissuing records for transactions that occurred, and template or testing
            purposes. They must not be used for fraud, forgery, false claims or
            misrepresentation. See our{" "}
            <Link href="/legal/acceptable-use" className="link">
              Acceptable Use Policy
            </Link>{" "}
            for details.
          </p>
          <p>
            Content on this site is general information, not legal, tax or accounting
            advice. Consult a qualified professional in your jurisdiction.
          </p>
          <p className="pt-2">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body
        style={
          {
            "--font-sans": `var(--font-inter), ui-sans-serif, system-ui, sans-serif`,
            "--font-mono": `var(--font-jb), ui-monospace, SFMono-Regular, Menlo, monospace`,
            "--font-receipt": `var(--font-jb), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`,
            "--font-display": `var(--font-display), var(--font-inter), sans-serif`,
          } as React.CSSProperties
        }
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
