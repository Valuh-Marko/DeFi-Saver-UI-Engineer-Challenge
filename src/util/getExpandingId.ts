export const getExpandingId = (center: number, index: number): number => {
  if (index === 0) return center;
  const distance = Math.ceil(index / 2);
  const isNegative = index % 2 !== 0;
  return isNegative ? center - distance : center + distance;
};
