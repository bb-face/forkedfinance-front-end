import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { ethers } from "ethers";

import { walletAddressAtom } from "../state/wallet";
import { useChainIdSetter } from "../state/network";
import { errorAtom } from "../state/error";

function useConnectWallet() {
  const [_, setProcessedChainId] = useChainIdSetter();
  const setWalletAddress = useSetRecoilState(walletAddressAtom);
  const setError = useSetRecoilState(errorAtom);

  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const address = await signer.getAddress();

        setProcessedChainId(network.chainId);
        setWalletAddress(address);
      } else {
        console.log("-- no metamask installed");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { connectWallet, isLoading };
}

export default useConnectWallet;
