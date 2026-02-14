export const calculateRatio = (
  colateral: string,
  debt: string,
  colateralDolarValue: number,
): number => {
  if (+debt === 0) return 0;

  return parseFloat(
    (((+colateral * colateralDolarValue) / +debt) * 100).toFixed(2),
  );
};
