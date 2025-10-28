import React from 'react';
import './GameHistory.css';

const GameHistory = ({ gameHistory }) => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {gameHistory.length === 0 ? (
          <p>No games played yet.</p>
        ) : (
          gameHistory.map((game, index) => (
            <li key={index}>
              <span>{game.betType} {game.target.toFixed(2)}</span>
              <span className={game.win ? 'win' : 'loss'}>{game.roll.toFixed(2)}</span>
              <span>{game.payout.toFixed(2)}x</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GameHistory;
