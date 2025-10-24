import React from 'react';
import BetControls from './BetControls';
import PayoutDisplay from './PayoutDisplay';
import GameHistory from './GameHistory';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Quantum Dice</h1>
        <div className="balance">
          <span>Balance:</span>
          <strong>1,000.00</strong>
        </div>
      </header>
      <main className="app-main">
        <BetControls />
        <PayoutDisplay />
        <GameHistory />
      </main>
    </div>
  );
}

export default App;
