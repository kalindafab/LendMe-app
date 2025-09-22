/**
 * Custom hook for managing user data state
 * Simulates API calls and provides centralized state management
 */

import { useState, useEffect } from 'react';
import { UserData, TransactionResult } from '../types';
import { mockUserData } from '../data/mockData';

export const useUserData = (address: string | undefined) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setUserData({
          ...mockUserData,
          address: address
        });
        setLoading(false);
      }, 1000);
    } else {
      setUserData(null);
    }
  }, [address]);

  const deposit = async (token: string, amount: string): Promise<TransactionResult> => {
    setLoading(true);
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful transaction
    const result: TransactionResult = {
      success: true,
      hash: '0x' + Math.random().toString(16).substr(2, 8),
      message: `Successfully deposited ${amount} ${token}`
    };
    
    setLoading(false);
    return result;
  };

  const borrow = async (token: string, amount: string): Promise<TransactionResult> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result: TransactionResult = {
      success: true,
      hash: '0x' + Math.random().toString(16).substr(2, 8),
      message: `Successfully borrowed ${amount} ${token}`
    };
    
    setLoading(false);
    return result;
  };

  const repay = async (token: string, amount: string): Promise<TransactionResult> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result: TransactionResult = {
      success: true,
      hash: '0x' + Math.random().toString(16).substr(2, 8),
      message: `Successfully repaid ${amount} ${token}`
    };
    
    setLoading(false);
    return result;
  };

  return {
    userData,
    loading,
    deposit,
    borrow,
    repay
  };
};