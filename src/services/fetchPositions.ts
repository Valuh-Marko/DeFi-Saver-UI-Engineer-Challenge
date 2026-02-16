/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { VAULT_MANAGER_ABI, VAULT_MANAGER_ADDRESS } from "@/contracts";
import { client } from "@/lib";
import {
  BATCH_SIZE,
  MAX_RESULTS,
  MAX_SCAN_STEPS,
  type Position,
} from "@/models";
import pLimit from "p-limit";
import { formatUnits, hexToString } from "viem";

const LIMIT = pLimit(5);

const getExpandingId = (center: number, index: number): number => {
  if (index === 0) return center;
  const distance = Math.ceil(index / 2);
  const isNegative = index % 2 !== 0;
  return isNegative ? center - distance : center + distance;
};

const processBatch = async (
  batchIds: number[],
  targetIlk: string,
): Promise<Position[]> => {
  const results = await client.multicall({
    contracts: batchIds.map((id) => ({
      address: VAULT_MANAGER_ADDRESS,
      abi: VAULT_MANAGER_ABI,
      functionName: "getCdpInfo",
      args: [BigInt(id)],
    })),
  });

  return results
    .map((res, i) => {
      if (res.status !== "success") return null;

      const [urn, owner, userAddr, ilk, collateral, debt] = res.result as [
        `0x${string}`,
        `0x${string}`,
        `0x${string}`,
        `0x${string}`,
        bigint,
        bigint,
      ];

      const decodedIlk = hexToString(ilk).replace(/\0/g, "");

      if (decodedIlk !== targetIlk) return null;
      return {
        id: batchIds[i],
        urn,
        owner,
        userAddr,
        ilk: decodedIlk,
        collateral: formatUnits(collateral, 18),
        debt: formatUnits(debt, 18),
      };
    })
    .filter((pos): pos is Position => pos !== null);
};

export async function findPositions(
  startId: number,
  targetIlk: string,
  onProgress: (scanned: number, found: number) => void,
) {
  const foundPositions: Position[] = [];

  let searchStep = 0;

  while (foundPositions.length < MAX_RESULTS && searchStep < MAX_SCAN_STEPS) {
    const waveSize = BATCH_SIZE * 5;
    const waveIndices = Array.from(
      { length: waveSize },
      (_, i) => searchStep + i,
    );
    const allWaveIds = waveIndices
      .map((idx) => getExpandingId(startId, idx))
      .filter((id) => id > 0);

    const batches: number[][] = [];
    for (let i = 0; i < allWaveIds.length; i += BATCH_SIZE) {
      batches.push(allWaveIds.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
      if (foundPositions.length >= MAX_RESULTS) break;
      await LIMIT(async () => {
        if (foundPositions.length >= MAX_RESULTS) return;
        const positions = await processBatch(batch, targetIlk);
        foundPositions.push(...positions);

        searchStep += batch.length;
        onProgress(searchStep, Math.min(foundPositions.length, MAX_RESULTS));
      });
    }
  }

  return foundPositions
    .sort((a, b) => Math.abs(a.id - startId) - Math.abs(b.id - startId))
    .slice(0, MAX_RESULTS);
}
