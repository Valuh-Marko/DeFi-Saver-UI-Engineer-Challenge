export type Position = {
  id: number;
  ilk: string;
  urn: string;
  owner: string;
  collateral: string;
  debt: string;
  ratio?: number;
};

export const POSITION_KEYS: (keyof Position)[] = [
  "id",
  "owner",
  "collateral",
  "debt",
  "ratio",
];

export type PositionState = {
  startId: string;
  collateral: string | null;
  positions: Position[];
  scanned: number;
  found: number;
  loading: boolean;
  error: string;
};

export type PositionReducerAction =
  | { type: "SET_START_ID"; payload: string }
  | { type: "SET_COLLATERAL"; payload: string | null }
  | { type: "SET_POSITIONS"; payload: Position[] }
  | { type: "SET_PROGRESS"; payload: { scanned: number; found: number } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "START_SEARCH" }
  | { type: "RESET_PROGRESS" };
