import type { Position } from "@/models";
import { motion } from "motion/react";
import "./row.scss";

type RowProps = Position & {
  onHover: () => void;
  isHovered: boolean;
};

export const Row = ({
  id,
  ilk,
  owner,
  collateral,
  debt,
  onHover,
  isHovered,
}: RowProps) => {
  const formattedDebt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(debt));

  return (
    <>
      <div className="c-row" onMouseEnter={() => onHover()}>
        <div className="c-cell c-cell--id">{id}</div>
        <div className="c-cell c-cell--owner">{owner}</div>
        <div className="c-cell c-cell--collateral">
          <div className="c-cell__colateral">
            {Number(collateral).toFixed(2)}
          </div>
          <div className="c-cell__ilk">{ilk}</div>
        </div>
        <div className="c-cell c-cell--debt">{formattedDebt}</div>
        <div className="c-cell c-cell--debt">{debt}</div>
        {isHovered && (
          <motion.div
            layoutId="highlight-row"
            className="c-highlight"
            transition={{
              duration: 0.22,
              ease: [0.76, 0, 0.24, 1],
            }}
          ></motion.div>
        )}
      </div>
    </>
  );
};
