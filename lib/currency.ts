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

export function money(value: number, currency: string): string {
  const c = CURRENCIES[currency] ?? CURRENCIES.USD;
  const zeroDecimal = currency === "JPY";
  const n = zeroDecimal
    ? Math.round(value).toLocaleString("en-US")
    : value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${c.symbol}${n}`;
}

export function plain(value: number, currency: string): string {
  const zeroDecimal = currency === "JPY";
  return zeroDecimal ? String(Math.round(value)) : value.toFixed(2);
}
