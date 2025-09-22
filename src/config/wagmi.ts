/**
 * wagmi and RainbowKit configuration
 * Sets up supported chains and wallet providers
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'DeFi Lending Platform',
  projectId: 'demo-project-id', // Replace with your actual WalletConnect project ID
  chains: [mainnet, polygon, arbitrum],
  ssr: true,
});