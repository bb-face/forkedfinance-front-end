import { useSetRecoilState } from "recoil";
import { ethers } from "ethers";

import { errorAtom } from "../state/error";

export async function getProviderSigner(walletAddress, setWalletAddress) {
  if (!window.ethereum?.isMetaMask) {
    const setError = useSetRecoilState(errorAtom);

    setError("Metamask not found!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = {};

  if (!walletAddress) {
    await provider.send("eth_requestAccounts");

    signer = provider.getSigner();

    const address = await signer.getAddress();

    setWalletAddress(address);
  } else {
    signer = provider.getSigner();
  }

  return { provider, signer };
}
