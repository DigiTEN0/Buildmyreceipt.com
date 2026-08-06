export const CURRENCIES: Record<string, { symbol: string; code: string; label: string }> = {
  USD: { symbol: "$", code: "USD", label: "US Dollar" },
  EUR: { symbol: "€", code: "EUR", label: "Euro" },
  GBP: { symbol: "£", code: "GBP", label: "British Pound" },
  CAD: { symbol: "$", code: "CAD", label: "Canadian Dollar" },
  AUD: { symbol: "$", code: "AUD", label: "Australian Dollar" },
  INR: { symbol: "₹", code: "INR", label: "Indian Rupee" },
  JPY: { symbol: "¥", code: "JPY", label: "Japanese Yen" },
  PHP: { symbol: "₱", code: "PHP", label: "Philippine Peso" },
  MXN: { symbol: "$", code: "MXN", label: "Mexican Peso" },
  BRL: { symbol: "R$", code: "BRL", label: "Brazilian Real" },
  ZAR: { symbol: "R", code: "ZAR", label: "South African Rand" },
  AED: { symbol: "د.إ", code: "AED", label: "UAE Dirham" },
  NGN: { symbol: "₦", code: "NGN", label: "Nigerian Naira" },
  SGD: { symbol: "$", code: "SGD", label: "Singapore Dollar" },
};

/**
 * Digit grouping differs by currency, not just the symbol. India groups in
 * lakh/crore (1,00,000) rather than thousands (100,000) — getting this wrong is
 * immediately visible to an Indian reader.
 */
const GROUPING: Record<string, string> = {
  INR: "en-IN",
};

const ZERO_DECIMAL = new Set(["JPY"]);

/** Amount with digit grouping, no symbol. */
export function plain(value: number, currency: string): string {
  const loc = GROUPING[currency] ?? "en-US";
  const digits = ZERO_DECIMAL.has(currency) ? 0 : 2;
  return value.toLocaleString(loc, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Amount with grouping and the currency symbol. */
export function money(value: number, currency: string): string {
  const c = CURRENCIES[currency] ?? CURRENCIES.USD;
  return `${c.symbol}${plain(value, currency)}`;
}
