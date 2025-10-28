import React from 'react';
import './AudioControls.css';

const AudioControls = ({ volume, setVolume, isMuted, setIsMuted }) => {
  return (
    <div className="audio-controls">
      <button onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default AudioControls;
