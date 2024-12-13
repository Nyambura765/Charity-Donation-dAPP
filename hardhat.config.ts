import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
  },

  etherscan: {
    apiKey: {
      sepolia: process.env.ETHEREUM_SCAN_API_KEY as string,
    },
  },

  solidity: "0.8.0",
};

export default config;
