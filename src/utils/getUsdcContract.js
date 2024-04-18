import { ethers } from "ethers";

import usdcABI from "../assets/USDCABI.json";
import { USDCAddress } from "../costant/prod-costant";

export function getUsdcContract(signer) {
  const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);

  return usdcContract;
}
