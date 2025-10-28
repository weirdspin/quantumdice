import React from 'react';
import { useCountUp } from './hooks/useCountUp';
import './PayoutDisplay.css';

const PayoutDisplay = ({ winChance, payout, betAmount, rollResult, lastRollWin }) => {
  const count = useCountUp(rollResult || 0, 2000);

  const resultClassName = `roll-result-animation ${
    lastRollWin === true ? 'win' : lastRollWin === false ? 'loss' : ''
  }`;

  return (
    <div className="payout-display">
      <h2>Live Payout</h2>
      <div className="payout-info">
        <div className="info-box">
          <span>Win Chance</span>
          <strong>{winChance.toFixed(2)}%</strong>
        </div>
        <div className="info-box">
          <span>Multiplier</span>
          <strong>{payout.toFixed(2)}x</strong>
        </div>
        <div className="info-box">
          <span>Payout</span>
          <strong>{(betAmount * payout).toFixed(2)}</strong>
        </div>
      </div>
      <div className={resultClassName}>
        {rollResult !== null ? count.toFixed(2) : '0.00'}
      </div>
    </div>
  );
};

export default PayoutDisplay;
