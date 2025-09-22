/**
 * Borrow form component for taking loans against collateral
 * Includes borrowing capacity validation
 */

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { mockTokens } from '../../data/mockData';
import { UserData } from '../../types';

interface BorrowFormProps {
  onBorrow: (token: string, amount: string) => Promise<any>;
  loading: boolean;
  userData: UserData | null;
}

export const BorrowForm: React.FC<BorrowFormProps> = ({ onBorrow, loading, userData }) => {
  const [selectedToken, setSelectedToken] = useState('USDC');
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

    if (userData) {
      const availableCredit = parseFloat(userData.borrow.availableCredit.replace(',', ''));
      const requestedAmount = parseFloat(amount);
      
      if (requestedAmount > availableCredit) {
        setError(`Amount exceeds available borrowing capacity of $${userData.borrow.availableCredit}`);
        return;
      }
    }

    try {
      const result = await onBorrow(selectedToken, amount);
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

  const borrowableTokens = mockTokens.filter(token => 
    ['USDC', 'USDT', 'DAI'].includes(token.symbol)
  );

  return (
    <Card title="Borrow Assets">
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
            {borrowableTokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name}
              </option>
            ))}
          </select>
        </div>

        {userData && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Available to Borrow: ${userData.borrow.availableCredit}
            </p>
          </div>
        )}

        <Input
          label="Amount (USD)"
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
          disabled={loading || !amount || !userData}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Processing...
            </div>
          ) : (
            'Borrow'
          )}
        </Button>
      </form>
    </Card>
  );
};