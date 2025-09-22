/**
 * Main App component with RainbowKit integration
 * Orchestrates wallet connection and main application flow
 */

import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { config } from './config/wagmi';
import { WalletConnection } from './components/WalletConnection';
import { Dashboard } from './components/Dashboard';
import { DepositForm } from './components/forms/DepositForm';
import { BorrowForm } from './components/forms/BorrowForm';
import { RepayForm } from './components/forms/RepayForm';
import { useUserData } from './hooks/useUserData';

const queryClient = new QueryClient();

/**
 * Main application content component
 * Handles the core application logic after wallet connection
 */
const AppContent: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { userData, loading, deposit, borrow, repay } = useUserData(address);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              LendMe
            </h1>
            <WalletConnection />
          </div>
        </header>

        {/* Main Content */}
        {isConnected ? (
          <div className="space-y-8">
            {/* Dashboard */}
            <Dashboard userData={userData} loading={loading} />
            
            {/* Action Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DepositForm onDeposit={deposit} loading={loading} />
              <BorrowForm onBorrow={borrow} loading={loading} userData={userData} />
              <RepayForm onRepay={repay} loading={loading} userData={userData} />
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to DeFi LendMe
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect your wallet to start depositing collateral, borrowing assets, 
              and managing your DeFi lending positions with our secure and user-friendly platform.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Root App component with providers
 * Sets up the necessary context providers for wagmi, React Query, and RainbowKit
 */
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;