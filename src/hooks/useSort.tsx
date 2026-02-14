import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc";

export function useSort<T extends Record<string, unknown>>(data: T[]) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedData = useMemo(() => {
    const copiedData = [...data];
    if (!sortKey || sortKey === "owner") return copiedData;

    return copiedData.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      const aNum = parseFloat(aValue as string);
      const bNum = parseFloat(bValue as string);
      const bothNumbers = !isNaN(aNum) && !isNaN(bNum);

      if (bothNumbers) {
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      } else {
        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });
  }, [data, sortKey, sortDirection]);

  const setKey = (key: keyof T) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return {
    sortKey,
    sortDirection,
    setKey,
    setDirection: setSortDirection,
    sortedData,
  };
}
