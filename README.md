# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
DECENTRALISED CHARITY DONATION DAPP
OVERVIEW
The Charity Donation DApp is a decentralized platform built on Ethereum (or other compatible blockchain) that allows users to create, donate to, and manage charity campaigns. This DApp enables campaign creators to raise funds for their charitable causes, while also allowing donors to contribute directly to campaigns. Additionally, the system includes a multisignature wallet for transaction approvals and a mechanism to reward top contributors with NFTs.

FEATURES 
1. Campaign Creation
Admin users can create charity campaigns which include:
Title: The name of the campaign.
Description: A detailed description of the campaign’s objectives.
Target Amount: The fundraising goal.
Active Status: Determines whether the campaign is open for donations.
2. Campaign Management
Admins can:
Activate/Deactivate Campaigns: Control whether donations are allowed.
Add Updates: Admins can add updates to the campaigns, such as progress or thank you notes.
3. Donations
Users can donate to campaigns.
Donations are recorded with the donor’s address, amount and timestamp.
Users can view the total amount donated and the history of donations for each campaign.
4. Transaction Management with Multisignature Approval
Withdrawal of Funds: Funds can be withdrawn from the campaign’s total donations after receiving approval from a predefined number of signers (e.g., 2 out of 3 signers).
Each withdrawal request requires multiple signers to approve the transaction before it is executed.
5. Rewarding Top Contributors with NFTs
Top three contributors to a campaign will be rewarded with an NFT (Non-Fungible Token) as a badge for their contribution.
The NFTs will be minted and assigned to the top three donors based on the total amount donated.
