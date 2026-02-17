import { ValidationState } from '@/src/entities/price-alert/types';
import { calculatePriceDifference } from '@/src/shared/lib/format';

// Normalize price input: "1,234.56" → "1234.56", "1.234,56" → "1234.56"
export const normalizePriceInput = (value: string): string => {
  if (!value) return '';

  let cleaned = value.replace(/[^\d.,-]/g, '');

  const lastComma = cleaned.lastIndexOf(',');
  const lastDot = cleaned.lastIndexOf('.');

  if (lastComma > lastDot) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    cleaned = cleaned.replace(/,/g, '');
  }

  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }

  if (cleaned.length > 1 && cleaned[0] === '0' && cleaned[1] !== '.') {
    cleaned = cleaned.replace(/^0+/, '');
  }

  return cleaned;
};

export const validatePrice = (
  value: string,
  currentPrice: number
): ValidationState => {
  const normalizedValue = normalizePriceInput(value);

  if (!normalizedValue || normalizedValue === '') {
    return {
      isValid: false,
      error: 'Enter price',
      normalizedValue,
    };
  }

  const numericValue = parseFloat(normalizedValue);
  if (isNaN(numericValue)) {
    return {
      isValid: false,
      error: 'Invalid number',
      normalizedValue,
    };
  }

  if (numericValue <= 0) {
    return {
      isValid: false,
      error: 'Price must be > 0',
      normalizedValue,
    };
  }

  if (numericValue < 0.0001) {
    return {
      isValid: false,
      error: 'Price must be > 0.0001',
      normalizedValue,
    };
  }

  const priceDifference = calculatePriceDifference(numericValue, currentPrice);
  
  if (priceDifference < 1) {
    return {
      isValid: true,
      warning: `Price is close to current (±${priceDifference.toFixed(2)}%)`,
      normalizedValue,
    };
  }

  return {
    isValid: true,
    normalizedValue,
  };
};
