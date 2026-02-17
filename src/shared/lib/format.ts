export const formatPrice = (price: number, decimals: number = 2): string => {
  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
};

export const parsePrice = (value: string): number => {
  const cleanValue = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleanValue);
};

export const calculatePriceDifference = (
  targetPrice: number,
  currentPrice: number
): number => {
  if (currentPrice === 0) return 0;
  return Math.abs(((targetPrice - currentPrice) / currentPrice) * 100);
};

// "12" -> "12.00", "12.5" -> "12.50", "" -> ""
export const formatCurrencyOnBlur = (value: string): string => {
  if (!value || value === "") return "";

  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  if (isNaN(num)) return "";
  return num.toFixed(2);
};
