import { COLLATERAL_OPTIONS, type PositionReducerAction } from "@/models";
import { Input, ScanInfo, Select } from "../index";
import "./menu.scss";

type MenuProps = {
  collateral: string | null;
  startId: string;
  scanned: number;
  found: number;
  loading?: boolean;
  dispatch: (action: PositionReducerAction) => void;
};

export const Menu = ({
  collateral,
  startId,
  scanned,
  found,
  loading,
  dispatch,
}: MenuProps) => {
  return (
    <div className="c-menu">
      <Select
        label="Collateral Type"
        value={collateral}
        onChange={(value) =>
          dispatch({ type: "SET_COLLATERAL", payload: value })
        }
        options={COLLATERAL_OPTIONS}
        placeholder="All"
        loading={loading}
      />
      <Input
        label="Start ID"
        type="number"
        value={startId}
        onChange={(value) => dispatch({ type: "SET_START_ID", payload: value })}
        placeholder="1"
        dissabled={!collateral || loading}
      />
      <div className="c-menu__info">
        <ScanInfo scanned={scanned} found={found} />
      </div>
    </div>
  );
};
