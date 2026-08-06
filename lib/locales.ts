import type { ReceiptData } from "./types";

export interface LocaleTemplate {
  slug: string;
  name: string;
  h1: string;
  blurb: string;
  intent: string;
  /** Slug of the equivalent global template, for hreflang + cross-linking. */
  equivalent?: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  seed: Partial<ReceiptData>;
}

export interface Locale {
  code: string;
  /** URL segment. */
  path: string;
  country: string;
  hreflang: string;
  currency: string;
  taxLabel: string;
  taxRate: number;
  paper: ReceiptData["paper"];
  title: string;
  description: string;
  intro: string[];
  notes: { heading: string; body: string[] }[];
  templates: LocaleTemplate[];
}

export const LOCALES: Locale[] = [
  /* ─────────────────────────────── INDIA ─────────────────────────────── */
  {
    code: "in",
    path: "in",
    country: "India",
    hreflang: "en-IN",
    currency: "INR",
    taxLabel: "GST",
    taxRate: 18,
    paper: "a4",
    title: "Receipt Generator India — Rent Receipts for HRA, GST Receipts",
    description:
      "Free receipt generator for India. Create rent receipts for HRA claims with landlord PAN, GST receipts and cash receipts in rupees. No signup.",
    intro: [
      "A receipt generator set up for Indian requirements: rupee formatting, GST rather than sales tax, and the fields Indian employers and assessing officers actually look for.",
      "The most-requested document here is the rent receipt used to support a House Rent Allowance claim, which has requirements that do not exist anywhere else — most notably the landlord's PAN above a threshold, and a revenue stamp on cash payments.",
    ],
    notes: [
      {
        heading: "GST is not a single rate",
        body: [
          "GST in India is levied at multiple slabs — commonly 5%, 12%, 18% and 28% depending on the goods or service — so there is no default rate that is right for every business. Set the rate that applies to your supply.",
          "Where a supply is intra-state, the tax splits into CGST and SGST at half the combined rate each; inter-state supplies carry IGST at the full rate. This generator shows a single combined GST line. If you need the CGST/SGST split shown separately, add them as two footer lines.",
        ],
      },
      {
        heading: "GSTIN on the document",
        body: [
          "If you are registered under GST, your GSTIN must appear on tax documents you issue. Use the tax registration field — it prints in the header block.",
          "A registered recipient generally needs your GSTIN on the document to claim input tax credit, so leaving it off creates a real problem for your customer, not just a formatting one.",
        ],
      },
    ],
    templates: [
      {
        slug: "rent-receipt-hra",
        name: "Rent Receipt for HRA",
        h1: "Rent Receipt Generator for HRA Claims",
        blurb: "Landlord PAN, rental period, revenue stamp line — formatted for HRA.",
        intent:
          "Generate rent receipts for House Rent Allowance claims, with landlord name and PAN, property address, rental period and amount paid.",
        equivalent: "rent-receipt",
        sections: [
          {
            heading: "What an HRA rent receipt must carry",
            body: [
              "House Rent Allowance is one of the largest salary exemptions available to Indian employees, and the rent receipt is the document that substantiates it. Employers collect them during the investment-proof window, and assessing officers ask for them when a return is scrutinised.",
              "The receipt should identify the tenant and the landlord, the property, the rental period, the amount paid and the date of payment. Where rent is paid monthly, a separate receipt for each month is the safest approach — a single consolidated receipt for the year is frequently queried.",
            ],
          },
          {
            heading: "The landlord's PAN",
            body: [
              "Where annual rent exceeds ₹1,00,000, the landlord's PAN is generally required and must be reported to the employer. If the landlord does not have a PAN, a signed declaration to that effect is the conventional substitute.",
              "Put the PAN in the tax registration field — it prints in the header block alongside the landlord's details. A receipt above the threshold without a PAN is the single most common reason an HRA claim gets rejected at the employer stage.",
            ],
          },
          {
            heading: "Revenue stamp on cash payments",
            body: [
              "Where rent is paid in cash and the amount exceeds ₹5,000, convention — and many employers' own checklists — call for a revenue stamp affixed to the receipt with the landlord's signature across it.",
              "That is a physical step you complete after printing. Generate the receipt with a signature line in the footer, print it, affix the stamp and have the landlord sign across it. Payments made by bank transfer do not need a revenue stamp, and the bank record is stronger evidence in any case.",
            ],
          },
        ],
        faqs: [
          {
            q: "Is the landlord's PAN mandatory on a rent receipt?",
            a: "Generally yes where annual rent exceeds ₹1,00,000. If the landlord has no PAN, a signed declaration is the usual substitute.",
          },
          {
            q: "Do I need a receipt for every month?",
            a: "Monthly receipts are the safest. A single consolidated annual receipt is frequently queried by employers.",
          },
          {
            q: "When is a revenue stamp needed?",
            a: "Conventionally on cash rent payments above ₹5,000, signed across by the landlord. Bank transfers do not need one.",
          },
          {
            q: "Can I claim HRA if I pay rent to a family member?",
            a: "It is possible but heavily scrutinised. The tenancy must be genuine, rent actually paid, and the landlord must declare the rental income. Take professional advice.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "INR",
          taxRate: 0,
          taxLabel: "",
          business: {
            name: "Rajesh Kumar Sharma",
            address: "Flat 402, Sunrise Residency",
            cityLine: "Andheri East, Mumbai 400069",
            phone: "+91 98200 55014",
            website: "",
            taxId: "PAN: ABCPS1234K",
            logo: null,
          },
          items: [
            {
              id: "1",
              qty: 1,
              name: "Rent — Flat 402, Sunrise Residency (1–30 April)",
              price: 24000,
            },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "RECEIVED WITH THANKS",
            lines: [
              "Received from: Priya Menon (Tenant)",
              "Towards rent for April",
              "",
              "Signature of Landlord: ____________________",
              "(Affix revenue stamp for cash above ₹5,000)",
            ],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
      {
        slug: "gst-receipt",
        name: "GST Receipt",
        h1: "GST Receipt Generator India",
        blurb: "GSTIN, HSN/SAC description, GST at your slab, rupee totals.",
        intent:
          "Create a GST-compliant receipt showing your GSTIN, itemised supply, applicable GST rate and total in rupees.",
        equivalent: "invoice-receipt",
        sections: [
          {
            heading: "What a GST document needs",
            body: [
              "A tax document issued by a registered supplier should carry your legal name and address, your GSTIN, a unique consecutive number, the date of issue, a description of the supply, the taxable value, the rate and amount of tax, and the total payable.",
              "Consecutive numbering matters here more than in most jurisdictions — the series must be unique and unbroken for a financial year. Use the transaction number field and keep the sequence intact.",
            ],
          },
          {
            heading: "Rates and the CGST/SGST split",
            body: [
              "Set the rate that applies to your supply — 5%, 12%, 18% and 28% are the common slabs, and some supplies are nil-rated or exempt. Getting this wrong is a compliance problem, not a formatting one.",
              "For an intra-state supply the combined rate splits equally into CGST and SGST; for inter-state it is IGST at the full rate. The generator prints a single combined GST line. Add the split as two footer lines where you need it shown explicitly.",
            ],
          },
        ],
        faqs: [
          {
            q: "Do I have to show my GSTIN?",
            a: "Yes, if you are registered. Without it your customer generally cannot claim input tax credit.",
          },
          {
            q: "Which GST rate should I use?",
            a: "The slab that applies to your specific supply — commonly 5%, 12%, 18% or 28%. Some supplies are nil-rated or exempt.",
          },
          {
            q: "Does the numbering have to be sequential?",
            a: "Yes. The series must be unique and consecutive for the financial year.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "INR",
          taxRate: 18,
          taxLabel: "GST @ 18%",
          business: {
            name: "Meridian Tech Solutions",
            address: "3rd Floor, Prestige Tower, MG Road",
            cityLine: "Bengaluru, Karnataka 560001",
            phone: "+91 80 4155 0198",
            website: "",
            taxId: "GSTIN: 29AABCM1234F1Z5",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Website development — Phase 1 (SAC 998314)", price: 85000 },
            { id: "2", qty: 12, name: "Support retainer — hr (SAC 998313)", price: 1500 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "PAYMENT RECEIVED",
            lines: ["CGST @ 9% and SGST @ 9% (intra-state supply)"],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
      {
        slug: "cash-receipt",
        name: "Cash Receipt",
        h1: "Cash Receipt Generator India",
        blurb: "Rupee cash receipt with payer, purpose and signature line.",
        intent:
          "Create a cash receipt in rupees recording who paid, how much, what for and when.",
        equivalent: "cash-receipt",
        sections: [
          {
            heading: "Cash limits worth knowing",
            body: [
              "Indian tax law restricts large cash transactions. Receiving ₹2,00,000 or more in cash from a single person in a day, or against a single transaction, attracts a penalty under Section 269ST equal to the amount received.",
              "There are also limits on the deductibility of cash expenditure for the payer. If you are routinely receiving large cash amounts, the receipt is not the problem — the payment method is. Take professional advice.",
            ],
          },
          {
            heading: "What to record",
            body: [
              "Name the payer and the payee, state the amount in figures and ideally in words, describe what the payment is for, and date it. A signature from the person receiving the money completes it.",
              "Keep a numbered counterfoil or a retained PDF against the same sequence number. For a cash business, an unbroken numbered series is what makes your declared receipts credible.",
            ],
          },
        ],
        faqs: [
          {
            q: "Is there a limit on cash receipts in India?",
            a: "Yes. Section 269ST penalises receiving ₹2,00,000 or more in cash from one person in a day or against one transaction.",
          },
          {
            q: "Should the amount be written in words?",
            a: "Conventional and advisable — it prevents alteration of the figure. Add it as a footer line.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "INR",
          taxRate: 0,
          taxLabel: "",
          business: {
            name: "Shree Electricals & Hardware",
            address: "12 Nehru Market, Sector 22",
            cityLine: "Chandigarh 160022",
            phone: "+91 172 555 0143",
            website: "",
            taxId: "",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Electrical fittings and installation", price: 8500 },
          ],
          payment: { method: "Cash", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "PAID IN FULL — THANK YOU",
            lines: [
              "Rupees Eight Thousand Five Hundred Only",
              "Received from: A. Bhatia",
              "Signature: ____________________",
            ],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
    ],
  },

  /* ────────────────────────── UNITED KINGDOM ────────────────────────── */
  {
    code: "uk",
    path: "uk",
    country: "United Kingdom",
    hreflang: "en-GB",
    currency: "GBP",
    taxLabel: "VAT @ 20%",
    taxRate: 20,
    paper: "80mm",
    title: "Receipt Generator UK — VAT Receipts & Business Receipts Free",
    description:
      "Free receipt generator for the UK. Create VAT receipts with your VAT number, itemised business receipts and rent receipts in pounds. No signup.",
    intro: [
      "A receipt generator set up for UK conventions: pounds, VAT rather than sales tax, and the fields HMRC and your customers expect on a VAT receipt.",
      "The distinction that catches people out is between a simple receipt and a VAT receipt. Only the second lets a VAT-registered customer reclaim the tax, and it has to carry specific information to do that job.",
    ],
    notes: [
      {
        heading: "Simple receipt vs VAT receipt",
        body: [
          "If you are not VAT registered, you must not show VAT on anything you issue. Charging or displaying VAT without being registered is an offence, and it is a surprisingly common mistake among newly self-employed traders. Leave the rate at zero.",
          "If you are registered, a VAT receipt must show your VAT registration number, the date, a description of the goods or services, the rate charged and the amount of VAT. Without those, your customer cannot reclaim the input tax.",
        ],
      },
      {
        heading: "Rates and simplified receipts",
        body: [
          "The standard rate is 20%. A reduced rate of 5% applies to things like domestic fuel and power and certain installations, and a zero rate applies to most food, books and children's clothing. Zero-rated is not the same as exempt — zero-rated supplies still count towards your taxable turnover.",
          "For retail supplies under £250 including VAT, a simplified VAT receipt is permitted: it needs your name, address and VAT number, the date, a description, the VAT-inclusive total and the rate applied — but not a separate VAT amount.",
        ],
      },
    ],
    templates: [
      {
        slug: "vat-receipt",
        name: "VAT Receipt",
        h1: "VAT Receipt Generator UK",
        blurb: "VAT number, rate and amount shown separately — reclaimable by your customer.",
        intent:
          "Create a UK VAT receipt showing your VAT registration number, the rate charged and the VAT amount, so your customer can reclaim input tax.",
        equivalent: "invoice-receipt",
        sections: [
          {
            heading: "What makes it a VAT receipt",
            body: [
              "A VAT receipt is not just a receipt from a VAT-registered business — it is a document carrying the specific information HMRC requires before your customer can reclaim the tax they paid you.",
              "That means: your business name and address, your VAT registration number, the date of supply, a description of what was supplied, the rate of VAT applied, and the amount of VAT charged. The generator prints the registration number in the header when you fill the tax registration field, and shows the VAT line separately in the totals.",
            ],
          },
          {
            heading: "Getting the rate right",
            body: [
              "Standard rate is 20% and covers most goods and services. The reduced rate of 5% covers domestic fuel and power, children's car seats and certain energy-saving installations. The zero rate covers most food, books, newspapers, public transport and children's clothing.",
              "Exempt supplies — insurance, most financial services, postage stamps, certain education and health services — are different again: no VAT is charged and they do not count towards your taxable turnover, unlike zero-rated supplies.",
            ],
          },
          {
            heading: "Record keeping",
            body: [
              "VAT records generally need to be kept for six years. Under Making Tax Digital, VAT-registered businesses must keep those records digitally and file through compatible software.",
              "A PDF of each receipt you issue, filed against its sequence number, satisfies the digital record element for the documents themselves — but it is not a substitute for MTD-compatible filing software.",
            ],
          },
        ],
        faqs: [
          {
            q: "Can I show VAT if I am not registered?",
            a: "No. Charging or displaying VAT without being VAT registered is an offence. Leave the rate at zero.",
          },
          {
            q: "What is a simplified VAT receipt?",
            a: "For retail supplies under £250 including VAT, you may issue a receipt showing the VAT-inclusive total and the rate, without a separate VAT amount.",
          },
          {
            q: "How long must I keep VAT records?",
            a: "Generally six years, and digitally if you fall under Making Tax Digital.",
          },
          {
            q: "Is zero-rated the same as exempt?",
            a: "No. Zero-rated supplies carry 0% VAT but count towards taxable turnover; exempt supplies do not.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "GBP",
          taxRate: 20,
          taxLabel: "VAT @ 20%",
          business: {
            name: "Kestrel Joinery Ltd",
            address: "Unit 6, Bramley Trading Estate",
            cityLine: "Sheffield S9 1XH",
            phone: "+44 114 555 0166",
            website: "kestreljoinery.example",
            taxId: "VAT Reg. No. GB 412 7788 03",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Fitted oak worktop — supply and install", price: 1240.0 },
            { id: "2", qty: 6, name: "Labour — hr @ 42.00", price: 42.0 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "PAYMENT RECEIVED — THANK YOU",
            lines: ["Company registered in England & Wales"],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
      {
        slug: "rent-receipt",
        name: "Rent Receipt",
        h1: "Rent Receipt Generator UK",
        blurb: "Tenant, property, rental period and deposit scheme reference.",
        intent:
          "Create a UK rent receipt showing tenant, property address, the rental period covered and the amount paid.",
        equivalent: "rent-receipt",
        sections: [
          {
            heading: "When a landlord must give a receipt",
            body: [
              "For a weekly tenancy, a landlord is required to provide a rent book, and to give a written receipt for rent paid where the tenant asks for one. For monthly tenancies the obligation is looser, but a tenant paying in cash has a strong practical case for insisting.",
              "Cash rent with no receipt is the situation that produces most possession disputes, because neither party can prove what was paid or when. If you take rent in cash, issue a receipt every time.",
            ],
          },
          {
            heading: "Deposits are not rent",
            body: [
              "A tenancy deposit for an assured shorthold tenancy must be protected in a government-approved scheme within 30 days, and prescribed information given to the tenant. A receipt for a deposit should name the scheme and the reference.",
              "Do not record a deposit as though it were rent. The two are treated completely differently, and mislabelling one as the other creates problems for both sides at the end of the tenancy.",
            ],
          },
        ],
        faqs: [
          {
            q: "Must a UK landlord provide a rent receipt?",
            a: "For weekly tenancies a rent book is required and a written receipt must be given on request. For monthly tenancies it is good practice, especially for cash.",
          },
          {
            q: "How do I record a deposit?",
            a: "Separately from rent, naming the protection scheme and reference. Deposits for assured shorthold tenancies must be protected within 30 days.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "GBP",
          taxRate: 0,
          taxLabel: "",
          business: {
            name: "Whitfield Lettings",
            address: "8 Cathedral Road",
            cityLine: "Cardiff CF11 9LJ",
            phone: "+44 29 2055 0121",
            website: "",
            taxId: "",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Rent — 14 Elmfield Road, Flat 2 (1–30 April)", price: 950.0 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "RECEIVED WITH THANKS",
            lines: ["Tenant: S. Ahmed", "Received by: ____________________"],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
    ],
  },

  /* ─────────────────────────────── CANADA ─────────────────────────────── */
  {
    code: "ca",
    path: "ca",
    country: "Canada",
    hreflang: "en-CA",
    currency: "CAD",
    taxLabel: "HST",
    taxRate: 13,
    paper: "80mm",
    title: "Receipt Generator Canada — GST/HST Receipts & Donation Receipts",
    description:
      "Free receipt generator for Canada. Create GST/HST receipts with your business number, official donation receipts and business receipts in Canadian dollars.",
    intro: [
      "A receipt generator set up for Canadian conventions: Canadian dollars, and the GST/HST/PST structure rather than a single sales tax.",
      "Sales tax in Canada varies by province more than in almost any other federal system, so the rate on your receipt depends on where the supply takes place, not where your business is registered.",
    ],
    notes: [
      {
        heading: "GST, HST, PST and QST",
        body: [
          "Five percent GST applies federally. Some provinces combine it with their provincial tax into a single HST — 13% in Ontario, 15% in Nova Scotia, New Brunswick, Newfoundland and Labrador, and Prince Edward Island.",
          "Others charge GST plus a separate provincial tax: British Columbia and Manitoba charge PST alongside GST, Saskatchewan charges its own PST, and Quebec charges QST. Alberta and the territories charge GST only. Set the combined rate for the province where the supply happens.",
        ],
      },
      {
        heading: "Your business number",
        body: [
          "If you are registered for GST/HST, your registration number must appear on receipts for supplies over $30 so the recipient can claim an input tax credit. Use the tax registration field.",
          "Registration is generally required once taxable revenue exceeds $30,000 in a calendar quarter or over four consecutive quarters, though you can register voluntarily below that.",
        ],
      },
    ],
    templates: [
      {
        slug: "gst-hst-receipt",
        name: "GST/HST Receipt",
        h1: "GST/HST Receipt Generator Canada",
        blurb: "Business number, provincial rate, Canadian dollar totals.",
        intent:
          "Create a Canadian receipt showing your GST/HST registration number, the applicable provincial rate and the tax charged.",
        equivalent: "service-receipt",
        sections: [
          {
            heading: "What the recipient needs to claim an ITC",
            body: [
              "For supplies of $30 or more, the recipient needs your business name, the date, the total amount and your GST/HST registration number to support an input tax credit claim. At $150 or more they also need the recipient's name, the terms of payment and a description of the supply sufficient to identify it.",
              "That escalating requirement is why a bare card slip is rarely enough for a business expense in Canada. An itemised document carrying your registration number is.",
            ],
          },
          {
            heading: "Picking the right rate",
            body: [
              "Use the rate for the province where the supply is made. Ontario is 13% HST. Nova Scotia, New Brunswick, Newfoundland and Labrador and Prince Edward Island are 15% HST. Alberta and the territories are 5% GST only.",
              "In British Columbia, Manitoba, Saskatchewan and Quebec, GST is charged alongside a separate provincial tax. If you need both shown separately rather than combined, set the GST rate in the tax field and add the provincial component as a footer line.",
            ],
          },
        ],
        faqs: [
          {
            q: "When must my registration number appear?",
            a: "On supplies of $30 or more, so the recipient can claim an input tax credit.",
          },
          {
            q: "Which rate do I charge?",
            a: "The rate for the province where the supply takes place — 13% in Ontario, 15% in the Atlantic HST provinces, 5% GST only in Alberta and the territories.",
          },
          {
            q: "When do I have to register for GST/HST?",
            a: "Generally once taxable revenue exceeds $30,000 in a calendar quarter or across four consecutive quarters.",
          },
        ],
        seed: {
          style: "service",
          paper: "a4",
          currency: "CAD",
          taxRate: 13,
          taxLabel: "HST @ 13%",
          business: {
            name: "Northbridge Design Co.",
            address: "220 Adelaide Street West, Suite 400",
            cityLine: "Toronto, ON M5H 1W7",
            phone: "(416) 555-0177",
            website: "northbridgedesign.example",
            taxId: "GST/HST No. 80122 4471 RT0001",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Brand identity package", price: 4200.0 },
            { id: "2", qty: 8, name: "Additional design — hr @ 125.00", price: 125.0 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "PAYMENT RECEIVED — THANK YOU",
            lines: ["Client: Lakeshore Ventures Inc."],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
      {
        slug: "donation-receipt",
        name: "Official Donation Receipt",
        h1: "Official Donation Receipt Generator Canada",
        blurb: "Charity registration number, CRA wording and eligible amount.",
        intent:
          "Create an official donation receipt for a registered Canadian charity, with registration number and the required CRA information.",
        equivalent: "donation-receipt",
        sections: [
          {
            heading: "Official donation receipts are prescribed",
            body: [
              "The CRA specifies what an official donation receipt must contain, and a receipt missing required elements can be rejected — which costs the donor their credit and exposes the charity to sanctions.",
              "Required elements include a statement that it is an official receipt for income tax purposes, the charity's registered name, address and registration number, a unique serial number, the place of issue, the date of the donation and the date of issue, the donor's name and address, the eligible amount, and the CRA website address.",
            ],
          },
          {
            heading: "Advantage and eligible amount",
            body: [
              "Where the donor receives something in return — a dinner, a ticket, merchandise — that is an 'advantage', and the eligible amount is the donation minus the value of the advantage. Both figures must appear on the receipt.",
              "Where there is no advantage, state the eligible amount and say so. For gifts in kind, the eligible amount is fair market value, and an appraisal is expected above a threshold.",
            ],
          },
        ],
        faqs: [
          {
            q: "What must a Canadian official donation receipt contain?",
            a: "Among other things: the charity's registered name, address and registration number, a unique serial number, dates of donation and issue, the donor's name and address, the eligible amount and the CRA website address.",
          },
          {
            q: "What is an 'advantage'?",
            a: "Anything the donor receives in return. The eligible amount is the donation minus the advantage, and both must be shown.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "CAD",
          taxRate: 0,
          taxLabel: "",
          business: {
            name: "Prairie Wildlife Foundation",
            address: "88 Osborne Street",
            cityLine: "Winnipeg, MB R3L 2R4",
            phone: "(204) 555-0192",
            website: "canada.ca/charities-giving",
            taxId: "Charity Reg. No. 88214 4471 RR0001",
            logo: null,
          },
          items: [{ id: "1", qty: 1, name: "Charitable donation — general fund", price: 750.0 }],
          payment: { method: "Check", last4: "", approvalCode: "CHQ 2214", changeDue: 0 },
          footer: {
            headline: "OFFICIAL RECEIPT FOR INCOME TAX PURPOSES",
            lines: [
              "Receipt serial no. 2026-0418",
              "Issued at Winnipeg, MB",
              "Donor: L. Tremblay",
              "Eligible amount: $750.00 (no advantage received)",
            ],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
    ],
  },

  /* ────────────────────────────── AUSTRALIA ────────────────────────────── */
  {
    code: "au",
    path: "au",
    country: "Australia",
    hreflang: "en-AU",
    currency: "AUD",
    taxLabel: "GST",
    taxRate: 10,
    paper: "80mm",
    title: "Receipt Generator Australia — GST Tax Invoices & Receipts Free",
    description:
      "Free receipt generator for Australia. Create GST tax invoices with your ABN, business receipts and rent receipts in Australian dollars. No signup.",
    intro: [
      "A receipt generator set up for Australian conventions: Australian dollars, GST at 10%, and the ABN and tax invoice requirements the ATO sets.",
      "The term that matters here is 'tax invoice'. A plain receipt is not one, and only a valid tax invoice lets a GST-registered customer claim the credit.",
    ],
    notes: [
      {
        heading: "GST is a flat 10%",
        body: [
          "Unlike most systems, Australian GST is a single rate of 10% with no reduced tiers. What varies is whether a supply is taxable, GST-free or input-taxed.",
          "GST-free supplies include most basic food, many health and medical services, and most education. Input-taxed supplies include residential rent and most financial services. In both cases you charge no GST — but the treatment of your own input credits differs, so the distinction matters.",
        ],
      },
      {
        heading: "ABN and withholding",
        body: [
          "Your ABN should appear on documents you issue. If you do not quote an ABN on an invoice to a business customer, they may be required to withhold 47% of the payment and remit it to the ATO.",
          "GST registration is required once turnover reaches $75,000, or $150,000 for a non-profit. Below that it is optional. If you are not registered, do not show GST.",
        ],
      },
    ],
    templates: [
      {
        slug: "tax-invoice",
        name: "GST Tax Invoice",
        h1: "Tax Invoice Generator Australia",
        blurb: "ABN, the words 'Tax Invoice', GST at 10% and the GST-inclusive total.",
        intent:
          "Create a valid Australian tax invoice showing your ABN, the GST charged at 10% and the total including GST.",
        equivalent: "invoice-receipt",
        sections: [
          {
            heading: "What makes a valid tax invoice",
            body: [
              "For supplies under $1,000 a tax invoice must show that the document is intended to be a tax invoice, your identity, your ABN, the date, a description of the items supplied including quantity, the GST amount (or a statement that the total includes GST), and the extent to which each item is taxable.",
              "For supplies of $1,000 or more it must also show the buyer's identity or ABN. Missing that on a larger supply is the most common reason a claim gets bounced back.",
            ],
          },
          {
            heading: "Showing the GST",
            body: [
              "You can either show the GST amount separately or include a statement that the total price includes GST. Where GST is exactly one eleventh of the total, the common phrasing is 'Total price includes GST'.",
              "The generator shows GST as its own line by default. If you would rather use the inclusive statement, set the rate to zero and add the wording as a footer line, with prices entered GST-inclusive.",
            ],
          },
        ],
        faqs: [
          {
            q: "What must an Australian tax invoice show?",
            a: "That it is a tax invoice, your identity and ABN, the date, a description with quantities, and the GST amount or a statement that the total includes GST. Over $1,000 it also needs the buyer's identity or ABN.",
          },
          {
            q: "What happens if I do not quote an ABN?",
            a: "A business customer may be required to withhold 47% of the payment and remit it to the ATO.",
          },
          {
            q: "When must I register for GST?",
            a: "Once turnover reaches $75,000, or $150,000 for a non-profit. Below that it is optional — and if you are not registered, do not show GST.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "AUD",
          taxRate: 10,
          taxLabel: "GST @ 10%",
          business: {
            name: "Southbank Trades Pty Ltd",
            address: "14 Wharf Road, Southbank",
            cityLine: "Melbourne VIC 3006",
            phone: "+61 3 9555 0134",
            website: "southbanktrades.example",
            taxId: "ABN 52 004 471 882",
            logo: null,
          },
          items: [
            { id: "1", qty: 1, name: "Bathroom refit — materials", price: 2840.0 },
            { id: "2", qty: 16, name: "Labour — hr @ 95.00", price: 95.0 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "TAX INVOICE — PAID IN FULL",
            lines: ["Customer: R. Nguyen", "Total price includes GST"],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
      {
        slug: "rent-receipt",
        name: "Rent Receipt",
        h1: "Rent Receipt Generator Australia",
        blurb: "Tenant, premises, rental period — residential rent is input-taxed.",
        intent:
          "Create an Australian rent receipt showing the tenant, the premises, the period covered and the amount paid.",
        equivalent: "rent-receipt",
        sections: [
          {
            heading: "Receipts are generally required",
            body: [
              "Residential tenancy legislation is state-based, but across most states a landlord or agent must give the tenant a receipt for rent paid — immediately where rent is paid in cash, and on request otherwise. Where rent is paid into a nominated account, the bank record usually satisfies the requirement.",
              "The receipt should show the premises, the amount, the date of payment and the period the payment covers.",
            ],
          },
          {
            heading: "Residential rent is input-taxed",
            body: [
              "Residential rent is input-taxed, which means no GST is charged on it and the landlord cannot claim GST credits on related expenses. Do not show a GST line on a residential rent receipt.",
              "Commercial rent is different — it is a taxable supply, GST applies at 10%, and a tax invoice is appropriate rather than a plain receipt.",
            ],
          },
        ],
        faqs: [
          {
            q: "Does GST apply to residential rent in Australia?",
            a: "No. Residential rent is input-taxed — no GST is charged, and the landlord cannot claim GST credits on related costs. Commercial rent is taxable at 10%.",
          },
          {
            q: "Must a landlord give a rent receipt?",
            a: "In most states, yes — immediately for cash, and on request otherwise. Payment into a nominated account usually satisfies the requirement.",
          },
        ],
        seed: {
          style: "simple",
          paper: "a4",
          currency: "AUD",
          taxRate: 0,
          taxLabel: "",
          business: {
            name: "Harbourview Property Group",
            address: "Level 2, 88 Bay Street",
            cityLine: "Sydney NSW 2000",
            phone: "+61 2 9555 0188",
            website: "",
            taxId: "",
            logo: null,
          },
          items: [
            { id: "1", qty: 2, name: "Rent — 7/220 Rose St (fortnight to 14 Apr)", price: 720.0 },
          ],
          payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
          footer: {
            headline: "RENT RECEIVED",
            lines: [
              "Tenant: J. Kowalski",
              "Residential rent — input-taxed, no GST applies",
            ],
            showBarcode: false,
            showSurvey: false,
            showSavings: false,
            savings: 0,
          },
        },
      },
    ],
  },
];

export const LOCALE_MAP = new Map(LOCALES.map((l) => [l.path, l]));

export function getLocale(path: string) {
  return LOCALE_MAP.get(path);
}

export function getLocaleTemplate(localePath: string, slug: string) {
  return getLocale(localePath)?.templates.find((t) => t.slug === slug);
}

/** Every locale that publishes a page equivalent to the given global slug. */
export function alternatesFor(equivalent: string) {
  return LOCALES.flatMap((l) =>
    l.templates
      .filter((t) => t.equivalent === equivalent)
      .map((t) => ({ hreflang: l.hreflang, href: `/${l.path}/${t.slug}` }))
  );
}
