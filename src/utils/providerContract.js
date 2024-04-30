import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/8ihtlloOPOfwjIwAQNjuzLlzu2S-ZKbZ`
);

export async function providerContract(address, ABI) {
  return new ethers.Contract(address, ABI, provider);
}
