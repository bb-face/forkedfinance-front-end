import { ethers } from "ethers";

export async function getCurrentAddress(provider) {
    return await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
    }