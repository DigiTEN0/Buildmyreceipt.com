import type { TemplateDef } from "./types";

/**
 * Template registry. Each entry powers three things:
 *  1. a preset in the generator
 *  2. a statically generated /templates/[slug] page
 *  3. an entry in the sitemap and the templates index
 *
 * Business names in every seed are fictional. Do not add real third-party
 * brand names, logos or marks to this file.
 */
export const TEMPLATES: TemplateDef[] = [
  {
    slug: "restaurant-receipt",
    name: "Restaurant Receipt",
    h1: "Restaurant Receipt Generator",
    category: "Food & Drink",
    blurb: "Itemised dishes, server name, table number, tax and tip lines.",
    intent:
      "Create an itemised restaurant or cafe receipt with dishes, subtotal, sales tax, tip line and payment details.",
    sections: [
      {
        heading: "What a restaurant receipt needs to show",
        body: [
          "A restaurant receipt is the customer's record of a food-service transaction, and in most jurisdictions it doubles as the diner's substantiation for a business-meal deduction. That makes the itemised detail more than a courtesy — a lump-sum total with no breakdown is frequently rejected by expense systems and by tax authorities that want to see what was actually purchased.",
          "At minimum the document should carry the restaurant's trading name and address, the date and time of service, a line for each dish or drink with its quantity and price, the subtotal before tax, the tax charged, any gratuity, and the final amount tendered along with how it was paid.",
        ],
      },
      {
        heading: "Tips, service charges and tax",
        body: [
          "Gratuity and service charge are treated differently almost everywhere. A voluntary tip added by the customer is generally outside the tax base, while a mandatory service charge applied by the venue is usually part of the taxable supply. If your venue applies an automatic gratuity to large parties, show it as its own line so the distinction is visible on the face of the document.",
          "Sales tax is normally calculated on the food and beverage subtotal after discounts and before any voluntary tip. The generator follows that order by default: subtotal, less discount, plus tax, plus tip.",
        ],
      },
      {
        heading: "Practical notes",
        body: [
          "Most restaurant point-of-sale systems print on 80mm thermal stock, which is why the default paper width here is 80mm. Cafes and bars using compact printers often run 58mm — switch the paper size and the layout reflows to the narrower column count.",
          "If you are reissuing a receipt for a meal that has already been served, set the date and time to the original service rather than today. Backdating the document to match the actual transaction is what makes it an accurate record.",
        ],
      },
    ],
    fields: [
      "Restaurant name and address",
      "Server / table number",
      "Itemised dishes with quantities",
      "Subtotal, tax, tip",
      "Payment method and card last four",
    ],
    faqs: [
      {
        q: "Should the tip be included before or after tax?",
        a: "Tax is calculated on the food and beverage subtotal. A voluntary tip is added after tax and is not itself taxed in most jurisdictions.",
      },
      {
        q: "What paper size do restaurants use?",
        a: "80mm is the standard for table-service venues. Bars and coffee shops with compact printers frequently use 58mm.",
      },
      {
        q: "Can I add a server name and table number?",
        a: "Yes. The cashier field prints as the server name, and the register field prints as the table number on this template.",
      },
    ],
    related: ["cafe-receipt", "bar-receipt", "food-delivery-receipt", "itemized-receipt"],
    seed: {
      style: "restaurant",
      paper: "80mm",
      business: {
        name: "The Copper Table",
        address: "418 Prospect Avenue",
        cityLine: "Portland, OR 97205",
        phone: "(503) 555-0142",
        website: "coppertable.example",
        taxId: "",
        logo: null,
      },
      taxRate: 8.5,
      taxLabel: "Sales Tax",
      showTip: true,
      tipRate: 18,
      meta: {
        date: "",
        time: "",
        cashier: "Daniel R.",
        transactionId: "",
        register: "TABLE 14",
        storeNumber: "",
      },
      items: [
        { id: "1", qty: 2, name: "Roasted Chicken", price: 24.0 },
        { id: "2", qty: 1, name: "Caesar Salad", price: 11.5 },
        { id: "3", qty: 3, name: "House Red — Glass", price: 9.0 },
        { id: "4", qty: 1, name: "Chocolate Torte", price: 8.5 },
      ],
      footer: {
        headline: "THANK YOU FOR DINING WITH US",
        lines: ["Reservations at coppertable.example", "Follow us @coppertable"],
        showBarcode: false,
        showSurvey: true,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "grocery-receipt",
    name: "Grocery Receipt",
    h1: "Grocery Store Receipt Generator",
    category: "Retail",
    blurb: "Long itemised list, unit pricing, savings line and barcode.",
    intent:
      "Generate a supermarket or grocery store receipt with itemised products, unit quantities, tax and a savings total.",
    sections: [
      {
        heading: "How grocery receipts are structured",
        body: [
          "Supermarket receipts are the densest format in everyday retail. They carry a long item list, mixed tax treatment across categories, loyalty discounts, and a summary block that often includes a running savings total for the visit.",
          "The structural quirk that matters most is mixed taxability. In many jurisdictions unprepared food is zero-rated or exempt while household goods, prepared foods and beverages are standard-rated. A real grocery receipt reflects that with per-line tax flags; this generator applies a single blended rate to the basket, which is appropriate for most record-keeping purposes.",
        ],
      },
      {
        heading: "Quantities and unit pricing",
        body: [
          "Grocery lines come in two shapes: count items, priced per unit and multiplied by quantity, and weighed items, priced per kilogram or pound with the measured weight shown. Enter weighed goods by putting the measured amount in the quantity column and the per-unit price alongside it — the line total calculates the same way.",
          "The savings line is a marketing convention rather than an accounting one. It summarises the difference between shelf price and loyalty price across the basket and has no effect on the amount actually charged.",
        ],
      },
      {
        heading: "Paper and layout",
        body: [
          "Grocery chains print on 80mm thermal roll almost universally, and long baskets produce genuinely long documents. The preview scrolls, and the exported PNG or PDF captures the full length of the receipt rather than cropping it.",
          "The barcode block at the foot of a supermarket receipt encodes the transaction number for returns lookup. Enable it under footer options if you want the document to carry one.",
        ],
      },
    ],
    fields: [
      "Store name, address and store number",
      "Cashier, register and transaction number",
      "Itemised products with quantities",
      "Subtotal, tax, total savings",
      "Payment method and approval code",
    ],
    faqs: [
      {
        q: "Why do some grocery items get taxed and others don't?",
        a: "Most jurisdictions zero-rate or exempt unprepared food while taxing household goods and prepared items. This generator applies one blended rate across the basket.",
      },
      {
        q: "How do I add items sold by weight?",
        a: "Put the measured weight in the quantity field and the per-kilogram or per-pound price in the price field.",
      },
      {
        q: "Can I show a savings total?",
        a: "Yes — enable the savings line in footer options and enter the amount.",
      },
    ],
    related: ["retail-receipt", "itemized-receipt", "convenience-store-receipt", "pharmacy-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Fairmount Market",
        address: "2847 Main Street",
        cityLine: "Springfield, IL 62704",
        phone: "(217) 555-0198",
        website: "fairmountmarket.example",
        taxId: "",
        logo: null,
      },
      taxRate: 6.25,
      taxLabel: "Tax",
      meta: {
        date: "",
        time: "",
        cashier: "Maria G.",
        transactionId: "",
        register: "3",
        storeNumber: "1842",
      },
      items: [
        { id: "1", qty: 2, name: "Milk 2% Gallon", price: 2.99 },
        { id: "2", qty: 1, name: "White Bread", price: 1.29 },
        { id: "3", qty: 3, name: "Bananas lb", price: 0.49 },
        { id: "4", qty: 1, name: "Ground Beef 80/20", price: 4.99 },
        { id: "5", qty: 2, name: "Pasta Sauce", price: 1.79 },
        { id: "6", qty: 1, name: "Eggs Large Dozen", price: 2.79 },
        { id: "7", qty: 1, name: "Shredded Cheese", price: 3.49 },
        { id: "8", qty: 2, name: "Paper Towels", price: 3.99 },
        { id: "9", qty: 1, name: "Orange Juice 64oz", price: 2.99 },
      ],
      footer: {
        headline: "THANK YOU FOR SHOPPING WITH US",
        lines: ["Save more. Live better.", "Visit us at fairmountmarket.example"],
        showBarcode: true,
        showSurvey: false,
        showSavings: true,
        savings: 8.47,
      },
    },
  },

  {
    slug: "gas-station-receipt",
    name: "Gas Station Receipt",
    h1: "Gas & Fuel Receipt Generator",
    category: "Transport",
    blurb: "Pump number, grade, gallons or litres, price per unit.",
    intent:
      "Create a fuel receipt showing pump number, fuel grade, volume dispensed, price per gallon or litre and total.",
    sections: [
      {
        heading: "What makes a fuel receipt different",
        body: [
          "A fuel receipt is a volume document rather than a line-item document. The transaction is a single product sold by measured quantity, so the detail that matters is the pump, the grade, the volume dispensed and the unit price — not a list of goods.",
          "This matters for mileage and fuel-expense claims. Reimbursement schemes and tax authorities that allow actual-cost fuel deduction generally want to see litres or gallons and the unit rate, because that is what lets them sanity-check the claim against the vehicle and the distance.",
        ],
      },
      {
        heading: "Volume, grade and unit price",
        body: [
          "Enter the volume dispensed in the quantity field and the price per gallon or litre in the price field. The line total is the amount charged, which is how forecourt printers present it.",
          "Fuel duty and sales tax are usually already embedded in the pump price rather than added at the till, which is why fuel receipts typically show a total that matches volume times unit price exactly. If your jurisdiction adds tax separately, set a tax rate and it will be shown as its own line.",
        ],
      },
      {
        heading: "Pump and station detail",
        body: [
          "The register field prints as the pump number on this template and the store number field prints as the site number. Both appear on essentially every forecourt receipt and both are what a fleet administrator looks for when reconciling fuel cards.",
          "Use generic station naming. This generator does not include fuel brand marks or logos, and you should not add them — a fuel receipt carrying a real brand's mark is a different kind of document altogether.",
        ],
      },
    ],
    fields: [
      "Station name, address and site number",
      "Pump number and fuel grade",
      "Volume in gallons or litres",
      "Price per unit and total",
      "Payment method and card last four",
    ],
    faqs: [
      {
        q: "How do I enter gallons or litres?",
        a: "Put the volume dispensed in the quantity field and the price per gallon or litre in the price field.",
      },
      {
        q: "Should fuel tax show as a separate line?",
        a: "Usually not — fuel duty and tax are normally embedded in the pump price. Leave the tax rate at zero unless your jurisdiction adds it at the till.",
      },
      {
        q: "Can I show the pump number?",
        a: "Yes. The register field prints as the pump number on this template.",
      },
    ],
    related: ["taxi-receipt", "parking-receipt", "toll-receipt", "car-repair-receipt"],
    seed: {
      style: "fuel",
      paper: "58mm",
      business: {
        name: "Ridgeway Fuel Stop",
        address: "1100 Interstate Access Rd",
        cityLine: "Amarillo, TX 79109",
        phone: "(806) 555-0117",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [{ id: "1", qty: 14.226, name: "Unleaded 87 — Gal", price: 3.149 }],
      meta: {
        date: "",
        time: "",
        cashier: "SELF SERVE",
        transactionId: "",
        register: "PUMP 06",
        storeNumber: "SITE 2214",
      },
      footer: {
        headline: "THANK YOU — DRIVE SAFELY",
        lines: ["Keep this receipt for your records"],
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
    h1: "Rent Receipt Generator",
    category: "Property",
    blurb: "Tenant, property address, rental period, amount and landlord signature line.",
    intent:
      "Generate a rent receipt showing tenant name, property address, the rental period covered, amount paid and payment method.",
    sections: [
      {
        heading: "Why rent receipts get requested",
        body: [
          "A rent receipt is the tenant's proof that a specific month's rent was paid, and it is one of the few receipt types that is frequently a legal requirement rather than a courtesy. Many jurisdictions oblige a landlord to issue one on request, and some require it automatically for any payment made in cash.",
          "Tenants need them for three common reasons: claiming a rent-based tax relief or housing allowance, evidencing payment history in a dispute or a subsequent tenancy application, and substantiating a home-office deduction where part of the property is used for business.",
        ],
      },
      {
        heading: "What to put on it",
        body: [
          "The document should identify the landlord or agent issuing it, the tenant paying, and the property the payment relates to. It must state the amount, the date the payment was received, and — critically — the period the payment covers, because a rent receipt without a period is ambiguous about which month it discharges.",
          "Where a tax relief is being claimed, the landlord's tax reference is often required on the receipt. The tax ID field prints in the header block for exactly this purpose. In India, for example, a landlord's PAN is generally needed on rent receipts supporting an HRA claim above the annual threshold.",
        ],
      },
      {
        heading: "Format and signature",
        body: [
          "Rent receipts are not thermal documents — they are usually issued on A4 or letter paper, which is why this template defaults to A4 and uses the plain layout rather than the monospace till style.",
          "A signature line is conventional and in some jurisdictions expected. Add it as a footer line, or sign the printed document by hand after downloading the PDF.",
        ],
      },
    ],
    fields: [
      "Landlord or agent name and address",
      "Tenant name",
      "Property address",
      "Rental period covered",
      "Amount, date received and payment method",
    ],
    faqs: [
      {
        q: "Does a rent receipt need the landlord's tax number?",
        a: "It depends on the jurisdiction and the relief being claimed. Where it is required, use the tax ID field — it prints in the header block.",
      },
      {
        q: "What period should the receipt cover?",
        a: "State the exact rental period the payment discharges, not just the date it was received. A receipt without a period is ambiguous.",
      },
      {
        q: "Is a signature required?",
        a: "Conventional, and expected in some jurisdictions. Add a signature line in the footer and sign the printed PDF.",
      },
    ],
    related: ["cash-receipt", "deposit-receipt", "invoice-receipt", "donation-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Hollis Property Management",
        address: "17 Wexford Lane, Suite 4",
        cityLine: "Boston, MA 02116",
        phone: "(617) 555-0163",
        website: "",
        taxId: "TAX ID 04-3388215",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [{ id: "1", qty: 1, name: "Rent — Unit 3B, 88 Aldrich St (Mar 1–31)", price: 2150.0 }],
      footer: {
        headline: "RECEIVED WITH THANKS",
        lines: ["Received by: ______________________", "Hollis Property Management"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "taxi-receipt",
    name: "Taxi & Rideshare Receipt",
    h1: "Taxi & Rideshare Receipt Generator",
    category: "Transport",
    blurb: "Pickup and dropoff, distance, fare breakdown, driver and vehicle.",
    intent:
      "Create a taxi, cab or private hire receipt with pickup and dropoff, distance, fare breakdown and total.",
    sections: [
      {
        heading: "Fare breakdown is the point",
        body: [
          "A ride receipt exists to justify a fare, so the breakdown carries the weight: the base or flag-drop charge, the distance component, any time-based waiting charge, tolls passed through, booking or airport fees, and the tip.",
          "Expense systems reimbursing ground transport almost always want the pickup and dropoff points, because that is what establishes the journey was business-related. Put them on the document rather than leaving them to a separate claim note.",
        ],
      },
      {
        heading: "Building the fare",
        body: [
          "Enter each fare component as its own line. A typical structure is a base fare, a distance charge expressed as miles or kilometres at a per-unit rate, a time charge in minutes, then tolls and fees as flat lines.",
          "Tolls are a pass-through rather than a service the operator supplies, so in many tax regimes they are outside the taxable amount for the ride. If that applies where you operate, keep them separated on the face of the document.",
        ],
      },
      {
        heading: "Driver and vehicle detail",
        body: [
          "Licensed taxi receipts generally carry the driver's badge or licence number and the vehicle's plate or medallion. The cashier field prints as the driver reference and the register field as the vehicle reference on this template.",
          "Private hire and rideshare receipts are usually emailed rather than printed, so the A4 layout is often more faithful than the thermal roll. Switch paper size depending on which you are reproducing.",
        ],
      },
    ],
    fields: [
      "Operator name and licence details",
      "Driver and vehicle reference",
      "Pickup and dropoff",
      "Base fare, distance, time, tolls",
      "Tip and total",
    ],
    faqs: [
      {
        q: "How do I show distance on the fare?",
        a: "Add a line with the distance in the quantity field and the per-mile or per-kilometre rate in the price field.",
      },
      {
        q: "Should tolls be taxed?",
        a: "Tolls are usually a pass-through rather than part of the taxable service. Keep them on a separate line.",
      },
      {
        q: "Where do pickup and dropoff go?",
        a: "Add them as footer lines, or as descriptive line items above the fare components.",
      },
    ],
    related: ["gas-station-receipt", "parking-receipt", "toll-receipt", "bus-train-receipt"],
    seed: {
      style: "transport",
      paper: "58mm",
      business: {
        name: "Metro Cab Co-op",
        address: "Dispatch 24/7",
        cityLine: "Chicago, IL 60607",
        phone: "(312) 555-0186",
        website: "",
        taxId: "LIC 88-2214",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      showTip: true,
      tipRate: 15,
      items: [
        { id: "1", qty: 1, name: "Base Fare", price: 3.25 },
        { id: "2", qty: 7.4, name: "Distance — mi @ 2.25", price: 2.25 },
        { id: "3", qty: 6, name: "Time — min @ 0.35", price: 0.35 },
        { id: "4", qty: 1, name: "Airport Surcharge", price: 4.0 },
      ],
      meta: {
        date: "",
        time: "",
        cashier: "DRIVER 4471",
        transactionId: "",
        register: "CAB 208",
        storeNumber: "",
      },
      footer: {
        headline: "THANK YOU FOR RIDING",
        lines: ["Pickup: O'Hare Terminal 2", "Dropoff: 900 N Michigan Ave"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "hotel-receipt",
    name: "Hotel Receipt",
    h1: "Hotel & Lodging Receipt Generator",
    category: "Travel",
    blurb: "Guest name, check-in and check-out, nightly rate, room charges and taxes.",
    intent:
      "Generate a hotel folio or lodging receipt with guest details, stay dates, nightly rate, incidentals and occupancy taxes.",
    sections: [
      {
        heading: "A folio, not a till receipt",
        body: [
          "Hotel documentation is a folio: a running account of everything charged to a room across a stay, closed out at check-out. That is structurally different from a single-transaction till receipt, and it is why lodging receipts are longer and almost always printed on A4 or letter rather than thermal roll.",
          "The folio should show the guest name, the room, the arrival and departure dates, the nightly rate, each incidental charge dated to the night it was incurred, and the tax breakdown.",
        ],
      },
      {
        heading: "Occupancy taxes are not sales tax",
        body: [
          "Lodging is one of the most heavily and inconsistently taxed categories there is. A stay commonly attracts a state or national sales tax, a separate transient occupancy or city tourist tax, and sometimes a flat per-night destination or resort fee that is itself taxable.",
          "Because these stack differently by city, the generator gives you one tax rate plus free-form line items. The usual approach is to enter room nights as line items, add resort or destination fees as their own lines, and set the tax rate to the combined effective rate for the property's location.",
        ],
      },
      {
        heading: "Room nights and incidentals",
        body: [
          "Enter the stay as a quantity of nights at the nightly rate — four nights at 189.00 rather than a single line for 756.00. Expense systems and finance teams check rate against policy caps, and they cannot do that from a lump sum.",
          "Incidentals such as parking, breakfast, minibar or laundry go on separate lines. Keeping them distinct matters because many corporate travel policies reimburse the room and tax but not incidentals.",
        ],
      },
    ],
    fields: [
      "Property name and address",
      "Guest name and room number",
      "Check-in and check-out dates",
      "Nightly rate and number of nights",
      "Incidentals, resort fees and occupancy tax",
    ],
    faqs: [
      {
        q: "How should I enter a multi-night stay?",
        a: "As a quantity of nights at the nightly rate. Finance teams check the rate against policy caps and cannot do that from a lump sum.",
      },
      {
        q: "What about resort or destination fees?",
        a: "Add them as their own line items. They are usually taxable, so they sit inside the tax base.",
      },
      {
        q: "Why is this A4 rather than thermal?",
        a: "Hotel folios are printed on letter or A4 at check-out, not on till roll.",
      },
    ],
    related: ["restaurant-receipt", "taxi-receipt", "parking-receipt", "invoice-receipt"],
    seed: {
      style: "lodging",
      paper: "a4",
      business: {
        name: "The Arbor House Hotel",
        address: "612 Lakeshore Drive",
        cityLine: "Burlington, VT 05401",
        phone: "(802) 555-0134",
        website: "arborhousehotel.example",
        taxId: "",
        logo: null,
      },
      taxRate: 11.0,
      taxLabel: "Occupancy Tax",
      items: [
        { id: "1", qty: 4, name: "Deluxe King — Night", price: 189.0 },
        { id: "2", qty: 4, name: "Destination Fee", price: 24.0 },
        { id: "3", qty: 2, name: "Valet Parking — Night", price: 32.0 },
        { id: "4", qty: 1, name: "Room Service — 14 Mar", price: 46.5 },
      ],
      meta: {
        date: "",
        time: "",
        cashier: "FRONT DESK",
        transactionId: "",
        register: "ROOM 412",
        storeNumber: "",
      },
      footer: {
        headline: "THANK YOU FOR STAYING WITH US",
        lines: ["Check-in: 12 Mar   Check-out: 16 Mar", "Guest: A. Reyes"],
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
    h1: "Cash Receipt Generator",
    category: "General",
    blurb: "Simple proof of a cash payment — amount, purpose, payer and payee.",
    intent:
      "Create a cash receipt recording who paid, who received, how much, what for and when.",
    sections: [
      {
        heading: "The document that matters most",
        body: [
          "Cash is the only payment method that leaves no independent trail. There is no card statement, no bank record, no processor log — if the receipt does not exist, the payment effectively did not happen from an evidentiary standpoint. That makes the cash receipt the single most consequential document in this whole category.",
          "For anyone running a cash-taking business, issuing one on every transaction is not administrative overhead. It is the entire basis on which your declared income can later be reconciled.",
        ],
      },
      {
        heading: "The five things it must state",
        body: [
          "A cash receipt needs to answer five questions unambiguously: who paid, who received, how much, what it was for, and on what date. Anything less and the document cannot do its job in a dispute or an audit.",
          "Sequential numbering matters more than people expect. A numbered series lets you demonstrate completeness — that receipts 1 through 240 exist with none missing — which is exactly what an auditor examining a cash business looks for. Use the transaction number field and keep the sequence unbroken.",
        ],
      },
      {
        heading: "Change tendered",
        body: [
          "Where the customer hands over more than the amount due, show the amount tendered and the change given. The generator has a change-due field for this, and it prints below the total.",
          "Keep your own copy. The traditional carbon duplicate book exists because both sides need the record; if you are issuing digitally, retain the PDF against the same sequence number.",
        ],
      },
    ],
    fields: [
      "Payee name and address",
      "Payer name",
      "Amount received",
      "What the payment was for",
      "Receipt number and date",
    ],
    faqs: [
      {
        q: "Why does receipt numbering matter?",
        a: "A continuous sequence lets you demonstrate completeness. Gaps in a numbered series are exactly what an auditor looks for in a cash business.",
      },
      {
        q: "How do I show change given?",
        a: "Enter the amount handed over in the change-due field. It prints below the total.",
      },
      {
        q: "Do I need to keep a copy?",
        a: "Yes. Both sides need the record — that is why carbon duplicate books exist. Retain the PDF against the same sequence number.",
      },
    ],
    related: ["rent-receipt", "invoice-receipt", "deposit-receipt", "handyman-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Marek Landscaping",
        address: "94 Birchwood Road",
        cityLine: "Asheville, NC 28801",
        phone: "(828) 555-0179",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [{ id: "1", qty: 1, name: "Yard clearance and hedge trimming", price: 340.0 }],
      payment: { method: "Cash", last4: "", approvalCode: "", changeDue: 10.0 },
      footer: {
        headline: "PAID IN FULL — THANK YOU",
        lines: ["Received from: J. Whitfield", "Received by: ______________________"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "parking-receipt",
    name: "Parking Receipt",
    h1: "Parking Receipt Generator",
    category: "Transport",
    blurb: "Entry and exit times, duration, bay or level, rate and total.",
    intent:
      "Create a parking receipt showing entry and exit time, duration parked, tariff and amount paid.",
    sections: [
      {
        heading: "Duration is the product",
        body: [
          "A parking receipt records time occupied rather than goods supplied. The meaningful fields are the entry timestamp, the exit timestamp, the elapsed duration and the tariff applied to it.",
          "That structure is what mileage and travel-expense reviewers check against the rest of a claim — a parking receipt whose window does not overlap the meeting it was claimed for is the most common reason a ground-travel expense gets queried.",
        ],
      },
      {
        heading: "Tariffs and daily maximums",
        body: [
          "Most car parks operate a stepped tariff: a rate for the first hour, a different rate for subsequent hours, and a daily cap. Enter the applicable band as a line item with hours in the quantity field and the hourly rate in the price field, then add the cap adjustment as a discount if the cap applied.",
          "Season tickets, resident permits and validated parking are usually shown as a discount line against the gross tariff rather than as a reduced rate, because the operator still needs the gross figure for reconciliation.",
        ],
      },
      {
        heading: "Location detail",
        body: [
          "The register field prints as the bay or level and the store number field prints as the facility reference. Both are worth completing on multi-storey and multi-site operations because they are what a dispute over a ticket is resolved against.",
          "Parking machines print on narrow thermal stock, so this template defaults to 58mm.",
        ],
      },
    ],
    fields: [
      "Facility name, address and site reference",
      "Entry and exit times",
      "Duration and bay or level",
      "Tariff and any validation discount",
      "Payment method",
    ],
    faqs: [
      {
        q: "How do I show entry and exit times?",
        a: "Add them as footer lines. The date and time fields record when the ticket was issued.",
      },
      {
        q: "What if a daily cap applied?",
        a: "Enter the hours at the hourly rate, then use the discount field for the cap adjustment so the gross tariff stays visible.",
      },
      {
        q: "Where does the bay number go?",
        a: "The register field prints as the bay or level on this template.",
      },
    ],
    related: ["taxi-receipt", "gas-station-receipt", "toll-receipt", "car-repair-receipt"],
    seed: {
      style: "transport",
      paper: "58mm",
      business: {
        name: "Central Plaza Parking",
        address: "230 W Adams Street",
        cityLine: "Denver, CO 80202",
        phone: "",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [{ id: "1", qty: 3, name: "Standard Tariff — hr @ 4.50", price: 4.5 }],
      meta: {
        date: "",
        time: "",
        cashier: "AUTO PAY",
        transactionId: "",
        register: "LEVEL 3 / BAY 118",
        storeNumber: "SITE 07",
      },
      footer: {
        headline: "RETAIN FOR EXIT",
        lines: ["Entry 09:14   Exit 12:22", "Duration 3h 08m"],
        showBarcode: true,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "itemized-receipt",
    name: "Itemized Receipt",
    h1: "Itemized Receipt Generator",
    category: "General",
    blurb: "Full line-by-line breakdown with quantities, unit prices and tax.",
    intent:
      "Create a fully itemised receipt with a line for every product or service, quantities, unit prices, subtotal and tax.",
    sections: [
      {
        heading: "Why 'itemised' is a specific request",
        body: [
          "When a finance team, insurer or tax authority asks for an itemised receipt, they are rejecting a summary. A card slip showing only a total proves a payment was made but says nothing about what was bought — and what was bought is what determines whether it is deductible, reimbursable or covered.",
          "The distinction comes up constantly in three places: business meal deductions, medical and insurance claims, and corporate expense policies that exclude certain categories. In all three the itemised document is the one that gets accepted.",
        ],
      },
      {
        heading: "What counts as properly itemised",
        body: [
          "Each line needs a description specific enough to identify what was supplied, the quantity, the unit price and the extended line total. A line reading 'merchandise 84.00' is not itemised; four lines identifying the goods are.",
          "The document also needs the arithmetic to be visible and correct: lines summing to a subtotal, discounts applied, tax calculated on the discounted subtotal, and a final total. Reviewers do check the arithmetic, and a document that does not add up is worse than no document.",
        ],
      },
      {
        heading: "Using this template",
        body: [
          "This is the most general-purpose layout in the library. It carries no industry-specific fields, which makes it appropriate whenever the transaction does not fit a category or when you want the plainest possible presentation.",
          "Switch the paper size to A4 for an emailed or filed document, or to 80mm if you are reproducing something that came off a till.",
        ],
      },
    ],
    fields: [
      "Business name and contact details",
      "Line-by-line description, quantity, unit price",
      "Subtotal and discount",
      "Tax rate and tax amount",
      "Total and payment method",
    ],
    faqs: [
      {
        q: "What makes a receipt 'itemised'?",
        a: "Each line identifies what was supplied with its quantity and unit price. A single 'merchandise' line with a total is not itemised.",
      },
      {
        q: "In what order should discount and tax apply?",
        a: "Discount comes off the subtotal first, then tax is calculated on the discounted amount. That is the order this generator uses.",
      },
      {
        q: "Why do reviewers reject summary receipts?",
        a: "A total proves payment but not what was bought, and what was bought determines whether it is deductible, reimbursable or covered.",
      },
    ],
    related: ["retail-receipt", "grocery-receipt", "invoice-receipt", "service-receipt"],
    seed: {
      style: "thermal",
      paper: "80mm",
      business: {
        name: "Northgate Supply Co.",
        address: "77 Warehouse Row",
        cityLine: "Columbus, OH 43215",
        phone: "(614) 555-0125",
        website: "northgatesupply.example",
        taxId: "",
        logo: null,
      },
      taxRate: 7.5,
      taxLabel: "Sales Tax",
      items: [
        { id: "1", qty: 4, name: "Cable Ties 200mm — Pk 100", price: 6.4 },
        { id: "2", qty: 2, name: "Nitrile Gloves — Box 50", price: 12.95 },
        { id: "3", qty: 1, name: "Utility Knife", price: 9.5 },
        { id: "4", qty: 6, name: "Marker Pen Black", price: 1.75 },
      ],
      footer: {
        headline: "THANK YOU FOR YOUR BUSINESS",
        lines: ["Returns within 30 days with receipt"],
        showBarcode: true,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "invoice-receipt",
    name: "Paid Invoice Receipt",
    h1: "Paid Invoice Receipt Generator",
    category: "Business",
    blurb: "Invoice-style layout marked paid, with reference, terms and payment record.",
    intent:
      "Generate a paid invoice receipt confirming an invoice has been settled, with reference number, amount and payment method.",
    sections: [
      {
        heading: "Invoice and receipt do different jobs",
        body: [
          "An invoice is a demand for payment. A receipt is confirmation that payment was made. They are different documents at different points in the transaction, and conflating them causes real problems in bookkeeping — an unpaid invoice sitting in a records folder looks identical to a paid one unless something marks the settlement.",
          "This template produces the second document: a record that a specific invoice has been discharged, referencing the original invoice number so the two can be matched.",
        ],
      },
      {
        heading: "What to reference",
        body: [
          "Always carry the original invoice number. Without it the receipt cannot be reconciled against the ledger and the client's accounts payable team cannot close the item.",
          "State the payment method and date received. Where the payment settles only part of an invoice, show the amount paid and the balance remaining as separate lines — a receipt that implies full settlement of a partly-paid invoice will cause a dispute later.",
        ],
      },
      {
        heading: "Tax on the receipt",
        body: [
          "Where the original invoice charged VAT, GST or sales tax, the receipt should reflect the same breakdown. In VAT jurisdictions the tax registration number generally has to appear on the document for the customer to recover the input tax — use the tax ID field.",
          "Keep the tax figure consistent with the invoice. A receipt showing a different tax amount from the invoice it settles is a reconciliation problem for both parties.",
        ],
      },
    ],
    fields: [
      "Business name, address and tax number",
      "Client name",
      "Original invoice reference",
      "Amount paid and balance remaining",
      "Payment method and date received",
    ],
    faqs: [
      {
        q: "What is the difference between an invoice and a receipt?",
        a: "An invoice requests payment; a receipt confirms it was made. They are separate documents at different points in the transaction.",
      },
      {
        q: "Should I reference the invoice number?",
        a: "Always. Without it the receipt cannot be reconciled against the ledger.",
      },
      {
        q: "How do I record a partial payment?",
        a: "Show the amount paid and the balance remaining as separate lines so the receipt does not imply full settlement.",
      },
    ],
    related: ["cash-receipt", "service-receipt", "consulting-receipt", "rent-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Ardent Studio Ltd",
        address: "Unit 9, Fenwick Works",
        cityLine: "Manchester M4 6BU",
        phone: "+44 161 555 0142",
        website: "ardentstudio.example",
        taxId: "VAT GB 384 9917 22",
        logo: null,
      },
      currency: "GBP",
      taxRate: 20,
      taxLabel: "VAT @ 20%",
      items: [
        { id: "1", qty: 1, name: "Brand identity — Phase 2 (Inv. 2081)", price: 3400.0 },
        { id: "2", qty: 6, name: "Additional artwork — hr @ 85.00", price: 85.0 },
      ],
      payment: { method: "Bank Transfer", last4: "", approvalCode: "REF 2081", changeDue: 0 },
      footer: {
        headline: "PAID IN FULL",
        lines: ["Against Invoice 2081 dated 04 Mar", "Settled by bank transfer"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "donation-receipt",
    name: "Donation Receipt",
    h1: "Donation Receipt Generator",
    category: "Nonprofit",
    blurb: "Donor details, gift amount, charity registration and tax acknowledgement.",
    intent:
      "Create a charitable donation receipt with donor name, gift amount, charity registration number and the required tax acknowledgement wording.",
    sections: [
      {
        heading: "The wording is the whole document",
        body: [
          "A donation receipt is unusual in that its legal effect depends on specific acknowledgement language, not just on the numbers. In the United States, a written acknowledgement for a gift of $250 or more must state whether the donor received any goods or services in return, and if so, give a good-faith estimate of their value. Without that statement the donor's deduction can be denied outright regardless of the gift being genuine.",
          "Equivalent rules exist elsewhere under different names — Gift Aid declarations in the UK, official donation receipts under CRA rules in Canada, Section 80G certificates in India — each with its own mandatory wording.",
        ],
      },
      {
        heading: "What the receipt must carry",
        body: [
          "Identify the organisation by its legal name and registration or tax-exempt number, name the donor, state the gift amount and the date received, and describe non-cash gifts without assigning them a value — valuation of donated property is the donor's responsibility, not the charity's.",
          "Where nothing was given in return, say so explicitly. The conventional phrasing is that no goods or services were provided in exchange for the contribution. Where a benefit was provided — an event ticket, a dinner, merchandise — state its fair value, because only the excess above that value is deductible.",
        ],
      },
      {
        heading: "Cash versus in-kind",
        body: [
          "For cash gifts, put the amount as a line item. For in-kind gifts, describe the item in the line description and leave the value at zero, then add a footer line noting that valuation is the donor's responsibility.",
          "Quid pro quo contributions — where the donor received something back — should show the gross gift, the value of the benefit, and the deductible balance as three visible figures.",
        ],
      },
    ],
    fields: [
      "Organisation legal name and registration number",
      "Donor name and address",
      "Gift amount and date received",
      "Description of non-cash gifts",
      "Goods-or-services acknowledgement statement",
    ],
    faqs: [
      {
        q: "What wording is required on a US donation receipt?",
        a: "For gifts of $250 or more it must state whether goods or services were provided in return and, if so, give a good-faith estimate of their value.",
      },
      {
        q: "Should the charity value an in-kind donation?",
        a: "No. Describe the item; valuation is the donor's responsibility.",
      },
      {
        q: "What is a quid pro quo contribution?",
        a: "A gift where the donor received something back. Show the gross gift, the benefit value, and the deductible balance separately.",
      },
    ],
    related: ["cash-receipt", "invoice-receipt", "rent-receipt", "service-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Riverside Community Trust",
        address: "40 Canal Street",
        cityLine: "Providence, RI 02903",
        phone: "(401) 555-0158",
        website: "riversidetrust.example",
        taxId: "EIN 05-0998321 · 501(c)(3)",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [{ id: "1", qty: 1, name: "Charitable contribution — general fund", price: 500.0 }],
      payment: { method: "Check", last4: "", approvalCode: "CHK 1184", changeDue: 0 },
      footer: {
        headline: "THANK YOU FOR YOUR SUPPORT",
        lines: [
          "No goods or services were provided in",
          "exchange for this contribution.",
          "Donor: M. Okafor",
        ],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "retail-receipt",
    name: "Retail Store Receipt",
    h1: "Retail Store Receipt Generator",
    category: "Retail",
    blurb: "Store branding, SKU lines, returns policy and barcode.",
    intent:
      "Generate a retail store receipt with itemised products, SKUs, sales tax, returns policy and transaction barcode.",
    sections: [
      {
        heading: "The returns document",
        body: [
          "A retail receipt's most-used function is not accounting — it is returns. The fields that get scrutinised are the transaction number, the date, the store, and the line detail identifying which item is coming back and at what price it was sold.",
          "That is why the barcode matters. It encodes the transaction reference so a returns desk can pull the original sale rather than relying on the printed figures. Enable it in footer options for a realistic retail document.",
        ],
      },
      {
        heading: "SKUs and price lookups",
        body: [
          "Retail lines usually carry a SKU or PLU alongside the description. Include it in the line description — the format most chains use is the code followed by the item name.",
          "Where an item was discounted at the register, retail convention is to show the full price on the item line and the reduction as its own negative or discount line, so the original price stays visible for returns valuation.",
        ],
      },
      {
        heading: "Returns policy text",
        body: [
          "Most retail receipts carry the returns window and conditions in the footer, because printing it on the document is how the policy is communicated at the point of sale in many jurisdictions.",
          "Use the footer lines for this. Keep it short — thermal receipts wrap awkwardly and a policy that runs to five lines on an 80mm roll becomes unreadable.",
        ],
      },
    ],
    fields: [
      "Store name, address and store number",
      "Cashier, register and transaction number",
      "SKU, description, quantity, price",
      "Subtotal, discount, sales tax",
      "Returns policy and barcode",
    ],
    faqs: [
      {
        q: "Should I show SKUs?",
        a: "Retail convention is to include the SKU or PLU before the item name in the line description.",
      },
      {
        q: "How should register discounts appear?",
        a: "Show the full price on the item line and the reduction separately, so the original price stays visible for returns valuation.",
      },
      {
        q: "What does the barcode encode?",
        a: "The transaction reference, so a returns desk can pull the original sale.",
      },
    ],
    related: ["grocery-receipt", "itemized-receipt", "clothing-receipt", "electronics-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Halden & Co.",
        address: "155 Beacon Street",
        cityLine: "Seattle, WA 98101",
        phone: "(206) 555-0193",
        website: "haldenco.example",
        taxId: "",
        logo: null,
      },
      taxRate: 10.25,
      taxLabel: "Sales Tax",
      items: [
        { id: "1", qty: 1, name: "4471 Merino Crew Sweater", price: 89.0 },
        { id: "2", qty: 2, name: "2208 Cotton Socks 3pk", price: 14.0 },
        { id: "3", qty: 1, name: "9910 Leather Belt", price: 45.0 },
      ],
      footer: {
        headline: "THANK YOU FOR SHOPPING WITH US",
        lines: ["Returns within 30 days with receipt", "haldenco.example/returns"],
        showBarcode: true,
        showSurvey: true,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "car-repair-receipt",
    name: "Auto Repair Receipt",
    h1: "Auto Repair Receipt Generator",
    category: "Services",
    blurb: "Vehicle details, parts and labour split, shop rate and warranty note.",
    intent:
      "Create an auto repair receipt separating parts and labour, with vehicle details, shop rate and warranty terms.",
    sections: [
      {
        heading: "Parts and labour are taxed differently",
        body: [
          "The defining feature of a repair receipt is the split between parts supplied and labour performed. In many jurisdictions parts are taxable goods while labour is either exempt or taxed at a different rate, so a repair document that lumps them together is genuinely incorrect rather than merely vague.",
          "It also matters commercially: parts usually carry a manufacturer warranty and labour carries the shop's own guarantee, and a customer cannot exercise either without the split being visible.",
        ],
      },
      {
        heading: "Vehicle identification",
        body: [
          "Repair documentation should identify the vehicle by make, model, registration or plate, and mileage at the time of service. Mileage is what establishes the service interval for warranty purposes and what a subsequent buyer checks against the service history.",
          "The register field prints as the vehicle reference and the store number field as the work order number on this template.",
        ],
      },
      {
        heading: "Labour hours and shop rate",
        body: [
          "Enter labour as hours in the quantity field at the shop's hourly rate. Where a job is billed at book time rather than actual time, that is still the figure to show — book hours at the shop rate is the standard billing basis.",
          "Shop supplies and environmental disposal fees are conventionally separate lines rather than being folded into labour, because they are frequently capped by regulation as a percentage of the labour charge.",
        ],
      },
    ],
    fields: [
      "Shop name, address and work order number",
      "Vehicle make, model, plate and mileage",
      "Parts supplied with quantities",
      "Labour hours at shop rate",
      "Shop supplies, disposal fees, warranty terms",
    ],
    faqs: [
      {
        q: "Why separate parts from labour?",
        a: "They are often taxed differently, and parts and labour carry different warranties that the customer cannot exercise without the split being visible.",
      },
      {
        q: "Should I record mileage?",
        a: "Yes. It establishes the service interval for warranty purposes and forms part of the service history.",
      },
      {
        q: "How do I bill labour?",
        a: "Hours in the quantity field at the shop's hourly rate — book hours where the job is billed at book time.",
      },
    ],
    related: ["gas-station-receipt", "service-receipt", "handyman-receipt", "towing-receipt"],
    seed: {
      style: "service",
      paper: "a4",
      business: {
        name: "Kessler Auto Works",
        address: "1420 Industrial Parkway",
        cityLine: "Toledo, OH 43604",
        phone: "(419) 555-0171",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 7.25,
      taxLabel: "Tax (parts)",
      items: [
        { id: "1", qty: 1, name: "PARTS — Brake pad set, front", price: 78.4 },
        { id: "2", qty: 2, name: "PARTS — Brake rotor", price: 64.0 },
        { id: "3", qty: 2.5, name: "LABOUR — hr @ 118.00", price: 118.0 },
        { id: "4", qty: 1, name: "Shop supplies", price: 14.5 },
      ],
      meta: {
        date: "",
        time: "",
        cashier: "TECH 12",
        transactionId: "",
        register: "PLATE 8KJ-4471",
        storeNumber: "WO 20841",
      },
      footer: {
        headline: "WORK COMPLETED",
        lines: ["2018 Sedan · Mileage 84,220", "Parts 12mo warranty · Labour 90 days"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "service-receipt",
    name: "Service Receipt",
    h1: "Service Receipt Generator",
    category: "Services",
    blurb: "Hourly or fixed-fee services, description of work and payment record.",
    intent:
      "Create a receipt for services rendered, with a description of work performed, hours or fixed fee, and payment details.",
    sections: [
      {
        heading: "Describing work, not goods",
        body: [
          "Service receipts describe something that was done rather than something that was handed over, which makes the description field carry far more weight than it does in retail. 'Consulting — 6 hours' tells a reviewer almost nothing; 'Migration planning workshop and technical audit — 6 hours' tells them what was bought.",
          "This matters for deductibility. Whether a service expense is allowable often turns on its business purpose, and the purpose has to be inferable from the document.",
        ],
      },
      {
        heading: "Hourly, fixed fee and retainer",
        body: [
          "For hourly work, put hours in the quantity field and the rate in the price field. For fixed-fee work use a quantity of one and the agreed fee. For a retainer, describe the period covered in the line description — a retainer receipt without a period is ambiguous in exactly the way a rent receipt without a period is.",
          "Where a deposit was taken earlier and is being applied, show the gross fee and the deposit as a discount line so both figures remain visible.",
        ],
      },
      {
        heading: "Tax on services",
        body: [
          "Service taxability varies more than goods taxability. Some jurisdictions tax all services, some tax an enumerated list, and some exempt professional services entirely. Set the rate that applies to your service category rather than assuming the general sales tax rate applies.",
          "Where you are registered for VAT or GST, the registration number generally must appear on the document for the client to recover input tax. Use the tax ID field.",
        ],
      },
    ],
    fields: [
      "Business name, address and tax number",
      "Client name",
      "Description of work performed",
      "Hours and rate, or fixed fee",
      "Deposit applied and payment method",
    ],
    faqs: [
      {
        q: "How detailed should the work description be?",
        a: "Detailed enough that the business purpose is inferable. Deductibility often turns on purpose, and a vague description fails that test.",
      },
      {
        q: "How do I apply a deposit already paid?",
        a: "Show the gross fee, then the deposit as a discount line, so both figures stay visible.",
      },
      {
        q: "Are services always taxable?",
        a: "No — it varies widely. Some jurisdictions tax all services, some an enumerated list, some exempt professional services entirely.",
      },
    ],
    related: ["invoice-receipt", "consulting-receipt", "handyman-receipt", "cash-receipt"],
    seed: {
      style: "service",
      paper: "a4",
      business: {
        name: "Bellweather Consulting",
        address: "8 Harbour Court",
        cityLine: "Halifax, NS B3J 1P3",
        phone: "(902) 555-0148",
        website: "bellweather.example",
        taxId: "GST/HST 81992 4471 RT0001",
        logo: null,
      },
      currency: "CAD",
      taxRate: 15,
      taxLabel: "HST @ 15%",
      items: [
        { id: "1", qty: 6, name: "Migration planning workshop — hr @ 165.00", price: 165.0 },
        { id: "2", qty: 1, name: "Technical audit report", price: 850.0 },
      ],
      footer: {
        headline: "PAYMENT RECEIVED — THANK YOU",
        lines: ["Client: Northline Logistics Inc."],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "cafe-receipt",
    name: "Coffee Shop Receipt",
    h1: "Coffee Shop Receipt Generator",
    category: "Food & Drink",
    blurb: "Compact 58mm layout, drink modifiers, order number and tip line.",
    intent:
      "Create a coffee shop or cafe receipt with drinks, modifiers, order number and tip line on compact thermal paper.",
    sections: [
      {
        heading: "Compact format, modifier lines",
        body: [
          "Cafes almost universally run 58mm printers, which gives roughly 32 characters per line. That constraint shapes everything: descriptions get abbreviated, modifiers are indented under their parent drink, and the summary block is tight.",
          "This template defaults to 58mm and the condensed density setting so the output matches what a real counter printer produces.",
        ],
      },
      {
        heading: "Drinks and modifiers",
        body: [
          "The convention is a parent line for the drink at its base price, with modifiers listed underneath — extra shot, alternative milk, syrup — each carrying its own charge or showing zero where it is free.",
          "Enter modifiers as their own line items with a short description. Where the modifier is free, enter zero as the price; it still prints, which is what a customer checking their order expects to see.",
        ],
      },
      {
        heading: "Order numbers and tipping",
        body: [
          "Counter service uses an order number to call the drink, and it prints prominently. The transaction number field serves this purpose on this template.",
          "Card terminals in cafes usually prompt for a tip at the point of sale, so the tip appears on the receipt as a completed line rather than a blank for the customer to fill in. Set a tip rate to reflect that, or disable the tip line entirely for a cash counter.",
        ],
      },
    ],
    fields: [
      "Cafe name and address",
      "Order number and barista",
      "Drinks with modifiers",
      "Subtotal, tax, tip",
      "Payment method",
    ],
    faqs: [
      {
        q: "How wide is a cafe receipt?",
        a: "58mm is standard, giving roughly 32 characters per line. This template defaults to that width.",
      },
      {
        q: "How do I show drink modifiers?",
        a: "As their own line items under the parent drink. Enter zero for free modifiers — they still print.",
      },
      {
        q: "Where does the order number go?",
        a: "The transaction number field prints as the order number on this template.",
      },
    ],
    related: ["restaurant-receipt", "bar-receipt", "food-delivery-receipt", "retail-receipt"],
    seed: {
      style: "restaurant",
      paper: "58mm",
      business: {
        name: "Nine Yards Coffee",
        address: "312 Elm Street",
        cityLine: "Austin, TX 78702",
        phone: "",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 8.25,
      taxLabel: "Tax",
      showTip: true,
      tipRate: 12,
      items: [
        { id: "1", qty: 1, name: "Flat White 12oz", price: 4.75 },
        { id: "2", qty: 1, name: "  + Oat Milk", price: 0.7 },
        { id: "3", qty: 1, name: "Cold Brew 16oz", price: 5.25 },
        { id: "4", qty: 2, name: "Almond Croissant", price: 4.5 },
      ],
      options: { density: "condensed", fade: 0, curl: true, torn: true, uppercase: false },
      footer: {
        headline: "SEE YOU TOMORROW",
        lines: ["Order #148"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "handyman-receipt",
    name: "Handyman Receipt",
    h1: "Handyman & Trade Receipt Generator",
    category: "Services",
    blurb: "Materials and labour, job description, callout fee and payment record.",
    intent:
      "Create a handyman or trade receipt listing materials, labour hours, callout fee and the work performed.",
    sections: [
      {
        heading: "The cash trade problem",
        body: [
          "Trades are the category where receipt discipline matters most and happens least. A handyman, plumber, electrician or cleaner taking cash has no card statement, no processor record and often no invoicing system — the receipt is the only artefact the transaction leaves behind.",
          "For the customer it is what enables a warranty claim or an insurance claim. For the trade it is what makes declared income reconcilable. Issuing one on every job, numbered sequentially, is the cheapest bookkeeping discipline available.",
        ],
      },
      {
        heading: "Materials, labour and callout",
        body: [
          "Split materials from labour. Materials are goods you supplied and are usually taxable; labour is a service that may be taxed at a different rate or not at all. A callout or minimum-charge fee is a third category and should be its own line rather than being buried in the first hour.",
          "Where materials are marked up, the receipt shows the charged price, not your cost. That is normal and expected — the markup is part of the service.",
        ],
      },
      {
        heading: "Describing the job",
        body: [
          "Write what was actually done in enough detail that someone reading it a year later can identify the work. 'Repair' is not a description; 'Replaced kitchen mixer tap, isolated and re-sealed supply' is.",
          "This matters if the work is later disputed or if the customer claims against it. A vague description makes a warranty argument almost unwinnable for either side.",
        ],
      },
    ],
    fields: [
      "Trade name, address and contact",
      "Customer name and job address",
      "Description of work performed",
      "Materials supplied",
      "Labour hours and callout fee",
    ],
    faqs: [
      {
        q: "Should I separate materials from labour?",
        a: "Yes. They are often taxed differently, and the split is what makes a warranty claim workable.",
      },
      {
        q: "Do I show my cost or the charged price for materials?",
        a: "The charged price. Markup on materials is a normal part of the service.",
      },
      {
        q: "How detailed should the job description be?",
        a: "Detailed enough to identify the work a year later. 'Repair' is not a description.",
      },
    ],
    related: ["service-receipt", "cash-receipt", "car-repair-receipt", "cleaning-receipt"],
    seed: {
      style: "service",
      paper: "a4",
      business: {
        name: "T. Okonkwo Property Maintenance",
        address: "22 Sandhill Way",
        cityLine: "Leeds LS8 2QR",
        phone: "+44 113 555 0164",
        website: "",
        taxId: "",
        logo: null,
      },
      currency: "GBP",
      taxRate: 0,
      taxLabel: "VAT",
      items: [
        { id: "1", qty: 1, name: "Callout fee", price: 45.0 },
        { id: "2", qty: 2.5, name: "Labour — hr @ 38.00", price: 38.0 },
        { id: "3", qty: 1, name: "Materials — mixer tap and seals", price: 62.4 },
      ],
      payment: { method: "Cash", last4: "", approvalCode: "", changeDue: 0 },
      footer: {
        headline: "PAID — THANK YOU",
        lines: [
          "Replaced kitchen mixer tap, isolated",
          "and re-sealed supply. 12mo guarantee.",
        ],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "pharmacy-receipt",
    name: "Pharmacy Receipt",
    h1: "Pharmacy Receipt Generator",
    category: "Health",
    blurb: "Prescription and OTC lines, insurance contribution and patient copay.",
    intent:
      "Generate a pharmacy receipt showing prescription items, insurance contribution, patient copay and over-the-counter purchases.",
    sections: [
      {
        heading: "Two documents in one",
        body: [
          "A pharmacy receipt usually covers two different kinds of transaction at once: dispensed prescriptions, which are typically part-funded by insurance or a public scheme, and over-the-counter goods bought outright.",
          "They need to stay visually separate, because the reimbursement treatment is completely different. A health savings account or insurance claim will accept the prescription portion and reject the shampoo on the same document if the split is clear — and reject the whole thing if it is not.",
        ],
      },
      {
        heading: "Copay, plan paid and total charge",
        body: [
          "The figure the patient paid is not the price of the medicine. A proper pharmacy receipt shows the total charge, the amount the plan covered, and the patient's copay as three separate figures, because claims and HSA substantiation need the copay specifically.",
          "Enter the prescription at its full charge as a line item and the insurance contribution as a discount, which leaves the copay as the total. Add a footer line stating the plan paid amount.",
        ],
      },
      {
        heading: "Prescription detail and privacy",
        body: [
          "Dispensed items conventionally carry a prescription number, the quantity dispensed and the days supply. Include the Rx number in the line description.",
          "Be deliberate about how much clinical detail goes on a document that may be handed to an employer or an expense system. Many patients prefer a receipt that substantiates the payment without naming the medication, and a receipt showing the Rx number and charge without the drug name is generally sufficient for reimbursement.",
        ],
      },
    ],
    fields: [
      "Pharmacy name, address and phone",
      "Prescription number and days supply",
      "Total charge, plan paid, patient copay",
      "Over-the-counter items",
      "Payment method",
    ],
    faqs: [
      {
        q: "How do I show the insurance contribution?",
        a: "Enter the prescription at full charge and the plan contribution as a discount, leaving the copay as the total. Note the plan-paid amount in the footer.",
      },
      {
        q: "Do I have to name the medication?",
        a: "Not usually. The Rx number and charge are generally sufficient for reimbursement, and omitting the drug name is often preferable.",
      },
      {
        q: "Can prescriptions and OTC items go on one receipt?",
        a: "Yes, but keep them visually separate — the reimbursement treatment differs.",
      },
    ],
    related: ["grocery-receipt", "retail-receipt", "itemized-receipt", "medical-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Lindsey Street Pharmacy",
        address: "48 Lindsey Street",
        cityLine: "Kansas City, MO 64111",
        phone: "(816) 555-0129",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 4.225,
      taxLabel: "Tax (OTC only)",
      items: [
        { id: "1", qty: 1, name: "RX 4471882 — 30 day supply", price: 148.0 },
        { id: "2", qty: 1, name: "Ibuprofen 200mg 100ct", price: 8.49 },
        { id: "3", qty: 2, name: "Adhesive Bandages", price: 4.29 },
      ],
      discount: 123.0,
      footer: {
        headline: "PATIENT COPAY",
        lines: ["Plan paid: 123.00", "Questions? Speak to your pharmacist"],
        showBarcode: true,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "food-delivery-receipt",
    name: "Food Delivery Receipt",
    h1: "Food Delivery Receipt Generator",
    category: "Food & Drink",
    blurb: "Order items, delivery fee, service fee, driver tip and order reference.",
    intent:
      "Create a food delivery receipt with ordered items, delivery and service fees, driver tip and order reference number.",
    sections: [
      {
        heading: "Fees are the complicated part",
        body: [
          "A delivery receipt carries more fee lines than any other consumer document: the food subtotal, a delivery fee, a service or platform fee, sometimes a small-order surcharge, regulatory or city fees in some markets, tax, and a driver tip.",
          "Each is treated differently for tax and for reimbursement. Service fees are usually taxable, driver tips usually are not, and many corporate expense policies reimburse the food and delivery but exclude the tip and platform fee — which is only enforceable if the lines are separate.",
        ],
      },
      {
        heading: "Building the order",
        body: [
          "Enter the food items first at menu price, then each fee as its own line. Keep the tip out of the item list and use the tip setting, so it lands after tax where it belongs.",
          "Where the platform applied a promotion, show it as a discount so the gross order value stays visible — a receipt showing only the discounted total makes an expense claim impossible to verify against the order confirmation.",
        ],
      },
      {
        heading: "Order references",
        body: [
          "Delivery orders carry a reference the customer uses for support, and it is the field a finance team matches against a card statement line. Use the transaction number field.",
          "These documents are emailed rather than printed, so A4 is often the more faithful format — though the thermal layout is closer to what a restaurant's own kitchen ticket looks like.",
        ],
      },
    ],
    fields: [
      "Restaurant and platform name",
      "Order reference number",
      "Ordered items at menu price",
      "Delivery fee, service fee, promotions",
      "Tax and driver tip",
    ],
    faqs: [
      {
        q: "Is the driver tip taxable?",
        a: "Generally no. Keep it out of the item list and use the tip setting so it applies after tax.",
      },
      {
        q: "How do I show a promotion?",
        a: "As a discount, so the gross order value stays visible for verification against the order confirmation.",
      },
      {
        q: "Should this be A4 or thermal?",
        a: "Delivery receipts are emailed, so A4 is usually more faithful. The thermal layout matches a kitchen ticket.",
      },
    ],
    related: ["restaurant-receipt", "cafe-receipt", "grocery-receipt", "itemized-receipt"],
    seed: {
      style: "restaurant",
      paper: "a4",
      business: {
        name: "Saffron House — Delivery",
        address: "Order via platform",
        cityLine: "Brooklyn, NY 11201",
        phone: "(718) 555-0155",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 8.875,
      taxLabel: "Sales Tax",
      showTip: true,
      tipRate: 18,
      items: [
        { id: "1", qty: 1, name: "Lamb Rogan Josh", price: 18.5 },
        { id: "2", qty: 1, name: "Paneer Tikka Masala", price: 16.0 },
        { id: "3", qty: 2, name: "Garlic Naan", price: 4.5 },
        { id: "4", qty: 1, name: "Delivery Fee", price: 3.99 },
        { id: "5", qty: 1, name: "Service Fee", price: 4.35 },
      ],
      footer: {
        headline: "ORDER DELIVERED",
        lines: ["Order #A4-771882", "Delivered to: 214 Hoyt St, Apt 5"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "bar-receipt",
    name: "Bar & Pub Receipt",
    h1: "Bar & Pub Receipt Generator",
    category: "Food & Drink",
    blurb: "Drinks tab, rounds, bartender, tip line and tab reference.",
    intent:
      "Create a bar or pub receipt with a drinks tab, rounds, bartender name, tip line and tab number.",
    sections: [
      {
        heading: "Tabs, not transactions",
        body: [
          "A bar bill is a running tab closed at the end rather than a single transaction, which is why the document reads as an accumulated list of rounds rather than a basket. Drinks appear in the order they were served.",
          "The tab reference is the operational key — it is what the bartender uses to find an open tab and what a customer disputing a charge quotes. Use the transaction number field for it.",
        ],
      },
      {
        heading: "Rounds and pours",
        body: [
          "Enter each drink as a line at its menu price with the quantity for the round. Bars typically abbreviate heavily on 58mm paper, so keep descriptions short — the standard is a shortened brand-neutral name and the measure.",
          "Where a tab was opened against a card, the pre-authorisation is not a charge and does not appear on the receipt. Only the settled total does.",
        ],
      },
      {
        heading: "Tips and service",
        body: [
          "Bar tipping is usually a percentage added at settlement or a rounded amount per round. Set a tip rate to have it calculated, or disable the tip line and enter a flat gratuity as a line item.",
          "Where an automatic service charge applies to large groups, show it separately from any voluntary tip — the two are treated differently for tax and for tip-pooling.",
        ],
      },
    ],
    fields: [
      "Venue name and address",
      "Tab number and bartender",
      "Drinks by round",
      "Subtotal, tax, tip or service charge",
      "Payment method and card last four",
    ],
    faqs: [
      {
        q: "How do I show an open tab?",
        a: "Use the transaction number field for the tab reference. Only the settled total appears — a pre-authorisation is not a charge.",
      },
      {
        q: "Service charge or tip?",
        a: "Show them separately. A mandatory service charge and a voluntary tip are treated differently for tax and tip-pooling.",
      },
      {
        q: "What paper size do bars use?",
        a: "58mm is typical for bar printers, which is why descriptions are heavily abbreviated.",
      },
    ],
    related: ["restaurant-receipt", "cafe-receipt", "itemized-receipt", "food-delivery-receipt"],
    seed: {
      style: "restaurant",
      paper: "58mm",
      business: {
        name: "The Anchor & Crow",
        address: "61 Dock Street",
        cityLine: "Liverpool L1 8JQ",
        phone: "",
        website: "",
        taxId: "",
        logo: null,
      },
      currency: "GBP",
      taxRate: 0,
      taxLabel: "VAT incl.",
      showTip: true,
      tipRate: 10,
      items: [
        { id: "1", qty: 4, name: "Draught Pale Ale — pt", price: 5.4 },
        { id: "2", qty: 2, name: "House Gin & Tonic", price: 7.5 },
        { id: "3", qty: 2, name: "Soda & Lime", price: 2.2 },
        { id: "4", qty: 1, name: "Bar Snacks", price: 6.0 },
      ],
      options: { density: "condensed", fade: 0, curl: true, torn: true, uppercase: true },
      meta: {
        date: "",
        time: "",
        cashier: "BAR 2",
        transactionId: "TAB 41",
        register: "",
        storeNumber: "",
      },
      footer: {
        headline: "CHEERS",
        lines: ["Tab 41 closed"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "deposit-receipt",
    name: "Deposit Receipt",
    h1: "Deposit Receipt Generator",
    category: "Business",
    blurb: "Deposit amount, what it secures, balance remaining and refund terms.",
    intent:
      "Create a deposit receipt recording an advance payment, what it secures, the balance outstanding and refund conditions.",
    sections: [
      {
        heading: "A deposit is not a payment",
        body: [
          "A deposit is a part-payment that secures a future supply, and the receipt has to make that clear or it will later be read as settlement in full. The three figures that must appear are the deposit taken, the total agreed price, and the balance outstanding.",
          "Deposits are also the most disputed payment type in small business, because the argument is almost always about refundability rather than about whether the money changed hands. State the terms on the receipt itself.",
        ],
      },
      {
        heading: "Refundable, non-refundable and forfeiture",
        body: [
          "Say plainly whether the deposit is refundable, and under what conditions. Where it is non-refundable, many consumer-protection regimes require that the term be brought to the customer's attention before payment — a note on the receipt after the fact is weaker evidence than a signed term, but it is far better than nothing.",
          "Where a deposit is forfeitable on cancellation within a notice period, state the period. 'Non-refundable within 14 days of the booked date' is enforceable in a way that 'non-refundable' alone often is not.",
        ],
      },
      {
        heading: "Security deposits",
        body: [
          "Tenancy and equipment security deposits are a different animal: the money is held rather than earned, and in many jurisdictions must be placed in a protected scheme with prescribed information given to the payer.",
          "If that is what you are issuing, note the scheme and reference on the receipt. A security deposit receipt that does not identify where the money is held fails its main purpose.",
        ],
      },
    ],
    fields: [
      "Business name and contact",
      "Payer name",
      "Deposit amount and what it secures",
      "Total price and balance outstanding",
      "Refund terms and notice period",
    ],
    faqs: [
      {
        q: "What must a deposit receipt show?",
        a: "The deposit taken, the total agreed price, and the balance outstanding — otherwise it can be read as settlement in full.",
      },
      {
        q: "Is 'non-refundable' enough?",
        a: "Usually not. Tie it to a condition and a notice period — that is what tends to be enforceable.",
      },
      {
        q: "What about tenancy security deposits?",
        a: "Note the protection scheme and reference. A security deposit receipt that doesn't say where the money is held fails its purpose.",
      },
    ],
    related: ["cash-receipt", "invoice-receipt", "rent-receipt", "service-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Vale Event Hire",
        address: "3 Mill Lane Business Park",
        cityLine: "Bristol BS1 4RN",
        phone: "+44 117 555 0188",
        website: "",
        taxId: "",
        logo: null,
      },
      currency: "GBP",
      taxRate: 0,
      taxLabel: "VAT",
      items: [{ id: "1", qty: 1, name: "Deposit — marquee hire, 14 June", price: 450.0 }],
      footer: {
        headline: "DEPOSIT RECEIVED",
        lines: [
          "Total agreed: 1,800.00",
          "Balance due 7 days before event: 1,350.00",
          "Non-refundable within 21 days of booked date.",
        ],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "electronics-receipt",
    name: "Electronics Receipt",
    h1: "Electronics Store Receipt Generator",
    category: "Retail",
    blurb: "Serial numbers, warranty terms, extended cover and returns window.",
    intent:
      "Generate an electronics store receipt with model and serial numbers, warranty period, extended cover and returns policy.",
    sections: [
      {
        heading: "The warranty document",
        body: [
          "An electronics receipt is the primary evidence for a warranty claim, and manufacturers routinely require the original proof of purchase before honouring one. The date of purchase is what starts the warranty clock, which makes it the single most important field on the document.",
          "It is also the evidence for an insurance claim after theft or damage, where the model and serial number are what let the insurer identify the specific unit.",
        ],
      },
      {
        heading: "Serial and model numbers",
        body: [
          "Put the model in the line description and the serial number alongside it. Retailers vary on whether serials print on the receipt, but for anything with a meaningful warranty it is worth recording — reconstructing a serial after a theft is usually impossible.",
          "Where several identical units were bought, list them on separate lines so each serial is attached to its own line rather than lumping them into a quantity.",
        ],
      },
      {
        heading: "Extended cover and returns",
        body: [
          "Extended warranty or protection plans are a separate supply from the goods and go on their own line. They are often taxed differently — insurance-backed plans are frequently exempt from sales tax while service-contract plans are not.",
          "Electronics returns windows are usually shorter than general merchandise and often carry a restocking fee for opened items. Put both in the footer.",
        ],
      },
    ],
    fields: [
      "Store name, address and store number",
      "Model and serial numbers",
      "Warranty period",
      "Extended cover plan",
      "Returns window and restocking terms",
    ],
    faqs: [
      {
        q: "Why does the purchase date matter so much?",
        a: "It starts the warranty clock, and manufacturers require original proof of purchase before honouring a claim.",
      },
      {
        q: "Should serial numbers be on the receipt?",
        a: "For anything with a meaningful warranty, yes. Reconstructing a serial after a theft is usually impossible.",
      },
      {
        q: "How should an extended warranty appear?",
        a: "As its own line — it is a separate supply and is often taxed differently from the goods.",
      },
    ],
    related: ["retail-receipt", "itemized-receipt", "clothing-receipt", "grocery-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Circuit Row Electronics",
        address: "900 Technology Drive",
        cityLine: "San Jose, CA 95110",
        phone: "(408) 555-0146",
        website: "circuitrow.example",
        taxId: "",
        logo: null,
      },
      taxRate: 9.375,
      taxLabel: "Sales Tax",
      items: [
        { id: "1", qty: 1, name: "27in Monitor QHD — SN 4471882201", price: 329.0 },
        { id: "2", qty: 1, name: "Mechanical Keyboard — SN 88210447", price: 119.0 },
        { id: "3", qty: 1, name: "3yr Protection Plan", price: 49.0 },
      ],
      footer: {
        headline: "KEEP THIS RECEIPT",
        lines: [
          "Required for warranty service",
          "Returns 14 days · 15% restocking if opened",
        ],
        showBarcode: true,
        showSurvey: true,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "clothing-receipt",
    name: "Clothing Store Receipt",
    h1: "Clothing Store Receipt Generator",
    category: "Retail",
    blurb: "Size and colour detail, exchange policy and gift receipt option.",
    intent:
      "Create a clothing or apparel store receipt with size and colour detail, exchange window and gift receipt formatting.",
    sections: [
      {
        heading: "Size and colour belong on the line",
        body: [
          "Apparel returns and exchanges turn on the specific variant sold, so the line description should carry size and colour rather than just the garment name. 'Wool Coat' is not enough to process an exchange; 'Wool Coat — Navy / M' is.",
          "Retailers usually include the style code too, which is what the returns desk scans or keys.",
        ],
      },
      {
        heading: "Exchange windows and final sale",
        body: [
          "Clothing typically carries a longer exchange window than electronics but excludes certain categories from returns entirely — underwear, swimwear and altered items are commonly final sale. Where a line is final sale, mark it in the description.",
          "Sale items are frequently exchange-only rather than refundable. Putting the applicable policy in the footer is what makes it enforceable at the desk.",
        ],
      },
      {
        heading: "Gift receipts",
        body: [
          "A gift receipt is the same transaction with prices suppressed, so the recipient can exchange without seeing what was paid. To produce one here, generate the receipt as normal and then set the item prices to zero, keeping the descriptions and the transaction reference.",
          "Keep the transaction number identical between the full receipt and the gift receipt — that is what links them at the returns desk.",
        ],
      },
    ],
    fields: [
      "Store name, address and store number",
      "Style code, size and colour",
      "Sale price and any markdown",
      "Exchange window and final-sale items",
      "Transaction reference",
    ],
    faqs: [
      {
        q: "What detail should apparel lines carry?",
        a: "Style code, garment name, colour and size. An exchange cannot be processed without the variant.",
      },
      {
        q: "How do I make a gift receipt?",
        a: "Generate normally, then set prices to zero while keeping descriptions and the transaction reference — which must match the full receipt.",
      },
      {
        q: "Are sale items returnable?",
        a: "Frequently exchange-only rather than refundable. Put the applicable policy in the footer.",
      },
    ],
    related: ["retail-receipt", "electronics-receipt", "itemized-receipt", "grocery-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Marlowe & Finch",
        address: "18 Carlisle Arcade",
        cityLine: "Edinburgh EH2 4AB",
        phone: "+44 131 555 0119",
        website: "marlowefinch.example",
        taxId: "VAT GB 220 4471 88",
        logo: null,
      },
      currency: "GBP",
      taxRate: 20,
      taxLabel: "VAT incl. @ 20%",
      items: [
        { id: "1", qty: 1, name: "8841 Wool Coat — Navy / M", price: 189.0 },
        { id: "2", qty: 2, name: "2207 Oxford Shirt — White / 15.5", price: 55.0 },
        { id: "3", qty: 1, name: "4410 Silk Scarf — FINAL SALE", price: 38.0 },
      ],
      footer: {
        headline: "THANK YOU",
        lines: ["Exchange within 28 days with receipt", "Sale items exchange only"],
        showBarcode: true,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "medical-receipt",
    name: "Medical Receipt",
    h1: "Medical & Clinic Receipt Generator",
    category: "Health",
    blurb: "Practitioner details, service codes, patient copay and claim reference.",
    intent:
      "Generate a medical or clinic receipt with practitioner details, services rendered, patient payment and claim reference.",
    sections: [
      {
        heading: "Substantiating a health claim",
        body: [
          "Medical receipts are usually produced for a purpose beyond the transaction itself: a health savings account withdrawal, an insurance reimbursement, or a medical expense deduction. Each of those has its own documentation standard, and all of them want the same core facts.",
          "Those are the provider's name and credentials, the patient, the date of service, a description of the service, the amount charged and the amount the patient actually paid.",
        ],
      },
      {
        heading: "Charged, covered and paid",
        body: [
          "As with pharmacy documentation, the amount paid by the patient is rarely the amount charged. Show the gross charge, the insurer or scheme contribution, and the patient responsibility as distinct figures — HSA substantiation specifically requires the patient-paid amount.",
          "Enter the service at its full charge and the insurance contribution as a discount, leaving the patient portion as the total, with the covered amount noted in the footer.",
        ],
      },
      {
        heading: "Codes and privacy",
        body: [
          "Clinical service codes are what an insurer processes against, so include them in the line description where the receipt is going to a claims process.",
          "Where the receipt is going to an employer or a general expense system rather than an insurer, consider whether the clinical detail needs to be there at all. A receipt establishing that a consultation occurred and what was paid is usually sufficient, and medical detail on a document that circulates widely is worth avoiding.",
        ],
      },
    ],
    fields: [
      "Practice name, address and practitioner",
      "Patient name and date of service",
      "Service description and code",
      "Gross charge, scheme contribution, patient paid",
      "Claim reference",
    ],
    faqs: [
      {
        q: "What does HSA substantiation require?",
        a: "The provider, patient, date of service, service description, and specifically the amount the patient paid.",
      },
      {
        q: "Should clinical codes appear?",
        a: "Yes where the receipt goes to an insurer. Consider omitting them where it goes to an employer or general expense system.",
      },
      {
        q: "How do I show insurance coverage?",
        a: "Enter the full charge, apply the scheme contribution as a discount, and note the covered amount in the footer.",
      },
    ],
    related: ["pharmacy-receipt", "service-receipt", "invoice-receipt", "itemized-receipt"],
    seed: {
      style: "service",
      paper: "a4",
      business: {
        name: "Westbrook Family Clinic",
        address: "205 Westbrook Avenue, Suite 210",
        cityLine: "Raleigh, NC 27603",
        phone: "(919) 555-0137",
        website: "",
        taxId: "NPI 1447188220",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      items: [
        { id: "1", qty: 1, name: "Office visit, established patient — 99213", price: 185.0 },
        { id: "2", qty: 1, name: "Venipuncture — 36415", price: 28.0 },
      ],
      discount: 168.0,
      footer: {
        headline: "PATIENT RESPONSIBILITY",
        lines: ["Insurance paid: 168.00", "Patient: R. Nakamura", "Claim ref: CLM-4471882"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "cleaning-receipt",
    name: "Cleaning Service Receipt",
    h1: "Cleaning Service Receipt Generator",
    category: "Services",
    blurb: "Property, service type, hours or flat rate, supplies and frequency.",
    intent:
      "Create a cleaning service receipt with property address, service type, hours or flat rate and recurring schedule.",
    sections: [
      {
        heading: "Recurring work needs a period",
        body: [
          "Most cleaning is recurring — weekly, fortnightly or monthly — which means the receipt has to state which visit it covers. A cleaning receipt without a service date or period is indistinguishable from any other week's and cannot resolve a dispute about whether a particular visit was paid for.",
          "For contract cleaning billed monthly in arrears, describe the period in the line rather than the individual visits.",
        ],
      },
      {
        heading: "Hourly, flat rate and extras",
        body: [
          "Domestic cleaning is usually hourly; commercial contracts are usually a flat monthly rate. Enter hourly work as hours at the rate, and contract work as a single line describing the period.",
          "One-off extras — oven cleaning, carpet shampoo, end-of-tenancy deep clean — go on their own lines. End-of-tenancy work in particular is frequently reimbursed by a landlord or deducted from a deposit, so it needs to be separately identifiable.",
        ],
      },
      {
        heading: "Supplies and access",
        body: [
          "Where you supply materials rather than the client, that is a separate taxable supply in many jurisdictions and belongs on its own line.",
          "For end-of-tenancy and move-out cleans, note the property address explicitly. That document often ends up in a deposit dispute between two other parties, and one that does not identify the property is useless to both.",
        ],
      },
    ],
    fields: [
      "Business name and contact",
      "Client name and property address",
      "Service type and period covered",
      "Hours at rate, or flat contract rate",
      "Extras and supplies",
    ],
    faqs: [
      {
        q: "What period should a cleaning receipt cover?",
        a: "State the visit date or the billing period. Without it the receipt cannot resolve a dispute about a particular visit.",
      },
      {
        q: "How do I bill contract cleaning?",
        a: "A single line describing the period, rather than itemising each visit.",
      },
      {
        q: "Why note the property address?",
        a: "End-of-tenancy receipts often end up in a deposit dispute between other parties, and one that doesn't identify the property is useless.",
      },
    ],
    related: ["handyman-receipt", "service-receipt", "cash-receipt", "rent-receipt"],
    seed: {
      style: "service",
      paper: "a4",
      business: {
        name: "Brightside Cleaning Co.",
        address: "17 Fairview Terrace",
        cityLine: "Dublin D08 XY42",
        phone: "+353 1 555 0173",
        website: "",
        taxId: "",
        logo: null,
      },
      currency: "EUR",
      taxRate: 13.5,
      taxLabel: "VAT @ 13.5%",
      items: [
        { id: "1", qty: 4, name: "Standard clean — hr @ 28.00", price: 28.0 },
        { id: "2", qty: 1, name: "Oven deep clean", price: 65.0 },
        { id: "3", qty: 1, name: "Materials", price: 12.0 },
      ],
      footer: {
        headline: "PAYMENT RECEIVED",
        lines: ["Property: 44 Ashfield Court, Apt 2", "Service date: 18 March"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "superstore-receipt",
    name: "Superstore Receipt",
    h1: "Superstore Receipt Generator",
    category: "Retail",
    blurb: "Big-box supercenter format — store number, long basket, tax flags, items-sold count.",
    intent:
      "Create a big-box superstore receipt in the format major supercenters use — store and register numbers, a long itemised basket, taxable flags, tender and change, and a scannable barcode.",
    sections: [
      {
        heading: "How supercenter receipts are laid out",
        body: [
          "Big-box superstore receipts follow a very consistent structure: a centred store block with the location and store number, a line of transaction metadata (date, time, operator, register, and a long transaction or TC number), then a dense product list where each line carries an item description and, often, a per-line tax flag.",
          "Below the basket sits the summary — a subtotal, the tax broken out by rate, the grand total, the tender type and amount, and the change given. Most chains close with an items-sold count and a barcode encoding the transaction for returns lookup.",
        ],
      },
      {
        heading: "Tax flags and mixed baskets",
        body: [
          "The defining detail of a supercenter receipt is mixed taxability across one basket: grocery staples are frequently zero-rated while general merchandise is taxed. Real receipts show this with a per-line letter flag — commonly N, X, O or T — next to each item.",
          "This generator applies a single blended rate for simplicity. If you want the per-line flags shown, append the letter to each item description; it will print as part of the line.",
        ],
      },
      {
        heading: "Use a name that is yours",
        body: [
          "Enter your own store name and details. This template reproduces the layout conventions of large retailers, not any particular company's branding — do not enter another business's name, logo or trademarks as if the receipt were issued by them.",
        ],
      },
    ],
    fields: [
      "Store name, address and store number",
      "Operator, register and transaction number",
      "Itemised basket with tax flags",
      "Subtotal, tax, total, tender and change",
      "Items-sold count and barcode",
    ],
    faqs: [
      {
        q: "Why do some items have a letter next to the price?",
        a: "That is a tax flag showing whether the item is taxable and at what rate. Append the letter to the item description to reproduce it.",
      },
      {
        q: "What paper size do supercenters use?",
        a: "80mm thermal roll, which is the default here. Long baskets simply produce a longer receipt.",
      },
      {
        q: "Can I show the number of items sold?",
        a: "Yes — add it as a footer line, e.g. '# ITEMS SOLD 14'.",
      },
    ],
    related: ["grocery-receipt", "warehouse-club-receipt", "retail-receipt", "itemized-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "ValuMart Supercenter",
        address: "5100 Commerce Parkway",
        cityLine: "Dayton, OH 45402",
        phone: "(937) 555-0148",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 7.5,
      taxLabel: "Tax 1",
      meta: {
        date: "",
        time: "",
        cashier: "OP 442817",
        transactionId: "",
        register: "REG 12",
        storeNumber: "ST 2284",
      },
      items: [
        { id: "1", qty: 1, name: "GV MILK 1GAL  N", price: 3.24 },
        { id: "2", qty: 1, name: "WHITE BREAD  N", price: 1.28 },
        { id: "3", qty: 2, name: "PASTA SAUCE  N", price: 1.94 },
        { id: "4", qty: 1, name: "PAPER TOWELS 6PK  X", price: 9.97 },
        { id: "5", qty: 1, name: "LAUNDRY DET  X", price: 11.97 },
        { id: "6", qty: 3, name: "BANANAS LB  N", price: 0.52 },
        { id: "7", qty: 1, name: "PHONE CHARGER  X", price: 14.88 },
        { id: "8", qty: 2, name: "SPARKLING WTR  N", price: 3.98 },
      ],
      footer: {
        headline: "# ITEMS SOLD 12",
        lines: ["Low prices you can trust. Every day.", "Returns within 90 days with receipt"],
        showBarcode: true,
        showSurvey: true,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "warehouse-club-receipt",
    name: "Warehouse Club Receipt",
    h1: "Warehouse Club Receipt Generator",
    category: "Retail",
    blurb: "Membership warehouse format — member number, bulk items, taxable 'E' flags, total items.",
    intent:
      "Create a warehouse club receipt in the membership-wholesale format — member number, bulk quantities, per-line taxable flags and a total item count.",
    sections: [
      {
        heading: "What sets a warehouse club receipt apart",
        body: [
          "Membership warehouse receipts read differently from ordinary retail: they carry a member number, list items by a short code plus an abbreviated description, and sell in bulk multipacks. Taxable lines are usually flagged with a trailing letter such as 'E'.",
          "The summary shows a subtotal, tax, and a total, followed by the tender and, distinctively, a count of total items — warehouse clubs almost always print how many units left the building.",
        ],
      },
      {
        heading: "Item codes and bulk pricing",
        body: [
          "Each line typically leads with an item number and an abbreviated, uppercase description — the format is optimised for a narrow column, so descriptions are terse. Enter items the same way for an authentic look.",
          "Because the model is bulk, quantities above one are common; the per-unit price prints under the line when quantity exceeds one.",
        ],
      },
      {
        heading: "Use your own club or store name",
        body: [
          "This template follows the layout conventions of membership warehouses generally. Enter your own business name — do not present the receipt as though issued by a specific real club.",
        ],
      },
    ],
    fields: [
      "Warehouse name, location and number",
      "Member number",
      "Item codes with bulk quantities",
      "Taxable flags, subtotal, tax, total",
      "Total items and tender",
    ],
    faqs: [
      {
        q: "What does the 'E' next to a price mean?",
        a: "It flags the line as taxable. Append it to the item description to reproduce it.",
      },
      {
        q: "How do I show the member number?",
        a: "Use the transaction field, or add it as a meta line — warehouse receipts print it near the top.",
      },
      {
        q: "Why is the total item count shown?",
        a: "Membership warehouses print the number of units sold as a loss-prevention and checkout-verification convention.",
      },
    ],
    related: ["superstore-receipt", "grocery-receipt", "retail-receipt", "itemized-receipt"],
    seed: {
      style: "retail",
      paper: "80mm",
      business: {
        name: "Harbor Wholesale Club",
        address: "8800 Industrial Blvd",
        cityLine: "Fresno, CA 93725",
        phone: "(559) 555-0172",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 7.975,
      taxLabel: "Tax",
      meta: {
        date: "",
        time: "",
        cashier: "MEMBER 118 224 771",
        transactionId: "",
        register: "WHSE 08",
        storeNumber: "",
      },
      items: [
        { id: "1", qty: 1, name: "1841 ROTISSERIE CHKN", price: 4.99 },
        { id: "2", qty: 1, name: "2207 KS WATER 40PK  E", price: 3.79 },
        { id: "3", qty: 1, name: "9910 OLIVE OIL 2L", price: 15.99 },
        { id: "4", qty: 2, name: "4471 PAPER TOWEL 12  E", price: 19.99 },
        { id: "5", qty: 1, name: "8823 GROUND COFFEE 3LB", price: 13.49 },
        { id: "6", qty: 1, name: "3140 MIXED NUTS 2.5LB", price: 16.99 },
      ],
      footer: {
        headline: "TOTAL ITEMS SOLD 7",
        lines: ["Member savings applied", "Thank you — see you next visit"],
        showBarcode: true,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "online-order-receipt",
    name: "Online Order Receipt",
    h1: "Online Order Confirmation Receipt Generator",
    category: "Online",
    blurb: "E-commerce order confirmation — order number, ship-to, items sold by, shipping and tax.",
    intent:
      "Create an online order confirmation in the e-commerce format — order number, shipping address, items with seller, order subtotal, shipping, tax and order total.",
    sections: [
      {
        heading: "An order confirmation, not a till receipt",
        body: [
          "Online marketplace receipts are order confirmations: they are emailed rather than printed, laid out on the full page width, and structured around an order number, a ship-to address, and a list of items each showing the seller and quantity.",
          "The money summary is itemised as order subtotal, shipping and handling, estimated tax, and an order total — with the payment method and billing reference below. This template defaults to A4 because that is how these documents are read and filed.",
        ],
      },
      {
        heading: "Order numbers and sellers",
        body: [
          "The order number is the key a customer quotes for support and the reference finance teams match against a card statement. Put it in the transaction field.",
          "Marketplaces list the seller beside each item because a single order can span multiple third-party sellers. Include the seller in the item description where you want that detail.",
        ],
      },
      {
        heading: "Use it for your own orders",
        body: [
          "This reproduces the general layout of e-commerce confirmations, not any specific marketplace's branding. Use it to reconstruct a confirmation for an order you actually placed or fulfilled.",
        ],
      },
    ],
    fields: [
      "Store or marketplace name",
      "Order number and order date",
      "Ship-to address",
      "Items with seller and quantity",
      "Subtotal, shipping, tax, order total",
    ],
    faqs: [
      {
        q: "Should this be A4 or thermal?",
        a: "A4 or Letter — online order confirmations are emailed documents, not till roll.",
      },
      {
        q: "Where does the order number go?",
        a: "The transaction field. It is the reference used for support and statement matching.",
      },
      {
        q: "How do I show the seller for each item?",
        a: "Add 'Sold by …' to the item description; marketplaces print the seller per line.",
      },
    ],
    related: ["itemized-receipt", "electronics-receipt", "marketplace-resale-receipt", "invoice-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "Meridian Marketplace",
        address: "Order Confirmation",
        cityLine: "Seattle, WA 98108",
        phone: "",
        website: "meridianmarket.example",
        taxId: "",
        logo: null,
      },
      taxRate: 8.9,
      taxLabel: "Estimated Tax",
      meta: {
        date: "",
        time: "",
        cashier: "",
        transactionId: "",
        register: "",
        storeNumber: "",
      },
      items: [
        { id: "1", qty: 1, name: "Wireless Earbuds (Sold by AudioNest)", price: 49.99 },
        { id: "2", qty: 2, name: "USB-C Cable 2m (Sold by CableCo)", price: 8.49 },
        { id: "3", qty: 1, name: "Phone Stand Aluminium", price: 15.95 },
        { id: "4", qty: 1, name: "Shipping & Handling", price: 5.99 },
      ],
      payment: { method: "Visa", last4: "4892", approvalCode: "", changeDue: 0 },
      footer: {
        headline: "ORDER CONFIRMED",
        lines: [
          "Order # 114-7729183-4471882",
          "Ship to: A. Reyes, 214 Hoyt St, Brooklyn NY 11201",
          "Arriving Tue — track in Your Orders",
        ],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "marketplace-resale-receipt",
    name: "Resale Marketplace Receipt",
    h1: "Resale Marketplace Order Receipt Generator",
    category: "Online",
    blurb: "Sneaker/streetwear resale format — order number, size, condition, price, processing and shipping.",
    intent:
      "Create a resale-marketplace order receipt in the sneaker and streetwear format — order number, item with size and condition, purchase price, processing fee, shipping and total.",
    sections: [
      {
        heading: "The resale order layout",
        body: [
          "Resale marketplaces confirm a purchase with an order number, the item name, its size and condition, and a price breakdown that separates the purchase price from a processing fee and shipping. Because these platforms sit between a buyer and a third-party seller, the fee lines are explicit.",
          "The document is an emailed confirmation, so this template uses the full-page layout. Enter the order number in the transaction field.",
        ],
      },
      {
        heading: "Size, condition and fees",
        body: [
          "Put the size and condition in the item description — 'Size 10 / New' is the convention. Add the processing fee and shipping as their own lines so the breakdown matches what these platforms show.",
          "Keep the purchase price, fees and shipping separate rather than rolling them into one figure; the itemised breakdown is the whole point of a resale confirmation.",
        ],
      },
      {
        heading: "A note on authenticity claims",
        body: [
          "This template reproduces the general format of resale confirmations. It does not, and should not, be used to assert that a specific item is authentic or was verified by a real marketplace. Enter your own transaction details only.",
        ],
      },
    ],
    fields: [
      "Marketplace or store name",
      "Order number",
      "Item with size and condition",
      "Purchase price, processing fee, shipping",
      "Order total and payment",
    ],
    faqs: [
      {
        q: "How do I show size and condition?",
        a: "Add them to the item description, e.g. 'Trainer — Size 10 / New'.",
      },
      {
        q: "Should fees be separate lines?",
        a: "Yes. Resale confirmations always break out the processing fee and shipping from the item price.",
      },
      {
        q: "Is this A4 or thermal?",
        a: "A4 or Letter — these are emailed order confirmations.",
      },
    ],
    related: ["online-order-receipt", "clothing-receipt", "electronics-receipt", "itemized-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "ReSole Market",
        address: "Order Confirmation",
        cityLine: "Jersey City, NJ 07302",
        phone: "",
        website: "resolemarket.example",
        taxId: "",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      meta: {
        date: "",
        time: "",
        cashier: "",
        transactionId: "",
        register: "",
        storeNumber: "",
      },
      items: [
        { id: "1", qty: 1, name: "Retro Court Trainer — Size 10 / New", price: 210.0 },
        { id: "2", qty: 1, name: "Processing Fee", price: 12.5 },
        { id: "3", qty: 1, name: "Shipping", price: 13.95 },
      ],
      payment: { method: "PayPal", last4: "", approvalCode: "", changeDue: 0 },
      footer: {
        headline: "PURCHASE CONFIRMED",
        lines: ["Order # RS-4471-8829", "Ships to: M. Okafor", "Est. delivery 5–7 business days"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "fast-food-receipt",
    name: "Fast Food Receipt",
    h1: "Fast Food Receipt Generator",
    category: "Food & Drink",
    blurb: "Quick-service format — order number, eat-in/takeout, combo meals, tax and tender.",
    intent:
      "Create a fast-food receipt in the quick-service format — order number, dine-in or takeout, combo meals with modifiers, tax, tender and change.",
    sections: [
      {
        heading: "Quick-service receipt conventions",
        body: [
          "Fast-food receipts are built around a prominent order number used to call the order, a dine-in or takeout marker, and a compact list of combos and items. Meals are usually shown as a named combo with the drink and side indented beneath.",
          "The summary is a subtotal, tax, total, tender and change. These print on narrow thermal roll, so this template defaults to 58mm and a condensed layout.",
        ],
      },
      {
        heading: "Combos and modifiers",
        body: [
          "Enter a combo as a parent line at its price, then list the included or upgraded items beneath it. Paid upgrades carry their own price; included items can be shown at zero, which still prints.",
          "The order number is what the counter calls, so it belongs in the transaction field where it prints prominently.",
        ],
      },
    ],
    fields: [
      "Restaurant name and location",
      "Order number and dine-in/takeout",
      "Combos and items with modifiers",
      "Subtotal, tax, total",
      "Tender and change",
    ],
    faqs: [
      {
        q: "How do I show a combo meal?",
        a: "A parent line for the combo, with the drink and side indented beneath it.",
      },
      {
        q: "Where does the order number print?",
        a: "The transaction field — it prints prominently, as counter staff call it.",
      },
      {
        q: "What size is a fast-food receipt?",
        a: "58mm thermal, the default here.",
      },
    ],
    related: ["restaurant-receipt", "cafe-receipt", "food-delivery-receipt", "bar-receipt"],
    seed: {
      style: "restaurant",
      paper: "58mm",
      business: {
        name: "Route 9 Burgers",
        address: "1400 Highway 9",
        cityLine: "Columbus, OH 43206",
        phone: "",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 7.5,
      taxLabel: "Tax",
      showTip: false,
      tipRate: 0,
      options: { density: "condensed", fade: 0, curl: true, torn: true, uppercase: true },
      meta: {
        date: "",
        time: "",
        cashier: "TILL 2",
        transactionId: "ORDER 087",
        register: "TAKEOUT",
        storeNumber: "",
      },
      items: [
        { id: "1", qty: 1, name: "Classic Combo Meal", price: 8.49 },
        { id: "2", qty: 1, name: "  Cheeseburger", price: 0 },
        { id: "3", qty: 1, name: "  Fries — Large", price: 0.6 },
        { id: "4", qty: 1, name: "  Cola — Medium", price: 0 },
        { id: "5", qty: 1, name: "Chicken Nuggets 6pc", price: 4.29 },
        { id: "6", qty: 1, name: "Apple Pie", price: 1.49 },
      ],
      payment: { method: "Cash", last4: "", approvalCode: "", changeDue: 5.13 },
      footer: {
        headline: "THANK YOU — ORDER 087",
        lines: ["Tell us how we did", "Survey code on receipt"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },

  {
    slug: "peer-payment-receipt",
    name: "Peer Payment Receipt",
    h1: "Payment App Receipt Generator",
    category: "Business",
    blurb: "Money-transfer app format — payment sent, from/to, amount, note and payment ID.",
    intent:
      "Create a payment-app receipt in the peer-to-peer transfer format — payment sent or received, sender and recipient, amount, note and a payment identifier.",
    sections: [
      {
        heading: "The transfer confirmation layout",
        body: [
          "Payment-app receipts are minimal by design: a headline status ('Payment Sent' or 'Payment Received'), the sender and recipient, a large amount, an optional note describing what it was for, the date, and a unique payment identifier.",
          "There is no tax and no basket — it is a record of money moving between two people. Put the amount as a single line item and the payment ID in the transaction field.",
        ],
      },
      {
        heading: "From, to and note",
        body: [
          "Name both parties clearly and keep the note specific — 'For June rent' or 'Split dinner' — because the note is what makes the transfer reconcilable later.",
          "Use the footer for the from/to lines and the payment status, and set the payment method to match the funding source shown on the confirmation.",
        ],
      },
    ],
    fields: [
      "App or service name",
      "Sender and recipient",
      "Amount and note",
      "Date and payment ID",
      "Funding source",
    ],
    faqs: [
      {
        q: "Is there any tax on a peer payment?",
        a: "No — leave the tax rate at zero. It is a transfer, not a sale.",
      },
      {
        q: "Where does the payment ID go?",
        a: "The transaction field. Payment apps always show a unique identifier for the transfer.",
      },
      {
        q: "How do I record what it was for?",
        a: "Use the note — put it in the item description or a footer line.",
      },
    ],
    related: ["cash-receipt", "invoice-receipt", "rent-receipt", "deposit-receipt"],
    seed: {
      style: "simple",
      paper: "a4",
      business: {
        name: "QuickPay",
        address: "Payment Confirmation",
        cityLine: "",
        phone: "",
        website: "",
        taxId: "",
        logo: null,
      },
      taxRate: 0,
      taxLabel: "Tax",
      meta: {
        date: "",
        time: "",
        cashier: "",
        transactionId: "",
        register: "",
        storeNumber: "",
      },
      items: [{ id: "1", qty: 1, name: "Payment — For June rent", price: 950.0 }],
      payment: { method: "Bank Transfer", last4: "", approvalCode: "", changeDue: 0 },
      footer: {
        headline: "PAYMENT SENT",
        lines: ["From: J. Whitfield", "To: Hollis Property Mgmt", "Payment ID: QP-4471-88213-09"],
        showBarcode: false,
        showSurvey: false,
        showSavings: false,
        savings: 0,
      },
    },
  },
];

export const TEMPLATE_MAP = new Map(TEMPLATES.map((t) => [t.slug, t]));

export function getTemplate(slug: string) {
  return TEMPLATE_MAP.get(slug);
}

export const CATEGORIES = Array.from(new Set(TEMPLATES.map((t) => t.category))).sort();

export function templatesByCategory(category: string) {
  return TEMPLATES.filter((t) => t.category === category);
}
