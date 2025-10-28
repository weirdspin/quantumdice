import React, { useState, useEffect } from 'react';
import BetControls from './BetControls';
import PayoutDisplay from './PayoutDisplay';
import GameHistory from './GameHistory';
import { calculatePayout, generateServerSeed, getRollResult } from './gameLogic';
import './App.css';

function App() {
  const [balance, setBalance] = useState(1000.00);
  const [betAmount, setBetAmount] = useState(10.00);
  const [sliderValue, setSliderValue] = useState(50.00);
  const [winChance, setWinChance] = useState(50.00);
  const [payout, setPayout] = useState(1.98);
  const [gameHistory, setGameHistory] = useState([]);

  // Provably Fair State
  const [serverSeed, setServerSeed] = useState(generateServerSeed());
  const [clientSeed, setClientSeed] = useState('lucky'); // User-configurable
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    setWinChance(sliderValue);
    const newPayout = calculatePayout(sliderValue);
    setPayout(newPayout);
  }, [sliderValue]);

  const handleRollDice = async () => {
    if (balance < betAmount) {
      alert("You don't have enough balance to make this bet.");
      return;
    }

    const roll = await getRollResult(serverSeed, clientSeed, nonce);
    const win = roll < sliderValue;

    const newBalance = win ? balance + betAmount * (payout - 1) : balance - betAmount;
    setBalance(newBalance);

    const game = {
      betType: 'Under',
      target: sliderValue,
      roll,
      win,
      payout: win ? payout : 0,
    };
    setGameHistory([game, ...gameHistory]);

    setNonce(nonce + 1);
    setServerSeed(generateServerSeed()); // Generate a new seed for the next roll
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Quantum Dice</h1>
        <div className="balance">
          <span>Balance:</span>
          <strong>{balance.toFixed(2)}</strong>
        </div>
      </header>
      <main className="app-main">
        <BetControls
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          handleRollDice={handleRollDice}
        />
        <PayoutDisplay
          winChance={winChance}
          payout={payout}
          betAmount={betAmount}
        />
        <GameHistory gameHistory={gameHistory} />
      </main>
    </div>
  );
}

export default App;
