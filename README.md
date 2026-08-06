# BuildMyReceipt

Free online receipt generator. Next.js 15 App Router, fully static, client-side rendering
and export — no receipt data ever reaches a server.

## Stack

- **Next.js 15** (App Router) — every page statically generated
- **TypeScript**, **Tailwind CSS 3**
- **html-to-image** → PNG at 3× pixel ratio
- **jsPDF** → PDF sized to the selected paper width
- Fonts: Inter (UI), Instrument Sans (display), JetBrains Mono (receipt body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of all routes
npm start
```

## Architecture

```
app/
  page.tsx                  landing page + FAQ/WebApplication schema
  generator/                the standalone tool
  templates/                index, grouped by category
  templates/[slug]/         one static page per template (SSG)
  legal/                    terms, privacy, acceptable use
  pricing/
  sitemap.ts robots.ts      generated from the template registry
components/
  Generator.tsx             editor rail + live preview + export
  Receipt.tsx               pure renderer — takes ReceiptData, draws paper
  HeroReceipt.tsx           landing page visual
  LegalPage.tsx             shared legal document layout
lib/
  templates.ts              the template registry (see below)
  receipt.ts                defaults, totals, paper sizes, hydration
  types.ts  currency.ts  site.ts
```

### The template registry

`lib/templates.ts` is the single source of truth. Each entry simultaneously produces:

1. a preset in the generator's template picker,
2. a statically generated `/templates/[slug]` page with long-form, type-specific copy
   and its own FAQ schema,
3. a sitemap entry.

Adding a template means adding one object. Nothing else needs touching.

**Two rules when adding entries:**

- Business names, addresses and details in `seed` must be **fictional**.
- Never add real third-party brand names, logos or marks.

### Hydration

`defaultReceipt()` and `fromTemplate()` are deterministic — no `Date.now()`, no
`Math.random()`. Anything clock- or random-derived (date, time, transaction ref,
approval code) is filled by `hydrateVolatile()` from an effect after mount. This runs
during static generation *and* client hydration, so non-deterministic values in render
would trip React hydration mismatches. Keep it that way.

### Totals

`computeTotals()` applies, in order: subtotal → less discount → tax on the discounted
amount → tip on the discounted amount. Tip is not taxed.

## Verified

- Build: 37 static routes, no errors
- No console or hydration errors across `/`, `/generator`, `/templates`,
  `/templates/[slug]`, `/pricing`, `/legal/terms`
- PNG export: 1020×3297 at 3× for an 80mm receipt
- PDF export: valid PDF 1.3, correctly sized
- Totals recalculate live on tax, discount, tip and item changes

## Not built yet

Accounts, saved businesses, receipt history, Stripe billing, the developer API, and the
internationalised locale routes. See `docs/STRATEGY.md` for the commercial plan and the
sequencing behind those.
