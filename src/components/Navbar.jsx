import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import logo from "../assets/FF-logo.png";
import Button from "../atoms/Button";
import WalletAddress from "../atoms/WalletAddress";

export const Navbar = () => {
	const [connected, setConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");
	const [error, setError] = useState(null);

	async function connectWallet() {
		if (!connected) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const _walletAddress = await signer.getAddress();
			setConnected(true);
			setWalletAddress(_walletAddress);
		} else {
			setConnected(false);
			setWalletAddress("");
		}
	}

	return (
		<header className="bg-primary text-white w-full py-4 px-8 fixed top-0 z-50">
			{error && (
				<WarningPopUp title="Warning" text="This is a warning message." />
			)}
			<nav className="flex justify-between items-center">
				<Link to="/" className="w">
					<img src={logo} alt="ForkedFinance app" className="logo" />
				</Link>
				<Link to="/dashboard" className="link">
					<Button>Dashboard</Button>
				</Link>
				<Link to="/transfer" className="link">
					<Button>Transfer</Button>
				</Link>
				<button
					type="button"
					className="btn btn-small"
					onClick={() => {
						connectWallet();
					}}
				>
					{connected ? <WalletAddress address={walletAddress} /> : "Connect"}
				</button>
			</nav>
		</header>
	);
};

export default Navbar;
