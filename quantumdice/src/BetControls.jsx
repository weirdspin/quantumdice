import React from 'react';
import './BetControls.css';

const BetControls = ({ betAmount, setBetAmount, sliderValue, setSliderValue, handleRollDice }) => {
  return (
    <div className="bet-controls">
      <h2>Bet Controls</h2>
      <div className="control-group">
        <label>Bet Amount</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="control-group">
        <label>Roll Under</label>
        <input
          type="range"
          min="2"
          max="98"
          step="1"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
        />
        <span>{sliderValue.toFixed(2)}</span>
      </div>
      <button className="roll-button" onClick={handleRollDice}>Roll Dice</button>
    </div>
  );
};

export default BetControls;
