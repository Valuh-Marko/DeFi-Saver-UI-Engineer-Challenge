import "./scanInfo.scss";

type ScanInfoProps = {
  scanned: number;
  found: number;
};

export const ScanInfo = ({ scanned, found }: ScanInfoProps) => {
  if (scanned === 0) return null;

  return (
    <div className="c-scan-info">
      Scanned <span>{scanned}</span>
      {found >= 20 && (
        <>
          ; Showing a total of <span>{found}</span> assets.
        </>
      )}
    </div>
  );
};
