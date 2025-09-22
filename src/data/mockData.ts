/**
 * Mock data for development and testing
 * This structure mirrors what would come from a real backend API
 */

import { UserData, Token } from '../types';

export const mockTokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '2.5',
    value: '4,250.00'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '10000',
    value: '10,000.00'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    balance: '5000',
    value: '5,000.00'
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    balance: '7500',
    value: '7,500.00'
  }
];

export const mockUserData: UserData = {
  address: '0x1234...abcd',
  collateral: {
    deposited: [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: '1.5',
        value: '2,550.00'
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: '5000',
        value: '5,000.00'
      }
    ],
    totalValue: '7,550.00',
    healthFactor: '2.34'
  },
  borrow: {
    borrowed: [
      {
        symbol: 'USDT',
        name: 'Tether USD',
        balance: '2000',
        value: '2,000.00'
      }
    ],
    totalBorrowed: '2,000.00',
    availableCredit: '3,775.00',
    utilizationRate: '26.5'
  }
};