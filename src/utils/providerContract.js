import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`
);

export async function providerContract(address, ABI) {
  return new ethers.Contract(address, ABI, provider);
}
