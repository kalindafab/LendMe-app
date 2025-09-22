/**
 * Repay form component for repaying borrowed assets
 * Shows current debt and handles repayment transactions
 */

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { UserData } from '../../types';

interface RepayFormProps {
  onRepay: (token: string, amount: string) => Promise<any>;
  loading: boolean;
  userData: UserData | null;
}

export const RepayForm: React.FC<RepayFormProps> = ({ onRepay, loading, userData }) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Set initial token selection when userData loads
  React.useEffect(() => {
    if (userData && userData.borrow.borrowed.length > 0 && !selectedToken) {
      setSelectedToken(userData.borrow.borrowed[0].symbol);
    }
  }, [userData, selectedToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (userData) {
      const borrowedToken = userData.borrow.borrowed.find(token => token.symbol === selectedToken);
      if (borrowedToken) {
        const owedAmount = parseFloat(borrowedToken.balance);
        const repayAmount = parseFloat(amount);
        
        if (repayAmount > owedAmount) {
          setError(`Amount exceeds debt of ${borrowedToken.balance} ${borrowedToken.symbol}`);
          return;
        }
      }
    }

    try {
      const result = await onRepay(selectedToken, amount);
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

  if (!userData || userData.borrow.borrowed.length === 0) {
    return (
      <Card title="Repay Debt">
        <div className="text-center py-8">
          <p className="text-gray-600">No outstanding debt to repay</p>
        </div>
      </Card>
    );
  }

  const selectedBorrowedToken = userData.borrow.borrowed.find(token => token.symbol === selectedToken);

  return (
    <Card title="Repay Debt">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token to Repay
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            {userData.borrow.borrowed.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBorrowedToken && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Outstanding Debt: {selectedBorrowedToken.balance} {selectedBorrowedToken.symbol}
            </p>
            <button
              type="button"
              onClick={() => setAmount(selectedBorrowedToken.balance)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-1"
            >
              Repay Full Amount
            </button>
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
            'Repay'
          )}
        </Button>
      </form>
    </Card>
  );
};