import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { walletAddressAtom } from "../state/wallet";
import { useChainIdSetter } from "../state/network";

function useNetworkChange() {
  const setWalletAddress = useSetRecoilState(walletAddressAtom);
  const [_, setProcessedChainId] = useChainIdSetter();

  const handleAccountsChanged = (accounts) => {
    const newAddress = accounts.length > 0 ? accounts[0] : null;
    setWalletAddress(newAddress);
  };

  const handleChainChanged = (chainId) => {
    setProcessedChainId(chainId);
  };

  useEffect(() => {
    let didMount = false;

    const attachEventListeners = () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      }
    };

    const removeEventListeners = () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };

    if (!didMount) {
      attachEventListeners();
      didMount = true;
    }

    return () => {
      removeEventListeners();
    };
  }, []);
}

export default useNetworkChange;
