import  { ethers } from "ethers";


export function parse(amount, decimals) {
    const stringAmount = amount.toString();
    return ethers.utils.parseUnits(stringAmount, decimals)
}

export function format(chainOutput, decimals) {
    return (
      Math.round(
        parseFloat(ethers.utils.formatUnits(chainOutput, decimals)) * 10
      ) / 10
    );
}
