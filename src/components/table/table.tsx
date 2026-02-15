import { useMediaQuery, useSort } from "@/hooks";
import { POSITION_KEYS, type Position } from "@/models";
import { calculateRatio } from "@/util";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "../loader/loader";
import { HeaderCell } from "./components/headerCell";
import { Row } from "./components/row/row";
import { PositionCard } from "./components/positionCard";
import "./table.scss";

type TableProps = {
  positions: Position[];
  collateralPrices: Record<string, number>;
  loading?: boolean;
};

export const Table = ({ positions, collateralPrices, loading }: TableProps) => {
  const isTablet = useMediaQuery("tablet");

  const Component = isTablet ? PositionCard : Row;

  const tableData = positions.map((pos) => {
    const price = collateralPrices?.[pos.ilk] ?? 0;
    return {
      ...pos,
      ratio: calculateRatio(pos.collateral, pos.debt, price),
    };
  });

  const { sortKey, sortDirection, setKey, sortedData } = useSort(tableData);

  const columnLabels = POSITION_KEYS;

  return (
    <div className="c-table">
      <div className="c-table__header-row">
        {columnLabels.map((label) => (
          <HeaderCell
            key={label}
            label={label}
            isSelected={sortKey === label}
            onClick={() => setKey(label as keyof Position)}
            sortDirection={sortKey === label ? sortDirection : undefined}
          />
        ))}
      </div>
      <motion.div layout className="c-table__data">
        <AnimatePresence>
          {loading ? (
            <Loader />
          ) : (
            sortedData.map((pos) => <Component key={pos.id} {...pos} />)
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
