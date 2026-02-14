import multipleArrorw from "@assets/multipleArrow.svg";
import sortDirectionImg from "@assets/sortDirection.svg";
import "./headerCell.scss";

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
      {!isSelected && <img src={multipleArrorw} alt="Multiple Arrow" />}
      {sortDirection && (
        <img
          src={sortDirectionImg}
          alt="Sort Direction Arrow"
          className={`c-header__sort-indicator ${sortDirection}`}
        />
      )}
    </div>
  );
};
