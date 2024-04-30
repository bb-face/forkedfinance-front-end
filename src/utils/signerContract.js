import { ethers } from "ethers";

export async function signerContract(address, ABI, signer) {
  return new ethers.Contract(address, ABI, signer);
}
