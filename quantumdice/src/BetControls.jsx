import React from 'react';
import './BetControls.css';

const BetControls = ({ betAmount, setBetAmount, winChance, setWinChance, handleRollDice, rolling, betType, setBetType, targetNumber }) => {
  return (
    <div className="bet-controls">
      <div className="bet-type-toggle">
        <button
          className={betType === 'under' ? 'active' : ''}
          onClick={() => setBetType('under')}
        >
          Roll Under
        </button>
        <button
          className={betType === 'over' ? 'active' : ''}
          onClick={() => setBetType('over')}
        >
          Roll Over
        </button>
      </div>
      <div className="control-group">
        <label>Bet Amount</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
          disabled={rolling}
        />
      </div>
      <div className="control-group">
        <label>Win Chance</label>
        <input
          type="range"
          min="1"
          max="95"
          step="1"
          value={winChance}
          onChange={(e) => setWinChance(parseFloat(e.target.value))}
          disabled={rolling}
        />
        <span>{winChance.toFixed(2)}%</span>
      </div>
      <div className="control-group">
        <label>{betType === 'under' ? 'Roll Under' : 'Roll Over'}</label>
        <span>{targetNumber.toFixed(2)}</span>
      </div>
      <button className="roll-button" onClick={handleRollDice} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default BetControls;
