# BuildMyReceipt — Market Entry & Scaling Plan

> Strategic and commercial analysis only — not legal advice. Have counsel in the
> operating jurisdiction review the policy stack before launch.

Rendered version: https://claude.ai/code/artifact/54307c17-4978-4b3e-8be2-14050180a903

---

## Headline verdicts

| | |
|---|---|
| Domain grade | **6/10** — functional, derivative, won't stop you, will cap your exit |
| $5k MRR | **Month 4–5** — achievable on the stated timeline if social lands |
| $10k profit | **Month 6–7** — not month 4; the math doesn't support it |
| Primary risk | **Positioning** — not law, not Google; what your marketing says you sell |

---

## 1. Domain assessment: buildmyreceipt.com

**Good:** clean `.com`, 17 chars, no hyphens/numbers, unambiguous spoken, contains
"receipt", reads as a tool.

**Bad:**

- It is a one-word mutation of **makemyreceipt.com**, an incumbent being directly
  attacked. Structurally a knockoff, will be read as one.
- **Permanent direct-traffic leak.** Half-remembered brand recall routes to the
  incumbent. Direct navigation is huge in this category (ExpressExpense reportedly
  ~45% direct).
- **"Build" is the wrong verb.** Demand language is *make* / *generate* / *create*.
- **Trademark exposure.** "Build My Receipt" vs "Make My Receipt", identical
  services and channel — textbook likelihood-of-confusion. Cheap for them to file,
  expensive to lose after rankings exist.

**Action, week 1:** USPTO TESS + EUIPO search for "MakeMyReceipt". If there's a live
registration in class 42/9, get 30 minutes with a trademark attorney. Migration at
month 2 is free; at month 10 it costs the entire ranking base.

**Recommendation:** keep it, ship on it, register a short brandable `.com` this week
as insurance. EMDs stopped carrying ranking weight in 2012 — the domain only needs to
not hurt, and on that bar it passes.

---

## 2. Market read

A large share of "receipt generator" demand is fabrication intent (expense padding,
refund fraud, warranty claims, income documentation). Everyone in the market knows it —
a competitor ranks openly for "Fake Receipt Maker", and receiptsapps.com carries a
four-paragraph footer liability block covering fraud, forgery, misrepresentation and
"referral to law enforcement".

Legitimate recurring demand is also real and larger than assumed:

- Cash-taking microbusinesses (trades, salons, market stalls, tutors, cleaners)
- Landlords issuing rent receipts — India HRA volume is seven-figure with weak competition
- Nonprofits issuing donation acknowledgements
- **Developers/QA generating synthetic receipts for OCR and expense-pipeline testing**
- Legitimate reconstruction of genuinely lost receipts

**Strategic move:** capture nearly all the traffic without underwriting the fraud. The
high-volume keywords are intent-neutral. You never need "fake receipt" to win.

**Competitive gap:** every incumbent is built for a *one-off* job — land, generate,
download, leave. Brutal churn, revenue thinner than traffic implies. Nobody is building
the tool a cash business opens *every Friday*. That's the wedge, and it's also the
compliant one.

---

## 3. Compliance architecture

### Correct the founding assumption

**Section 230 does not apply.** It shields platforms from liability for *third-party*
content. Your templates and generator output are *your* content. A ToS disclaimer is
evidence of good faith, not a shield.

