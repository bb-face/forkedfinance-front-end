import { ethers } from "ethers";
import { permitSigned } from "./permit";
import { tutoAddr } from "../costant/prod-costant";
import { usdcAddr } from "../costant/prod-costant";
import usdcABI from "../assets/USDCABI.json";
import TutoABI from "../assets/TutoABI.json";


export  async  function signPermit(name, provider) {
    var contractAddr;
    var ABI;
    if (name == "tuto") {
        contractAddr = tutoAddr;
        ABI = TutoABI.abi;
    } 
    if (name == "usdc")
    {
        contractAddr = usdcAddr;
        ABI = usdcABI;
    }
    if (window.ethereum?.isMetaMask) {
      const signer = provider.getSigner();
      const block = await provider.getBlock('latest');
      const contract =  new ethers.Contract(contractAddr, ABI, signer);
      return await permitSigned(signer, contract, contractAddr, block.timestamp);
    //   const signature = await signer._signTypedData(data[0], data[1], data[2]);
    //   const signed = ethers.utils.splitSignature(signature);
    //   return {r: signed.r, s: signed.s, v: signed.v, deadline: (data[2].deadline).toString()};
  }};