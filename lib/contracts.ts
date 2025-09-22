// import { ethers } from "ethers";
// import { useContract, useSigner, useProvider } from "wagmi";
// import LendingABI from "./abis/Lending.json"; 
// import ERC20ABI from "./abis/ERC20.json"; // Standard ERC20 ABI


// export const LENDING_CONTRACT_ADDRESS = "0xLendingContractAddress";
// export const COLLATERAL_TOKEN_ADDRESS = "0xCollateralTokenAddress";
// export const BORROW_TOKEN_ADDRESS = "0xBorrowTokenAddress";



// export const useLendingContract = () => {
//   const { data: signer } = useSigner();
//   const contract = useContract({
//     address: LENDING_CONTRACT_ADDRESS,
//     abi: LendingABI,
//     signerOrProvider: signer,
//   });
//   return contract;
// };

// export const useCollateralToken = () => {
//   const { data: signer } = useSigner();
//   const contract = useContract({
//     address: COLLATERAL_TOKEN_ADDRESS,
//     abi: ERC20ABI,
//     signerOrProvider: signer,
//   });
//   return contract;
// };

// export const useBorrowToken = () => {
//   const { data: signer } = useSigner();
//   const contract = useContract({
//     address: BORROW_TOKEN_ADDRESS,
//     abi: ERC20ABI,
//     signerOrProvider: signer,
//   });
//   return contract;
// };



// export const depositCollateral = async (lendingContract: any, tokenContract: any, amount: string) => {
//   // Approve the lending contract first
//   const amountWei = ethers.utils.parseEther(amount);
//   const approveTx = await tokenContract.approve(LENDING_CONTRACT_ADDRESS, amountWei);
//   await approveTx.wait();

//   // Deposit
//   const tx = await lendingContract.depositCollateral(amountWei);
//   await tx.wait();
//   return tx;
// };

// export const borrow = async (lendingContract: any, amount: string) => {
//   const amountWei = ethers.utils.parseEther(amount);
//   const tx = await lendingContract.borrow(amountWei);
//   await tx.wait();
//   return tx;
// };

// export const repay = async (lendingContract: any, tokenContract: any, amount: string) => {
//   const amountWei = ethers.utils.parseEther(amount);
//   const approveTx = await tokenContract.approve(LENDING_CONTRACT_ADDRESS, amountWei);
//   await approveTx.wait();

//   const tx = await lendingContract.repay(amountWei);
//   await tx.wait();
//   return tx;
// };

// export const withdrawCollateral = async (lendingContract: any, amount: string) => {
//   const amountWei = ethers.utils.parseEther(amount);
//   const tx = await lendingContract.withdrawCollateral(amountWei);
//   await tx.wait();
//   return tx;
// };


// export const getCollateralBalance = async (lendingContract: any, userAddress: string) => {
//   const balance = await lendingContract.collateralBalance(userAddress);
//   return ethers.utils.formatEther(balance);
// };

// export const getBorrowedBalance = async (lendingContract: any, userAddress: string) => {
//   const balance = await lendingContract.borrowedBalance(userAddress);
//   return ethers.utils.formatEther(balance);
// };
