import { ethers } from "ethers";

import rewardTrackerABI from "../assets/StableCoinContractABI.json";
import { feeTutoAddr } from "../costant/prod-costant";

export function getFeeTutoContract(signer) {
  const feeFeeTutoContract = new ethers.Contract(
    feeTutoAddr,
    rewardTrackerABI.abi,
    signer
  );

  return feeFeeTutoContract;
}
