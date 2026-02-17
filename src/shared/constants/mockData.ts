export const MOCK_TOKEN_PRICES: Record<string, number> = {
  BTC: 43250,
  ETH: 2340,
  SOL: 98.5,
  USDT: 1.0,
  BNB: 312,
};

export const AVAILABLE_TOKENS = Object.keys(MOCK_TOKEN_PRICES);

export const getCurrentPrice = (tokenSymbol: string): number => {
  return MOCK_TOKEN_PRICES[tokenSymbol] || 0;
};

export const DEFAULT_TOKEN = 'BTC';
