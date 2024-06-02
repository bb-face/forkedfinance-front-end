import { ethers } from "ethers";

import rewardTrackerABI from "../assets/RewardTrackerABI.json";
import { feeTutoAddr } from "../costant/prod-costant";

export function getFeeTutoContract(signer) {
  const feeFeeTutoContract = new ethers.Contract(
    feeTutoAddr,
    rewardTrackerABI.abi,
    signer
  );

  return feeFeeTutoContract;
}
