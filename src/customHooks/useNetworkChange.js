import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { walletAddressAtom } from "../state/wallet";
import { chainIdAtom } from "../state/network";

function useNetworkChange() {
  const setChainId = useSetRecoilState(chainIdAtom);
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  const handleAccountsChanged = (accounts) => {
    console.log("-- account changing");
    const newAddress = accounts.length > 0 ? accounts[0] : null;
    setWalletAddress(newAddress);
  };

  const handleChainChanged = (chainId) => {
    console.log("-- network changing");
    setChainId(chainId);
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
