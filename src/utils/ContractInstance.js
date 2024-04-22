import { ethers } from "ethers";


export function contract(address, abi, signerProvider){
    return new ethers.Contract(address, abi, signerProvider);
}