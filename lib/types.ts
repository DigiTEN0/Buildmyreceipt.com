export type PaperSize = "58mm" | "80mm" | "110mm" | "a4";

export type StyleId =
  | "thermal"
  | "retail"
  | "restaurant"
  | "fuel"
  | "transport"
  | "lodging"
  | "service"
  | "simple";

export type PaymentMethod =
  | "Cash"
  | "Visa"
  | "Mastercard"
  | "Amex"
  | "Discover"
  | "Debit"
  | "Apple Pay"
  | "Google Pay"
  | "PayPal"
  | "Bank Transfer"
  | "Check";

export interface LineItem {
  id: string;
  qty: number;
  name: string;
  price: number;
}

export interface ReceiptData {
  style: StyleId;
  paper: PaperSize;

  business: {
    name: string;
    address: string;
    cityLine: string;
    phone: string;
    website: string;
    taxId: string;
    logo: string | null;
  };

  meta: {
    date: string;
    time: string;
    cashier: string;
    transactionId: string;
    register: string;
    storeNumber: string;
  };

  items: LineItem[];

  currency: string;
  taxRate: number;
  taxLabel: string;
  discount: number;
  tipRate: number;
  showTip: boolean;

  payment: {
    method: PaymentMethod;
    last4: string;
    approvalCode: string;
    changeDue: number;
  };

  footer: {
    headline: string;
    lines: string[];
    showBarcode: boolean;
    showSurvey: boolean;
    showSavings: boolean;
    savings: number;
  };

  options: {
    density: "normal" | "condensed" | "wide";
    fade: number;
    curl: boolean;
    torn: boolean;
    uppercase: boolean;
  };
}

export interface TemplateDef {
  slug: string;
  name: string;
  h1: string;
  category: string;
  blurb: string;
  intent: string;
  /** Long-form, type-specific page copy. */
  sections: { heading: string; body: string[] }[];
  fields: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  seed: Partial<ReceiptData>;
}
