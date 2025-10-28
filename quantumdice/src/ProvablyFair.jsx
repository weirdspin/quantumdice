import React from 'react';
import './ProvablyFair.css';

const ProvablyFair = ({ serverSeedHash, clientSeed, setClientSeed, nonce }) => {
  return (
    <div className="provably-fair">
      <h2>Provably Fair</h2>
      <div className="pf-group">
        <label>Server Seed Hash</label>
        <input type="text" value={serverSeedHash} readOnly />
      </div>
      <div className="pf-group">
        <label>Client Seed</label>
        <input
          type="text"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
        />
      </div>
      <div className="pf-group">
        <label>Nonce</label>
        <input type="number" value={nonce} readOnly />
      </div>
    </div>
  );
};

export default ProvablyFair;
