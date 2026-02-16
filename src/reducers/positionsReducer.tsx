import type { PositionReducerAction, PositionState } from "@/models";

export const positionsReducer = (
  state: PositionState,
  action: PositionReducerAction,
): PositionState => {
  switch (action.type) {
    case "SET_START_ID":
      return { ...state, startId: action.payload };
    case "SET_COLLATERAL":
      return { ...state, collateral: action.payload };
    case "SET_POSITIONS":
      return { ...state, positions: action.payload };
    case "SET_PROGRESS":
      return {
        ...state,
        scanned: action.payload.scanned,
        found: action.payload.found,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_PROGRESS":
      return { ...state, scanned: 0, found: 0, positions: [] };
    default:
      return state;
  }
};
