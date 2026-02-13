import type { Position } from "@/models";
import { findPositions } from "@/services/fetchPositions";
import { useCallback, useState } from "react";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready to test");

  const scan = useCallback(async (startId: number, targetIlk: string) => {
    setLoading(true);
    setPositions([]);
    setStatus("Scanning...");

    try {
      const data = await findPositions(startId, targetIlk, (scanned, found) => {
        console.log(data);
        setStatus(`Scanned: ${scanned} | Found: ${found}/20`);
      });

      setPositions(data);
      setStatus("Done!");
    } catch (error) {
      console.error(error);
      setStatus("Error: Check console");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    positions,
    loading,
    status,
    scan,
  };
};
