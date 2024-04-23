import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useConnectWallet from "../customHooks/useWallet";
import { walletAddressAtom } from "../state/wallet";
import { chainIdAtom } from "../state/network";

import Button from "../atoms/Button";
import WalletAddress from "../atoms/WalletAddress";

import logo from "../assets/Tuto.png";

export const Navbar = () => {
  const { connectWallet } = useConnectWallet();
  const walletAddress = useRecoilValue(walletAddressAtom);
  const chainId = useRecoilValue(chainIdAtom);

  return (
    <header className="bg-primary text-white w-full py-4 px-8 fixed top-0 z-50">
      <nav className="flex justify-between items-center">
        <Link to="/" className="w">
          <img src={logo} alt="ForkedFinance app" className="logo" />
        </Link>
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <Link to="/dashboard">
          <Button>Airdrop</Button>
        </Link>
        <Link to="/transfer">
          <Button>Transfer</Button>
        </Link>
        <Link to="/merchants">
          <Button>Merchants</Button>
        </Link>
        <div>
          {walletAddress ? (
            <>
              <WalletAddress address={walletAddress} />
              <div>chain id: {chainId}</div>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-small"
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
