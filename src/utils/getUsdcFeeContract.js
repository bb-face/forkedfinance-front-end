import { ethers } from "ethers";

import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import { feeUsdc } from "../costant/prod-costant";

export function getUsdcFeeContract(signer) {
  const usdcFeeContract = new ethers.Contract(
    feeUsdc,
    stableCoinTrackerABI,
    signer
  );

  return usdcFeeContract;
}
