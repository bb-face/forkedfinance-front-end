import { ethers } from "ethers";

import rewardRouterABI from "../assets/RewardRouterABI.json";
import { rewardRouterAddr } from "../costant/prod-costant";

export function getRRContract(signer) {
  const rrContract = new ethers.Contract(
    rewardRouterAddr,
    rewardRouterABI.abi,
    signer
  );

  return rrContract;
}
