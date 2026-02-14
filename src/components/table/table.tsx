import type { Position } from "@/models";
import { Row } from "./components/row/row";
import "./table.scss";
import { useState } from "react";

type TableProps = {
  positions: Position[];
};

export const Table = ({ positions }: TableProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const tableData = [...positions];

  const handleOnHover = (id: number) => {
    setHoveredId(id);
  };

  return (
    <div className="c-table">
      <div className="c-table__data">
        {tableData.map((pos, index) => (
          <>
            <Row
              key={`${pos.id}-${index}`}
              {...pos}
              onHover={() => handleOnHover(pos.id)}
              isHovered={hoveredId === pos.id}
            />
          </>
        ))}
      </div>
    </div>
  );
};
