import { useMediaQuery, useSort } from "@/hooks";
import { POSITION_KEYS, type Position } from "@/models";
import { anim, calculateRatio } from "@/util";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "../loader/loader";
import { HeaderCell } from "../headerCell";
import { Row } from "../row/row";
import { PositionCard } from "../positionCard";
import "./table.scss";
import { opacity } from "./animations";

type TableProps = {
  scanned: number;
  positions: Position[];
  collateralPrices: Record<string, number>;
  loading?: boolean;
};

export const Table = ({
  positions,
  collateralPrices,
  loading,
  scanned,
}: TableProps) => {
  const isTablet = useMediaQuery("tablet");

  const TableContentComponent = isTablet ? PositionCard : Row;

  const tableData = positions.map((pos) => {
    const price = collateralPrices?.[pos.ilk] ?? 0;
    return {
      ...pos,
      ratio: calculateRatio(pos.collateral, pos.debt, price),
    };
  });

  const { sortKey, sortDirection, setKey, sortedData } = useSort(tableData);

  const hasData = sortedData.length > 0;
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
            isSortable={label === "owner" ? false : true}
            sortDirection={sortKey === label ? sortDirection : undefined}
          />
        ))}
      </div>
      <motion.div layout className="c-table__data">
        <AnimatePresence>
          {loading && <Loader />}

          {!loading && !hasData && scanned && (
            <motion.div
              {...anim(opacity)}
              key="empty"
              className="c-table__empty"
            >
              No positions found
            </motion.div>
          )}

          {!loading &&
            hasData &&
            sortedData.map((pos) => (
              <TableContentComponent key={pos.id} {...pos} />
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
