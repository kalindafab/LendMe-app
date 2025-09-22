/**
 * Deposit form component for adding collateral
 * Handles form validation and transaction submission
 */

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { mockTokens } from '../../data/mockData';

interface DepositFormProps {
  onDeposit: (token: string, amount: string) => Promise<any>;
  loading: boolean;
}

export const DepositForm: React.FC<DepositFormProps> = ({ onDeposit, loading }) => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const result = await onDeposit(selectedToken, amount);
      if (result.success) {
        setSuccess(result.message);
        setAmount('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Transaction failed. Please try again.');
    }
  };

  const selectedTokenData = mockTokens.find(token => token.symbol === selectedToken);

  return (
    <Card title="Deposit Collateral">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            {mockTokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name}
              </option>
            ))}
          </select>
        </div>

        {selectedTokenData && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Available Balance: {selectedTokenData.balance} {selectedTokenData.symbol}
            </p>
          </div>
        )}

        <Input
          label="Amount"
          value={amount}
          onChange={setAmount}
          type="number"
          placeholder="0.0"
          disabled={loading}
          error={error}
        />

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || !amount}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Processing...
            </div>
          ) : (
            'Deposit'
          )}
        </Button>
      </form>
    </Card>
  );
};