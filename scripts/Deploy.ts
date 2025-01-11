import hre from "hardhat";
const { ethers } = require("hardhat");


async function main() {
  // Compile the contract (if needed)
  await hre.run('compile');

  // Get the contract factory
  const ContractFactory = await ethers.getContractFactory("CampaignDonation");

  // Deploy the contract
  console.log("Deploying contract...");
  const contract = await ContractFactory.deploy(/* constructor arguments */);

  // Wait for the deployment to complete
  await contract.deployed();
  console.log(`Contract deployed to: ${contract.address}`);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
