import { Header, Input, Select, Table } from "@/components";
import { COLLATERAL_OPTIONS } from "@/models";
import { positionsReducer } from "@/reducers";
import { findPositions } from "@/services";
import { debounce } from "@/util";
import bgImage from "@assets/bg.png";
import { useCallback, useEffect, useReducer } from "react";
import { Title } from "./components";
import "./homePage.scss";
import { useCollateralPrices } from "@/hooks/useCollateralPrices";

export const HomePage = () => {
  const [state, dispatch] = useReducer(positionsReducer, {
    startId: "",
    collateral: null,
    positions: [],
    scanned: 0,
    found: 0,
    loading: false,
    error: "",
  });

  const collateralPrices = useCollateralPrices();

  const debouncedSearch = useCallback(
    debounce(async (idStr: string, collateral: string | null) => {
      if (!idStr || !collateral) return;
      const id = Number(idStr);
      if (isNaN(id)) {
        dispatch({ type: "SET_ERROR", payload: "Invalid ID" });
        return;
      }

      dispatch({ type: "SET_ERROR", payload: "" });
      dispatch({ type: "RESET_PROGRESS" });
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const results = await findPositions(
          id,
          collateral,
          (scannedCount, foundCount) => {
            dispatch({
              type: "SET_PROGRESS",
              payload: { scanned: scannedCount, found: foundCount },
            });
          },
        );
        dispatch({ type: "SET_POSITIONS", payload: results });
      } catch (err) {
        console.error(err);
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch positions" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, 700),
    [],
  );

  useEffect(() => {
    debouncedSearch(state.startId, state.collateral);
  }, [state.startId, state.collateral, debouncedSearch]);

  return (
    <div className="c-page">
      <img src={bgImage} alt="Background" className="c-page-background" />
      <div className="c-container">
        <Header />
        <Title />
        <div className="positions-search">
          <div
            className="inputs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Select
              label="Collateral Type"
              value={state.collateral}
              onChange={(value) =>
                dispatch({ type: "SET_COLLATERAL", payload: value })
              }
              options={COLLATERAL_OPTIONS}
              placeholder="All"
            />
            <Input
              label="Start ID"
              type="number"
              value={state.startId}
              onChange={(value) =>
                dispatch({ type: "SET_START_ID", payload: value })
              }
              placeholder="1"
              dissabled={state.loading || !state.collateral}
            />
            <p>
              Scanned: {state.scanned}, Found: {state.found}
            </p>
          </div>
        </div>

        <Table
          positions={state.positions}
          collateralPrices={collateralPrices ?? {}}
          loading={state.loading}
        />
      </div>
    </div>
  );
};
