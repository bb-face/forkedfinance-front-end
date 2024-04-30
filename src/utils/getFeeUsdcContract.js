import { ethers } from "ethers";

import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import { feeUsdcAddr } from "../costant/prod-costant";

export function getFeeUsdcContract(signer) {
  const usdcFeeContract = new ethers.Contract(
    feeUsdcAddr,
    stableCoinTrackerABI.abi,
    signer
  );

  return usdcFeeContract;
}
