export interface PriceAlert {
  id: string;
  tokenSymbol: string;
  condition: 'above' | 'below';
  targetPrice: number;
  createdAt: Date;
}

export interface ValidationState {
  isValid: boolean;
  error?: string;
  warning?: string;
  normalizedValue: string;
}
