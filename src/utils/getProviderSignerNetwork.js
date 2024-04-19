import { useSetRecoilState } from "recoil";
import { ethers } from "ethers";

import { errorAtom } from "../state/error";

export async function getProviderSigner() {
  if (!window.ethereum?.isMetaMask) {
    const setError = useSetRecoilState(errorAtom);

    setError("Metamask not found!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();

  return { provider, signer };
}
