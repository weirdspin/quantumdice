import React, { useState, useEffect, useRef } from 'react';
import BetControls from './BetControls';
import PayoutDisplay from './PayoutDisplay';
import GameHistory from './GameHistory';
import ProvablyFair from './ProvablyFair';
import SettingsDialog from './SettingsDialog';
import { calculatePayout, generateServerSeed, getRollResult } from './gameLogic';
import './App.css';

// Helper function to hash the server seed
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function App() {
  const [balance, setBalance] = useState(1000.00);
  const [betAmount, setBetAmount] = useState(10.00);
  const [sliderValue, setSliderValue] = useState(50.00);
  const [winChance, setWinChance] = useState(50.00);
  const [payout, setPayout] = useState(1.98);
  const [gameHistory, setGameHistory] = useState([]);
  const [rollResult, setRollResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Provably Fair State
  const [serverSeed, setServerSeed] = useState(generateServerSeed());
  const [serverSeedHash, setServerSeedHash] = useState('');
  const [clientSeed, setClientSeed] = useState('lucky'); // User-configurable
  const [nonce, setNonce] = useState(0);

  // Audio State
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const rollSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const lossSoundRef = useRef(null);

  const playSound = (audioRef) => {
    if (!isMuted && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setWinChance(sliderValue);
    const newPayout = calculatePayout(sliderValue);
    setPayout(newPayout);
  }, [sliderValue]);

  useEffect(() => {
    sha256(serverSeed).then(setServerSeedHash);
  }, [serverSeed]);

  useEffect(() => {
    if (rollSoundRef.current) {
      rollSoundRef.current.volume = volume;
      winSoundRef.current.volume = volume;
      lossSoundRef.current.volume = volume;
    }
  }, [volume]);

  const handleRollDice = async () => {
    if (balance < betAmount) {
      alert("You don't have enough balance to make this bet.");
      return;
    }

    setRolling(true);
    playSound(rollSoundRef);
    const roll = await getRollResult(serverSeed, clientSeed, nonce);
    setRollResult(roll);

    setTimeout(() => {
      const win = roll < sliderValue;
      if (win) {
        playSound(winSoundRef);
      } else {
        playSound(lossSoundRef);
      }

      const newBalance = win ? balance + betAmount * (payout - 1) : balance - betAmount;
      setBalance(newBalance);

      const game = {
        betType: 'Under',
        target: sliderValue,
        roll,
        win,
        payout: win ? payout : 0,
        serverSeed, // Reveal the seed after the roll
      };
      setGameHistory([game, ...gameHistory]);

      setNonce(nonce + 1);
      setServerSeed(generateServerSeed()); // Generate a new seed for the next roll
      setRolling(false);
    }, 2000); // Duration of the roll animation
  };

  return (
    <div className="app">
      <audio ref={rollSoundRef} src="/sounds/roll.mp3" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" />
      <audio ref={lossSoundRef} src="/sounds/loss.mp3" />

      <header className="app-header">
        <h1>Quantum Dice</h1>
        <div className="header-controls">
          <button onClick={() => setIsSettingsOpen(true)}>Settings</button>
          <div className="balance">
            <span>Balance:</span>
            <strong>{balance.toFixed(2)}</strong>
          </div>
        </div>
      </header>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        volume={volume}
        setVolume={setVolume}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <main className="app-main">
        <div className="game-interface">
          <BetControls
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            handleRollDice={handleRollDice}
            rolling={rolling}
          />
          <PayoutDisplay
            winChance={winChance}
            payout={payout}
            betAmount={betAmount}
            rollResult={rollResult}
          />
        </div>
        <GameHistory gameHistory={gameHistory} />
        <ProvablyFair
          serverSeedHash={serverSeedHash}
          clientSeed={clientSeed}
          setClientSeed={setClientSeed}
          nonce={nonce}
        />
      </main>
    </div>
  );
}

export default App;
