import { ethers } from "ethers";

import TutoABI from "../assets/TutoABI.json";
import { tutoAddr } from "../costant/prod-costant";

export function getTutocContract(signer) {
  const tutoContract = new ethers.Contract(
    tutoAddr,
    TutoABI.abi,
    signer
  );

  return tutoContract;
}
