import multipleArrorw from "@assets/multipleArrow.svg";
import sortDirectionImg from "@assets/sortDirection.svg";
import { AnimatePresence, motion } from "motion/react";
import { anim } from "@/util";
import { popInOut } from "./animations";
import "./headerCell.scss";

type HeaderCellProps = {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
  sortDirection?: "asc" | "desc";
  isSortable: boolean;
};

export const HeaderCell = ({
  label,
  onClick,
  isSelected,
  sortDirection,
  isSortable,
}: HeaderCellProps) => {
  if (!isSortable) {
    return (
      <div className="c-header__cell-wrapper c-header__cell-wrapper--owner">
        <div className="c-header__cell">{label}</div>
      </div>
    );
  }

  return (
    <div
      className={`c-header__cell-wrapper ${isSelected ? "is-selected" : ""}`}
      onClick={onClick}
    >
      <div className="c-header__cell">{label}</div>
      <img
        className={`c-multiple-arrow ${isSelected ? "is-selected" : ""}`}
        src={multipleArrorw}
        alt="Multiple Arrow"
      />
      <AnimatePresence>
        {sortDirection && (
          <motion.img
            {...anim(popInOut)}
            animate={sortDirection}
            src={sortDirectionImg}
            alt="Sort Direction Arrow"
            className={`c-header__sort-indicator ${sortDirection}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
