import "./title.scss";

export const Title = () => {
  return (
    <div className="c-title-wrapper">
      <div className="c-title-container">
        <h2 className="c-title">Select a Collateral Type and enter</h2>
        <h2 className="c-title">a CDP ID to find matching results.</h2>
      </div>

      <div className="c-title-positions">
        <h3 className="c-positions__amount">6,821</h3>
        <p className="c-positions__label">Positons</p>
      </div>
      <div className="c-title-tvl">
        <h3 className="c-tvl__amount">$7.20B</h3>
        <div className="c-tvl__label">TVL</div>
      </div>
    </div>
  );
};
