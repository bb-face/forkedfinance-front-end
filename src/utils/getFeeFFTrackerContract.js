import { ethers } from "ethers";

import rewardTrackerABI from "../assets/StableCoinContractABI.json";
import { feeFF } from "../costant/prod-costant";

export function getFeeFFTrackerContract(signer) {
  const feeFFTrackerContract = new ethers.Contract(
    feeFF,
    rewardTrackerABI,
    signer
  );

  return feeFFTrackerContract;
}
