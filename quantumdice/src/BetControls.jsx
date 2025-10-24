import React from 'react';
import './BetControls.css';

const BetControls = () => {
  return (
    <div className="bet-controls">
      <h2>Bet Controls</h2>
      <div className="control-group">
        <label>Bet Amount</label>
        <input type="number" defaultValue="10" />
      </div>
      <div className="control-group">
        <label>Roll Under</label>
        <input type="range" min="0.01" max="99.99" step="0.01" defaultValue="50" />
        <span>50.00</span>
      </div>
      <button className="roll-button">Roll Dice</button>
    </div>
  );
};

export default BetControls;
