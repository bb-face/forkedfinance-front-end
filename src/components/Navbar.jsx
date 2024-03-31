import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { walletState } from "../state/wallet";
import { useWallet } from "../customHooks/useWallet";

import logo from "../assets/FF-logo.png";
import Button from "../atoms/Button";
import WalletAddress from "../atoms/WalletAddress";

export const Navbar = () => {
	const wallet = useRecoilValue(walletState);

	const [error, setError] = useState(null);
	const { connectWallet, disconnectWallet } = useWallet();

	return (
		<header className="bg-primary text-white w-full py-4 px-8 fixed top-0 z-50">
			{error && (
				<WarningPopUp title="Warning" text="This is a warning message." />
			)}
			<nav className="flex justify-between items-center">
				<Link to="/" className="w">
					<img src={logo} alt="ForkedFinance app" className="logo" />
				</Link>
				<Link to="/dashboard">
					<Button>Dashboard</Button>
				</Link>
				<Link to="/deposit">
					<Button>Deposit</Button>
				</Link>
				<Link to="/transfer">
					<Button>Transfer</Button>
				</Link>
				<div>
					{wallet.isConnected ? (
						<button
							type="button"
							className="btn btn-small"
							onClick={disconnectWallet}
						>
							Disconnect Wallet
						</button>
					) : (
						<button
							type="button"
							className="btn btn-small"
							onClick={connectWallet}
						>
							Connect Wallet
						</button>
					)}
					{wallet.isConnected && <WalletAddress address={wallet.address} />}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
