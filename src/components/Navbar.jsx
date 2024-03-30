import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import getWalletAddress from "../utils/getWalletAddress";

import logo from "../assets/FF-logo.png";
import Button from "../atoms/Button";

export const Navbar = () => {
	const [currentAccount, setCurrentAccount] = useState(null);

	useEffect(() => {
		setCurrentAccount(getWalletAddress());
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-gradient-to-b from-transparent to-white/30 backdrop-blur-lg py-5 px-4 md:px-10">
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
						getWalletAddress();
					}}
				>
					{currentAccount ? "Connected" : "Connect"}
				</button>
			</nav>
		</header>
	);
};

export default Navbar;
