import { COIN_GECKO_PRICE_API_URL, COLLATERAL_TO_COINGECKO } from "@/models";

type CoinGeckoResponse = {
  [key: string]: { usd: number };
};

export const fetchCollateralPrices = async () => {
  const res = await fetch(COIN_GECKO_PRICE_API_URL);
  const data: CoinGeckoResponse = await res.json();

  const prices: Record<string, number> = {};
  for (const [maker, cgId] of Object.entries(COLLATERAL_TO_COINGECKO)) {
    prices[maker] = data[cgId]?.usd || 0;
  }

  return prices;
};
