import { fetchCollateralPrices } from "@/services/fetchCollateralPrices";
import { useEffect, useState } from "react";

export const useCollateralPrices = () => {
  const [prices, setPrices] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getPrices = async () => {
      try {
        const data = await fetchCollateralPrices();
        if (!cancelled) {
          setPrices(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.log(err);
        }
      }
    };

    getPrices();

    return () => {
      cancelled = true;
    };
  }, []);

  return prices;
};
