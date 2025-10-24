import React from 'react';
import './PayoutDisplay.css';

const PayoutDisplay = () => {
  return (
    <div className="payout-display">
      <h2>Live Payout</h2>
      <div className="payout-info">
        <div className="info-box">
          <span>Win Chance</span>
          <strong>50%</strong>
        </div>
        <div className="info-box">
          <span>Multiplier</span>
          <strong>1.98x</strong>
        </div>
        <div className="info-box">
          <span>Payout</span>
          <strong>19.80</strong>
        </div>
      </div>
      <div className="roll-result-animation">
        0.00
      </div>
    </div>
  );
};

export default PayoutDisplay;
