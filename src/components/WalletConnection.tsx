/**
 * Wallet connection component using RainbowKit
 * Handles wallet connection state and provides connect button
 */

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletConnection: React.FC = () => {
  return (
    <div className="mb-8">
      <ConnectButton 
        chainStatus="none"
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
};