import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SITE, NAV } from "@/lib/site";
import SiteLogo from "@/components/SiteLogo";

const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(255,255,255,.82)] backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={SITE.name}>
          <SiteLogo height={28} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-ink-300 transition-colors hover:text-ink-50"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/generator"
            className="hidden text-[14px] font-medium text-ink-300 transition-colors hover:text-ink-50 sm:block"
          >
            Sign in
          </Link>
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
    <footer className="no-print mt-24 bg-[var(--surface-dark)] text-[#a1a1aa]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(2,1fr)] lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div>
            <SiteLogo height={26} dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#a1a1aa]">
              The free receipt maker for business record-keeping. Pick a template, customize
              it, and download a realistic receipt in seconds — PNG, PDF or JPEG, no signup.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#71717a]">
                {c.title}
              </h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-3 border-t border-white/10 pt-8 text-xs leading-relaxed text-[#71717a]">
          <p>
            <strong className="text-[#a1a1aa]">Disclaimer:</strong> All templates contain
            fictional example content for illustration only. Business names, addresses and
            transaction details shown in previews do not represent real businesses,
            transactions or individuals.
          </p>
          <p>
            <strong className="text-[#a1a1aa]">Intended use:</strong> Receipts generated with
            this tool are for legitimate business documentation — recording your own sales,
            reissuing records for transactions that occurred, and template or testing
            purposes. They must not be used for fraud, forgery, false claims or
            misrepresentation. See our{" "}
            <Link href="/legal/acceptable-use" className="text-[#a1a1aa] underline underline-offset-2 hover:text-white">
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
