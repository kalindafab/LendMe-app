/**
 * Type definitions for the DeFi lending application
 * These interfaces define the structure of our mock data and API responses
 */

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: string; // USD value
  icon?: string;
}

export interface CollateralData {
  deposited: Token[];
  totalValue: string;
  healthFactor: string;
}

export interface BorrowData {
  borrowed: Token[];
  totalBorrowed: string;
  availableCredit: string;
  utilizationRate: string;
}

export interface UserData {
  address: string;
  collateral: CollateralData;
  borrow: BorrowData;
}

export interface FormData {
  token: string;
  amount: string;
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  message: string;
}