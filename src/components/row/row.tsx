import type { Position } from "@/models";
import { getLiquidationRatioClass } from "@/util";
import { motion } from "motion/react";
import { useState } from "react";
import "./row.scss";

export const Row = ({ id, ilk, owner, collateral, debt, ratio }: Position) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const formattedDebt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(+debt);

  const safeRatio = ratio ?? 0;
  const liquidationRatio = getLiquidationRatioClass(ratio ?? 0, ilk);
  const formattedRatio = safeRatio.toFixed(2) ?? "0.00";
  const [integer, decimal] = formattedRatio.split(".");

  return (
    <motion.div
      layout
      className="c-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1.2,
        layout: {
          duration: 0.62,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <div className="c-cell c-cell--id">{id}</div>
      <div className="c-cell c-cell--owner">{owner}</div>
      <div className="c-cell c-cell--collateral">
        <div className="c-cell__colateral">{Number(collateral).toFixed(2)}</div>
        <div className="c-cell__ilk">{ilk}</div>
      </div>
      <div className="c-cell c-cell--debt">{formattedDebt}</div>
      <div className={`c-cell c-cell--ratio ${liquidationRatio}`}>
        {integer}
        <span>.{decimal}%</span>
      </div>
      {isHovered && (
        <motion.div
          layoutId="highlight-row"
          className="c-highlight"
          transition={{
            duration: 0.22,
            ease: [0.76, 0, 0.24, 1],
          }}
          exit={{
            opacity: 0,
          }}
        ></motion.div>
      )}
    </motion.div>
  );
};
