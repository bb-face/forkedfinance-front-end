import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useConnectWallet from "../customHooks/useWallet";
import { walletAddressAtom } from "../state/wallet";
import { chainIdAtom } from "../state/network";

import Button from "../atoms/Button";
import WalletAddress from "../atoms/WalletAddress";

import logo from "../assets/Tuto.png";
import NetworkInfo from "../atoms/NetworkInfo";
import BurgerMenu from "../atoms/BurgerMenu";

export const Navbar = () => {
  const { connectWallet } = useConnectWallet();
  const walletAddress = useRecoilValue(walletAddressAtom);
  const chainId = useRecoilValue(chainIdAtom);

  return (
    <header className="bg-primary text-white w-full py-5 px-8 fixed top-0 z-50">
      <nav className="flex justify-between items-center">
        <Link to="/" className="w">
          <img src={logo} alt="ForkedFinance app" className="logo" />
        </Link>
        <Link to="/dashboard" className="press-start-2p-regular text-xs hidden md:block">
          <Button>Dashboard</Button>
        </Link>
        <Link to="/airdrop" className="press-start-2p-regular text-xs hidden md:block">
          <Button>Airdrop</Button>
        </Link>
        <Link to="/transfer" className="press-start-2p-regular text-xs hidden md:block">
          <Button>Transfer</Button>
        </Link>
        <Link to="/merchants" className="press-start-2p-regular text-xs hidden md:block">
          <Button>Merchants</Button>
        </Link>
              
				<div className="md:hidden">
					<BurgerMenu />
				</div>

        <div className="press-start-2p-regular text-xs">
          {walletAddress ? (
            <>
              <WalletAddress address={walletAddress} />
              <NetworkInfo chainId={chainId} />
            </>
          ) : (
            <button
              type="button"
              className="btn btn-small press-start-2p-regular text-xs"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
