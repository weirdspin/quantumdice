import React from 'react';
import AudioControls from './AudioControls';
import './SettingsDialog.css';

const SettingsDialog = ({ isOpen, onClose, volume, setVolume, isMuted, setIsMuted }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>Audio Settings</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <AudioControls
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      </div>
    </div>
  );
};

export default SettingsDialog;
