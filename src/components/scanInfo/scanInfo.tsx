import { PAGE_SIZE } from "@/models";
import "./scanInfo.scss";

type ScanInfoProps = {
  scanned: number;
  found: number;
};

export const ScanInfo = ({ scanned, found }: ScanInfoProps) => {
  if (scanned === 0) return null;

  const isLimited = found >= PAGE_SIZE;

  return (
    <div className="c-scan-info">
      Scanned <span>{scanned}</span> assets.
      {isLimited && (
        <>
          {" "}
          Showing <span>{found}</span>.
        </>
      )}
    </div>
  );
};
