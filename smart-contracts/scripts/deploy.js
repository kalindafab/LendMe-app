const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const collateralToken = await MockToken.deploy("Mock DAI", "mDAI", 1000000);
  await collateralToken.deployed();
  console.log("Collateral Token (mDAI) deployed at:", collateralToken.address);


  const borrowToken = await MockToken.deploy("Mock USDC", "mUSDC", 1000000);
  await borrowToken.deployed();
  console.log("Borrow Token (mUSDC) deployed at:", borrowToken.address);


  const Lending = await hre.ethers.getContractFactory("Lending");
  const lending = await Lending.deploy(collateralToken.address, borrowToken.address);
  await lending.deployed();
  console.log("Lending contract deployed at:", lending.address);

 
  await borrowToken.transfer(lending.address, hre.ethers.utils.parseEther("500000"));
  console.log("Funded Lending contract with 500k mUSDC");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
