import { ethers } from "hardhat";

async function main() {
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the CampaignDonation contract
  const CampaignDonation = await ethers.getContractFactory("CampaignDonation");
  const campaignDonation = await CampaignDonation.deploy(); 

  
}

// Execute the deployment function
main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exit(1);
});
