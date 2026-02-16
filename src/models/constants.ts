export const COLLATERAL_OPTIONS = [
  { label: "ETH-A", value: "ETH-A" },
  { label: "WBTC-A", value: "WBTC-A" },
  { label: "USDC-A", value: "USDC-A" },
];

export const LIQUIDATION_RATIOS: Record<string, number> = {
  "ETH-A": 150,
  "WBTC-A": 150,
  "USDC-A": 110,
};

export const COIN_GECKO_PRICE_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,wrapped-bitcoin,usd-coin&vs_currencies=usd";

export const COLLATERAL_TO_COINGECKO: Record<string, string> = {
  "ETH-A": "ethereum",
  "WBTC-A": "wrapped-bitcoin",
  "USDC-A": "usd-coin",
};

export const PAGE_SIZE = 20;
export const MAX_RESULTS = 20;
export const BATCH_SIZE = 50;
export const MAX_SCAN_STEPS = 5000;
