import type { Metadata } from "next";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SITE, NAV } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Free Receipt Generator — Create Business Receipts Online | BuildMyReceipt",
    template: "%s | BuildMyReceipt",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "receipt generator",
    "receipt maker",
    "free receipt generator",
    "online receipt maker",
    "make a receipt",
    "itemized receipt",
    "receipt template",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Free Receipt Generator — Create Business Receipts Online",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0c0e13",
  width: "device-width",
  initialScale: 1,
};

function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(12,14,19,.82)] backdrop-blur-xl">
      <div className="container-x flex h-14 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={SITE.name}>
          <span
            className="grid h-7 w-7 place-items-center rounded-md text-[13px] font-bold"
            style={{ background: "var(--acid)", color: "#0c0e13" }}
            aria-hidden="true"
          >
            ▤
          </span>
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">
            BuildMyReceipt
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm text-ink-300 transition-colors hover:bg-[var(--panel)] hover:text-ink-50"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/generator" className="btn btn-primary !py-2 !text-[13px]">
          Create receipt
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        { href: "/generator", label: "Receipt generator" },
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
    <footer className="no-print mt-24 border-t border-[var(--line)]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(2,1fr)] lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-7 w-7 place-items-center rounded-md text-[13px] font-bold"
                style={{ background: "var(--acid)", color: "#0c0e13" }}
                aria-hidden="true"
              >
                ▤
              </span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">
                BuildMyReceipt
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">
              A fast, free receipt generator for business record-keeping. Built for people
              who take cash and need to hand over something that looks right.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="eyebrow mb-3">{c.title}</h3>
              <ul className="space-y-2">
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
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
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
