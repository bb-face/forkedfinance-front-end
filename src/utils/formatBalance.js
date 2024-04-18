import { ethers } from "ethers";

export function formatUsdc(chainOutput) {
  return (
    Math.round(parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10) / 10
  );
}

export function formatErc(chainOutput) {
  return (
    Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) / 10
  );
}
