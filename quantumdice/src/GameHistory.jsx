import React from 'react';
import './GameHistory.css';

const GameHistory = () => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        <li>
          <span>Under 50.00</span>
          <span className="win">23.45</span>
          <span>1.98x</span>
        </li>
        <li>
          <span>Over 75.00</span>
          <span className="loss">88.12</span>
          <span>0.00x</span>
        </li>
        {/* More placeholder items */}
      </ul>
    </div>
  );
};

export default GameHistory;
