import type { Position } from "@/models";
import { getLiquidationRatioClass } from "@/util";
import { motion } from "motion/react";
import "./positionCard.scss";

export const PositionCard = ({
  id,
  ilk,
  owner,
  collateral,
  debt,
  ratio,
}: Position) => {
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
      className="c-position-card"
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.22,
        layout: {
          duration: 0.62,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <motion.div className="c-position-card-main">
        <div className="c-position-heading">
          <div className="c-position-heading__left">
            <div className="c-position-cell__label c-position-cell__label--heading">
              Ratio
            </div>
            <div
              className={`c-position-cell__value c-position-cell__value--heading c-position-cell__value--ratio ${liquidationRatio}`}
            >
              {integer}
              <span>.{decimal}%</span>
            </div>
          </div>
          <div className="c-position-heading__right">
            <p className={`c-liquidation-ratio ${liquidationRatio}`}>
              {liquidationRatio}
            </p>
          </div>
        </div>
        <div className="c-position-cell-wrapper">
          <span className="c-position-cell__label">Collateral</span>
          <div className="c-position-cell">
            <div className="c-position-cell__value">
              {(+collateral).toFixed(2)}
            </div>
            <div className="c-position-cell__ilk">{ilk}</div>
          </div>
        </div>
        <div className="c-position-cell-wrapper">
          <span className="c-position-cell__label">Debt</span>
          <div className="c-position-cell__value">{formattedDebt}</div>
        </div>
        <div className="c-position-cell-wrapper">
          <div className="c-position-cell__label">ID:</div>
          <div className="c-position-cell__value">{id}</div>
        </div>
        <div className="c-position-cell-wrapper">
          <div className="c-position-cell__label">Owner:</div>
          <div className="c-position-cell__value c-position-cell__value--owner">
            {owner}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
