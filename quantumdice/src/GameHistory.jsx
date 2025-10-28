import React, { useRef, useEffect } from 'react';
import './GameHistory.css';

const GameHistory = ({ gameHistory }) => {
  const historyRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      const itemHeight = itemRef.current.offsetHeight;
      historyRef.current.style.maxHeight = `${itemHeight * 7}px`;
    }
  }, [gameHistory]);

  return (
    <div className="game-history" ref={historyRef}>
      <h2>Game History</h2>
      <ul>
        {gameHistory.length === 0 ? (
          <p>No games played yet.</p>
        ) : (
          gameHistory.map((game, index) => (
            <li key={index} ref={index === 0 ? itemRef : null}>
              <div className="game-result">
                <span>{game.betType} {game.target.toFixed(2)}</span>
                <span className={game.win ? 'win' : 'loss'}>{game.roll.toFixed(2)}</span>
                <span>{game.payout.toFixed(2)}x</span>
              </div>
              <div className="game-seed">
                <span>Server Seed: {game.serverSeed}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GameHistory;
