import type { Position } from "@/models";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { anim, getLiquidationRatioClass } from "@/util";
import { opacity } from "./animations";
import "./positionCard.scss";

export const PositionCard = ({
  id,
  ilk,
  owner,
  collateral,
  debt,
  ratio,
}: Position) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const formattedDebt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(+debt);

  return (
    <motion.div
      layout
      className="c-position-card"
      onClick={() => setExpanded((prev) => !prev)}
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
        <div className="c-position-cell-wrapper">
          <div className="c-position-cell-label">ID:</div>
          <div className="c-position-cell-value c-position-cell-value--id">
            {id}
          </div>
        </div>
        <div className="c-position-cell-wrapper">
          <div className="c-position-cell">
            <span className="c-position-cell-label">Col: </span>
            <div className="c-position-cell__colateral">
              {(+collateral).toFixed(2)}
            </div>
            <div className="c-position-cell__ilk">{ilk}</div>
          </div>
          <div className="c-position-cell">
            <span className="c-position-cell-label">Dept: </span>
            <div className="c-position-cell__debt">{formattedDebt}</div>
          </div>
        </div>
        <div className="c-position-cell-wrapper">
          <div className="c-position-cell-label">Ratio:</div>
          <div
            className={`c-position-cell-value c-position-cell-value--ratio ${getLiquidationRatioClass(ratio ?? 0, ilk)}`}
          >
            {ratio === 0 ? (
              "0"
            ) : (
              <>
                {String(ratio).split(".")[0]}
                <span>.{String(ratio).split(".")[1]}%</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          {...anim(opacity)}
          animate={expanded ? "enter" : "exit"}
          className="c-position-card-details"
        >
          <div className="c-position-cell-label">Owner:</div>
          <div className="c-position-cell-value c-position-cell-value--owner">
            {owner}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
