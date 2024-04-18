import { ethers } from "ethers";

import { errorAtom } from "../state/error";

export async function getProviderSigner() {
  if (!window.ethereum?.isMetaMask) {
    const setError = useSetRecoilState(errorAtom);

    setError("Wallet not found!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts");

  const signer = provider.getSigner();

  return { provider, signer };
}