The governing frame is the *Sony*/*Grokster* line: a dual-use tool is lawful if it has
substantial legitimate uses and you don't induce the unlawful ones. **Grokster lost on
its marketing, not its code.**

> Your marketing copy is your legal exposure. Not your feature set, not your ToS.

### Layer 1 — Positioning (Critical)

Across all copy, meta, alt text, blog, ads, TikTok captions, App Store listings, support macros:

- Never: **fake, novelty, prank, replica, fool, spoof, proof-of-purchase-for-refund**
- Never rank for, bid on, or build pages for fraud-intent queries. Google Ads negatives
  day one. If a page pulls fraud-intent traffic in GSC, rewrite or `noindex` it.
- All positioning: business documentation, bookkeeping/tax records, receipts issued by
  *you* for *your own* sales, test-data generation.

### Layer 2 — Product constraints (Critical)

- **Zero third-party trademarks.** No Walmart/Target/Uber/Shell logos, no pixel-clone
  brand templates. Generic industry archetypes + user logo upload only. Reproducing a
  real mark is direct Lanham Act infringement; under 18 U.S.C. § 2320 counterfeit-mark
  cases can be criminal. **This is the largest unmanaged liability the incumbents carry —
  do not inherit it to match their template count.**
- **Durable provenance on every document.** XMP/PDF metadata + document ID on every
  output, every tier, never stripped. Sold to users as an audit/authenticity feature.
  Deters casual fraud, is the best good-faith exhibit for a regulator or acquirer, and
  makes law-enforcement response take minutes.
- **Transaction attestation at the download gate.** Checkbox: *"I confirm this records a
  real transaction, or is for template/testing purposes."* Logged with timestamp,
  account, IP, document ID. Worth more than ten pages of terms.
- **Visible issuance line by default**, removable on Business tier after attestation —
  a feature you can charge for *and* a compliance gate.
- Allow backdating (legitimate), but log the delta between document date and creation date.

### Layer 3 — Policy stack (High)

Live before the first paid signup — Stripe underwriting reads the site.

- ToS with standalone **Acceptable Use Policy**: explicit prohibition on fraud, forgery,
  deceiving employers/insurers/landlords/tax authorities, impersonating businesses
- User representation & warranty that they are the issuing party or recording a real transaction
- Termination rights, indemnification, express reservation of right to report to law enforcement
- Trademark complaint procedure with named agent; public `abuse@` form a human reads
- Privacy Policy, GDPR/CCPA, DPA, cookie consent. Logging retention needs a stated lawful
  basis — fraud prevention as legitimate interest, 18 months, documented
- **Law Enforcement Guidelines page.** Almost nobody in this category has one. Costs an
  afternoon, changes how seriously every regulator and processor reads you.

### Layer 4 — Corporate & payments (High)

- LLC/Ltd before launch. Never a personal account.
- Stripe primary. **Second processor onboarded by month 3, before it's needed.** Stripe's
  prohibited list covers "document falsification"; review triggers on volume growth or a
  single complaint. A freeze with no fallback is business-ending and always lands on your
  best week.
- Descriptor `BUILDMYRECEIPT.COM` + support email. Vague descriptors are the #1 cause of
  "I don't recognize this charge" disputes.
- **No $1 trials, no forced continuity, no dark-pattern cancellation.** One-click self-serve cancel.
- Renewal reminder 7 days before every annual charge — kills most annual disputes.
- Refund on request, no argument, first six months. Protect the ratio, not the revenue.
  Above 0.65% is Stripe's early-warning band; above 1% heads to MATCH, which is a
  five-year sentence on card acceptance.

### The honest limit

None of this is bulletproof. If a large share of revenue comes from fraud users, no
paperwork saves you — intent is inferred from revenue mix and traffic sources, not your
footer. The program only works if it genuinely shapes the product. Upside: it also
produces the more defensible, higher-retention, actually-acquirable business.

---

## 4. Product & pricing

| Tier | Price | Contents |
|---|---|---|
| **Free** | $0, no account | Unlimited watermarked previews; 1 clean download/month with email; core templates; PNG+PDF |
| **Pro** | $9.99/mo or **$79/yr** | Unlimited clean downloads, full library, custom logo, saved businesses+customers, receipt history & reissue, 80mm/110mm/A4, thermal fonts |
| **Business** | $24.99/mo or $199/yr | Pro + 3 seats, QuickBooks/Xero CSV export, VAT/GST/HST formats, bulk+CSV import, remove issuance line |
| **Developer API** | $49–$299 metered | Programmatic generation, synthetic OCR test data, deterministic seeds, sandbox |

**Why this shape:**

- Free is generous on preview, hard-gated on download. Watermarked previews earn the
  ranking, the share and the backlink. The paywall sits at peak intent. One clean download
  per month for an email is the highest-value trade on the site — in a one-off-intent
  category, the email list is the only compounding asset besides rankings.
- **Annual default-selected at checkout.** Not a preference — the survival of your MRR.
- **The Developer API is the sleeper.** Legitimate need, high ARPU, near-zero churn,
  fraud-disconnected, converts on technical evaluation in days. Twenty customers at $99
  is $2k MRR with no consumer traffic — and it's what makes the business legible to an acquirer.

**Optional accelerator:** $129 lifetime, capped at 300 units, retired month 6. Front-loads
~$15–25k to fund ads before organic lands. **It is not MRR**, it permanently removes users
from the recurring base, and selling it past month 6 borrows from a business you haven't built.

### Churn is the whole game

Monthly plans churn 45–55% here because the job is genuinely one-off. Every "feature" on
the roadmap is really a churn intervention:

| Lever | Mechanism | Effect |
|---|---|---|
| Annual mix at 35% | Removes the monthly cancel decision | −15 pts |
| Saved customers & businesses | Switching cost — data lives here | −4 pts |
| Receipt history + reissue | Reason to return without a new sale | −3 pts |
| Bookkeeping export | Ties tool to a monthly accounting ritual | −4 pts |
| Recurring receipts (rent, retainers) | Genuinely recurring underlying job | −3 pts |
| **Blended** | ~50% naive → ~32% engineered → ~22% mature | **−28 pts** |

Cutting blended churn 32% → 22% raises steady-state subscribers ~45% at identical traffic.
**No SEO tactic in this plan is worth as much.**

---

## 5. SEO plan

### Architecture

| Layer | URL pattern | Pages | Job |
|---|---|---|---|
| Head | `/`, `/receipt-generator` | ~6 | Highest-volume commercial terms |
| Template layer | `/templates/[type]-receipt` | 300–450 | The traffic engine |
| Format layer | `/templates/[type]/[format]` | 80–120 | PDF / Word / printable variants |
| Locale | `/uk/` `/in/` `/ca/` `/au/` `/ph/` | 150+ | VAT / GST / HRA — weak competition |
| Free tools | `/tools/[tool]` | 10–15 | Link magnets, rank independently |
| Editorial | `/blog/[slug]` | 100+ | Informational, topical authority |
| Trust | `/legal/*` | 8 | Underwriting + E-E-A-T signals |

### The mistake that ends this

**Do not ship 400 template pages at once on a domain with no history.** That is the exact
signature Google's scaled content abuse enforcement is tuned for, and the March 2026 spam
update was pure enforcement escalation on that policy.

- Ship in waves of 30–50/week
- Every template page loads a **working, preloaded generator** — functional utility is the
  strongest differentiator between "programmatic" and "doorway"
- Pair with 400–700 words of genuinely type-specific content: when it's used, what fields
  are legally expected, tax treatment, retention rules

### Keyword map

- **Head (commercial):** receipt generator, receipt maker, free receipt maker, online
  receipt generator, make a receipt — high competition, months to move, don't lead here
- **Type modifiers (the engine):** restaurant/gas/hotel, rent, donation, taxi, parking,
  towing, daycare, salon, handyman, cash, itemized — hundreds of modest terms, collectively
  the bulk of traffic, rank in weeks
- **Format intent:** receipt template pdf/word, printable receipt book, blank receipt form
- **International (underpriced — spend disproportionately here):** rent receipt for HRA
  (India), VAT receipt template (UK), GST invoice/receipt (IN/AU), recibo de pago (LatAm),
  Official Receipt (PH)
- **Informational:** how to write a receipt, do I need receipts for taxes, how long to keep
  receipts, what is an itemized receipt
- **Adjacent tools:** invoice generator, packing slip, estimate, mileage log, expense
  report, sales tax calculator by state

### Links

Free tools are the cheapest links in software — sales-tax calculator, mileage log, expense
report template, tip calculator. Each ranks on its own and earns editorial links from
small-business and personal-finance blogs that would never link to a receipt generator.

Then, once: an **original data study** from aggregate anonymized data nobody else has —
average tip rates by state, most-receipted service categories, small-business pricing by
trade. Journalists link to numbers they can't get elsewhere. One good study beats six
months of guest posting.

Baseline: Product Hunt, AlternativeTo, G2, Capterra, SaaS directories, r/smallbusiness and
r/freelance where genuinely on-topic, HARO/Qwoted for bookkeeping and tax quotes.

**Don't:** no PBNs, no bulk link buying, no AI-spun content farms. You already carry
category-level scrutiny. Stacking a manual action on top of a processor review kills the
business on two fronts in one month.

### Technical floor

- Static generation or ISR on edge hosting. **LCP under 1.2s on 4G** — incumbents are slow,
  speed is a cheap real edge
- Generator renders server-side first; never gate primary content behind JS
- Schema: `SoftwareApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`
- Programmatic internal linking — related types, same-industry cluster, format variants
- `hreflang` across locales, correct per-market terminology, not machine translation
- Search Console + Bing Webmaster day one; privacy-friendly analytics

---

## 6. TikTok & Instagram

**Read before briefing a creator:** the receipt content that goes viral on TikTok is fraud
content — "how to get free food", refund exploits, expense padding. You cannot make it. It
gets the account permanently banned, and far worse, **it is the exact promotional evidence
that establishes inducement.** The compliant social strategy produces less virality than
the non-compliant one. That is the real trade behind "bulletproof."

### Content pillars

1. **Receipt aesthetic — highest ceiling.** Thermal-print aesthetic is a large, established,
   entirely benign trend: receipt-style journaling, "receipt of my year", gift receipts,
   wedding/event receipts, receipt-format poems and playlists. Massive views, zero fraud
   adjacency, genuinely satisfying visuals. **Build a free "fun receipt" mode as a
   first-class product surface** — it converts a compliance constraint into the best growth
   loop you have, and every share carries your issuance line.
2. **Cash-business education.** "You're legally required to give a receipt if…", tracking
   cash income without a POS, what the IRS wants from a sole trader. Lower views,
   dramatically higher intent — this is the person who subscribes and renews.
3. **Tool demos / ASMR.** Template reveals, thermal printer sound, speed-builds. Cheap,
   repeatable, performs across all four platforms with no re-shooting.
4. **Freelancer tax & bookkeeping.** Large well-monetized audience with recurring pain.
   Every script is a blog post and every post is a script.
5. **Build in public.** Founder audience on X/LinkedIn. Low volume, but drives first
   backlinks, Product Hunt push, and inbound API conversations.

### Operating parameters

- 2–3 posts/day/platform. Minimum 90 days before judging the channel; first 60 are data collection
- Shoot once, cut for TikTok, Reels, Shorts, Pinterest
- Link-in-bio to a dedicated landing page with its own offer and tracking, not the homepage
- Funnel reality: 1–3% of views reach profile, 5–15% of those click. **1M monthly views ≈ 3–15k sessions**
- Social converts at ~1/3 of search (0.25% vs 1.0%). Volume compensates
- Amplify proven organic winners with TikTok Spark Ads. Never run cold creative

---

## 7. First 180 days

**Weeks 1–2 — Foundation and legal.** Entity formed, trademark search cleared, full legal
stack live (launch blocker — Stripe underwriting reads the site). Working generator, 15
templates, real PDF with embedded provenance. Stripe live with correct descriptor and
one-click cancel. GSC, Bing, analytics, sitemap, schema. Social accounts claimed, first 20
videos shot in one session.

**Weeks 3–6 — Template layer, wave one.** 120–150 template pages in weekly waves of 30–50,
each with preloaded working generator + 400–700 unique words. Free tools shipped. Daily
social begins; receipt-aesthetic mode ships as a public feature. Directory and Product Hunt launch.

**Weeks 7–12 — International and retention.** UK/India/Canada/Australia locales with correct
tax terminology and hreflang. Template layer to 300+. **Retention build:** saved customers,
receipt history, reissue, bookkeeping export. Annual default-selected; renewal reminders
live. Developer API private beta with first 5 design partners. **Second payment processor
onboarded and tested.**

**Weeks 13–18 — Amplify what's working.** Paid amplification on proven organic social only.
Original data study + digital PR push. API public with self-serve onboarding. Business tier
with accounting integrations. Churn cohort analysis drives every subsequent roadmap decision.

**Weeks 19–26 — Compound.** Template layer to 450+, second-tier locales. Mobile apps (the
incumbents have them and they defend direct traffic). Retire the lifetime deal. Partnership
motion: bookkeepers, accountants, POS resellers.

---

## 8. Financial model

Assumptions: blended visitor→paid 0.7% (search ~1.0%, social ~0.25%); plan mix 57% monthly /
35% annual / 8% business → blended **~$10 recognized MRR per subscriber**; blended monthly
churn 32% falling toward 22% as retention features land.

| Month | Organic | Social | Total sessions | New subs | Active | MRR |
|---|---:|---:|---:|---:|---:|---:|
| M1 | 400 | 3,600 | 4,000 | 28 | 28 | $280 |
| M2 | 2,000 | 10,000 | 12,000 | 84 | 103 | $1,030 |
| M3 | 7,000 | 18,000 | 25,000 | 175 | 245 | $2,450 |
| M4 | 15,000 | 30,000 | 45,000 | 315 | 482 | $4,820 |
| M5 | 28,000 | 42,000 | 70,000 | 490 | 818 | $8,180 |
| **M6** | **45,000** | **50,000** | **95,000** | **665** | **1,221** | **$12,210** |

> $5k MRR by month 4–5 is realistic. $10k MRR by month 4 is not — and $10k *profit* by
> month 4 is a different, considerably harder number not worth planning around.

### MRR is not profit

The brief said "$5k–$10k monthly profit (MRR)". Those are two quantities and the gap is
where this succeeds or fails. At month 5, $8.2k MRR against realistic costs — hosting and
AI inference $300, tooling $250, content contractor $1,500, amortized legal, plus ad spend —
nets roughly $5–6k organic-led.

$10k MRR by month 4 is purchasable with ~40k sessions of paid traffic. At TikTok CPCs of
$0.15–0.35 that's $6–14k monthly spend against ~$10k MRR — at or below breakeven to hit a
date. **The date isn't worth it.** Organic-led reaches the same MRR eight weeks later with
the profit intact and a compounding asset underneath.

### Risk register

| Risk | Severity | Leading indicator | Mitigation |
|---|---|---|---|
| Stripe review/freeze | Critical | Volume crossing ~$50k processed; any complaint | Clean positioning; 2nd processor by M3; 30 days cash |
| Scaled content abuse action | Critical | Indexation rate falling; impressions flat as pages grow | Staged waves; functional generator per page; genuine content |
| Churn above 40% blended | High | Month-2 cohort retention under 50% | Retention features by week 12; force annual mix |
| Dispute ratio above 0.65% | High | Weekly Stripe dispute dashboard | Clear descriptor, renewal reminders, liberal refunds, no trials |
| Trademark claim on domain | Medium | C&D; UDRP filing | Clear it week 1; keep brandable backup registered |
| Social account ban | Medium | Reach collapse; strike notices | Never fraud-adjacent; multiple accounts; email list as owned asset |

### Kill criteria

- Month 3 organic under 3k sessions with 150+ pages indexed — the programmatic layer isn't
  landing, something structural is wrong
- Month-2 cohort retention under 40% after retention features ship — the recurring use case
  doesn't exist; reprice as a one-time purchase
- Two processor rejections — the market has decided what business you're in

---

## 9. Build spec

Stack: Next.js on edge hosting, static generation for the template layer, Postgres for
accounts and receipt history, server-side PDF generation with embedded provenance metadata,
Stripe Billing with annual default. The generator has to be genuinely good — incumbents all
have dated editors, and a fast pleasant builder is a conversion advantage that compounds
against every channel.

**Week one deliverable:**

- Working generator, 15 templates, real PDF/PNG output with provenance metadata and the
  attestation gate
- Complete legal stack — ToS, AUP, Privacy, Law Enforcement Guidelines, abuse reporting
- Stripe Billing wired with correct descriptor, annual default, one-click cancel
- Programmatic template page framework, ready to take content in waves
- Search Console, sitemap, schema, analytics

The legal pages gate Stripe underwriting, so they cannot be the thing done last.

---

## Sources & research notes

Competitor analysis drawn from the supplied receiptsapps.com capture (full page print
including footer template taxonomy and legal disclaimer block) and public search sources.

Direct crawls of `receiptbaker.com`, `makemyreceipt.com` and `receiptsapps.com` were blocked
by session egress policy (proxy returned 403 on CONNECT) and were not retrieved.

- Stripe prohibited/restricted businesses — "document falsification" under unfair and
  deceptive practices
- Google Search Central spam policies — scaled content abuse, doorway abuse; March 2026
  update was enforcement escalation of the March 2024 policy
- ExpressExpense traffic composition (~45% direct, ~41% Google) and pricing (~$4.99/mo entry)
- MATCH list consequences and the 0.65%/1% dispute-ratio thresholds
