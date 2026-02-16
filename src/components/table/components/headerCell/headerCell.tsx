import multipleArrorw from "@assets/multipleArrow.svg";
import sortDirectionImg from "@assets/sortDirection.svg";
import { AnimatePresence, motion } from "motion/react";
import "./headerCell.scss";
import { popInOut } from "../../animations";
import { anim } from "@/util";

type HeaderCellProps = {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
  sortDirection?: "asc" | "desc";
};

export const HeaderCell = ({
  label,
  onClick,
  isSelected,
  sortDirection,
}: HeaderCellProps) => {
  return label === "owner" ? (
    <div className="c-header__cell-wrapper c-header__cell-wrapper--owner">
      <div className="c-header__cell">{label}</div>
    </div>
  ) : (
    <div className="c-header__cell-wrapper" onClick={onClick}>
      <div className="c-header__cell">{label}</div>
      <img
        className={`c-multiple-arrow ${isSelected && "selected"}`}
        src={multipleArrorw}
        alt="Multiple Arrow"
      />
      <AnimatePresence>
        {sortDirection && (
          <motion.img
            {...anim(popInOut)}
            animate={sortDirection === "asc" ? "asc" : "desc"}
            src={sortDirectionImg}
            alt="Sort Direction Arrow"
            className={`c-header__sort-indicator ${sortDirection}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
