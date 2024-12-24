import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";

dotenv.config({ path: ".env" });

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY || ""],
    },
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: [process.env.ETHEREUM_PRIVATE_KEY || ""],
    },
  },

  etherscan: {
    apiKey: {
      sepolia: process.env.ETHEREUM_SCAN_API_KEY as string,
    },
  },

  solidity: "0.8.20",
};

export default config;
