/**
 * Main dashboard component displaying user's financial overview
 * Shows collateral, borrowed amounts, and key metrics
 */

import React from 'react';
import { Card } from './ui/Card';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { UserData } from '../types';

interface DashboardProps {
  userData: UserData | null;
  loading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  if (!userData) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600">Connect your wallet to view dashboard</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <Card title="Account Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
            <p className="font-mono text-sm">{userData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Health Factor</p>
            <p className={`text-lg font-semibold ${
              parseFloat(userData.collateral.healthFactor) > 1.5 
                ? 'text-green-600' 
                : parseFloat(userData.collateral.healthFactor) > 1.2 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
            }`}>
              {userData.collateral.healthFactor}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Utilization Rate</p>
            <p className="text-lg font-semibold">{userData.borrow.utilizationRate}%</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collateral Section */}
        <Card title="Collateral Deposited">
          <div className="mb-4">
            <p className="text-2xl font-bold">${userData.collateral.totalValue}</p>
            <p className="text-sm text-gray-600">Total Value</p>
          </div>
          <div className="space-y-3">
            {userData.collateral.deposited.map((token, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-sm text-gray-600">{token.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{token.balance} {token.symbol}</p>
                  <p className="text-sm text-gray-600">${token.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Borrow Section */}
        <Card title="Borrowed Assets">
          <div className="mb-4">
            <p className="text-2xl font-bold">${userData.borrow.totalBorrowed}</p>
            <p className="text-sm text-gray-600">Total Borrowed</p>
          </div>
          <div className="mb-4">
            <p className="text-lg text-green-600 font-semibold">${userData.borrow.availableCredit}</p>
            <p className="text-sm text-gray-600">Available to Borrow</p>
          </div>
          <div className="space-y-3">
            {userData.borrow.borrowed.map((token, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-sm text-gray-600">{token.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{token.balance} {token.symbol}</p>
                  <p className="text-sm text-gray-600">${token.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};