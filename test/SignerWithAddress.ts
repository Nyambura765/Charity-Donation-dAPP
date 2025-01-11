import { ethers } from "hardhat";
import { Signer } from "ethers";


export interface SignerWithAddress {
  signer: Signer;
  address: string;
}


export async function getSignersWithAddresses(): Promise<SignerWithAddress[]> {
  const signers = await ethers.getSigners(); 
  return Promise.all(
    signers.map(async (signer) => {
      return {
        signer,
        address: await signer.getAddress(),
      };
    })
  );
}
