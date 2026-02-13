import { VAULT_MANAGER_ABI, VAULT_MANAGER_ADDRESS } from "@/contracts";
import { client } from "@/lib";
import type { Position } from "@/models";
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
  const BATCH_SIZE = 50;
  const CONCURRENCY = 5;

  while (foundPositions.length < 20 && searchStep < 10000) {
    const waveSize = BATCH_SIZE * CONCURRENCY;
    const waveIndices = Array.from(
      { length: waveSize },
      (_, i) => searchStep + i,
    );

    const allWaveIds = waveIndices
      .map((idx) => getExpandingId(startId, idx))
      .filter((id) => id > 0);

    const batches = [];
    for (let i = 0; i < allWaveIds.length; i += BATCH_SIZE) {
      batches.push(allWaveIds.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
      const positions = await LIMIT(() => processBatch(batch, targetIlk));
      foundPositions.push(...positions);

      searchStep += batch.length;
      onProgress(searchStep, Math.min(foundPositions.length, 20));

      if (foundPositions.length >= 20) break;
    }
  }

  return foundPositions
    .sort((a, b) => Math.abs(a.id - startId) - Math.abs(b.id - startId))
    .slice(0, 20);
}
