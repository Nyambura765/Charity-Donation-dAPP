import { ethers } from "hardhat";  
import { expect } from "chai";
import { CampaignDonation, ContributorNFT } from "../typechain-types";
import { getSignersWithAddresses } from "./SignerWithAddress";


describe("CampaignDonation Contract", function () {
  let CampaignDonation, campaignDonation, ContributorNFT, contributorNFT;
  let owner, admin, donor1, donor2, donor3, signer1, signer2;
  let signers;

  beforeEach(async function () {
    signers = await ethers.getSigners();
    [owner, admin, donor1, donor2, donor3, signer1, signer2] = signers;

    CampaignDonation = await ethers.getContractFactory("CampaignDonation");
    campaignDonation = await CampaignDonation.deploy();
    await campaignDonation.deployed();

    ContributorNFT = await ethers.getContractFactory("ContributorNFT");
    contributorNFT = await ContributorNFT.deploy();
    await contributorNFT.deployed();

    await campaignDonation.initialize(contributorNFT.address);
  });

  // Test: Donations to a campaign
  it("Should allow donations to a campaign", async function () {
    const targetAmount = ethers.parseEther("10");

    await campaignDonation.connect(admin).createCampaign(
      "Test Campaign",
      "Test Description",
      targetAmount
    );

    const donationAmount = ethers.parseEther("1");
    await campaignDonation.connect(donor1).donateToCampaign(0, { value: donationAmount });

    const campaign = await campaignDonation.campaigns(0);
    expect(campaign.totalDonated).to.equal(donationAmount);

    const donations = await campaignDonation.getDonationHistory(0);
    expect(donations[0].donor).to.equal(donor1.address);
    expect(donations[0].amount).to.equal(donationAmount);
  });

  // Test: Update campaign status
  it("Should update the status of a campaign", async function () {
    await campaignDonation.connect(admin).createCampaign(
      "Test Campaign",
      "Test Description",
      ethers.parseEther("10")
    );

    await campaignDonation.connect(admin).updateCampaignStatus(0, false);

    const campaign = await campaignDonation.campaigns(0);
    expect(campaign.active).to.be.false;
  });

  // Test: Reward top contributors with NFTs
  it("Should reward top contributors with NFTs", async function () {
    await campaignDonation.connect(admin).createCampaign(
      "Test Campaign",
      "Test Description",
      ethers.parseEther("10")
    );

    await campaignDonation.connect(donor1).donateToCampaign(0, { value: ethers.parseEther("5") });
    await campaignDonation.connect(donor2).donateToCampaign(0, { value: ethers.parseEther("3") });
    await campaignDonation.connect(donor3).donateToCampaign(0, { value: ethers.parseEther("2") });

    await campaignDonation.connect(admin).rewardTopContributors(0);

    expect(await contributorNFT.balanceOf(donor1.address)).to.equal(1);
    expect(await contributorNFT.balanceOf(donor2.address)).to.equal(1);
    expect(await contributorNFT.balanceOf(donor3.address)).to.equal(1);
  });

  // Test: Withdrawals with multisignature approval
  it("Should allow withdrawals with multisignature approval", async function () {
    const targetAmount = ethers.parseEther("10");

    await campaignDonation.connect(admin).createCampaign(
      "Test Campaign",
      "Test Description",
      targetAmount
    );

    await campaignDonation.connect(donor1).donateToCampaign(0, { value: ethers.parseEther("5") });

    const recipient = signer1.address;
    const withdrawAmount = ethers.parseEther("3");

    await campaignDonation.connect(signer1).withdrawFunds(0, withdrawAmount, recipient);
    await campaignDonation.connect(signer1).approveTransaction(1);
    await campaignDonation.connect(signer2).approveTransaction(1);

    const transaction = await campaignDonation.transactions(1);
    expect(transaction.executed).to.be.true;
  });
});
