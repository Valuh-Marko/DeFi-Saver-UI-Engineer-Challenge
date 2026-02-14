import { LIQUIDATION_RATIOS } from "@/models";

export const getLiquidationRatioClass = (ratio: number, collateral: string) => {
  const liquidationRatio = LIQUIDATION_RATIOS[collateral];
  if (!liquidationRatio) return "risky";
  return ratio < liquidationRatio ? "risky" : "safe";
};
