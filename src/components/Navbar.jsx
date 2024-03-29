import React, { useState, useEffect } from "react";
import logo from "../assets/FF-logo.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

import { ethers } from "ethers";

// import BankABI from "../assets/BankABI.json";
// import USDCABI from "../assets/USDCABI.json";

export const Navbar = () => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const { user } = useGlobalContext();

	const getWalletAddress = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts");
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((error) => {
					if (error.code === 4001) {
						console.log("Rejected");
					}
					return;
				});
			setCurrentAccount(currentAddress);
		}
	};

	useEffect(() => {
		getWalletAddress();
	}, []);

	return (
		<>
			<div className="nav-center">
				<Link to="/" className="home-link">
					<img src={logo} alt="ForkedFinance app" className="logo" />
				</Link>
				{/* <Link to="/transfer" className="link">
          <div className="headerItem">Transfer</div>
        </Link> */}

				{/* Wallet: <span>{currentAccount}</span> */}

				{!currentAccount && (
					<div className="nav-links">
						<div className="nav-links-buttons">
							<Link to="/dashboard" className="link">
								<div className="headerItem">Dashbord</div>
							</Link>
							<Link to="/transfer" className="link">
								<div className="headerItem">Transfer</div>
							</Link>
						</div>
						<div>
							<button
								className="btn btn-small"
								onClick={() => {
									getWalletAddress();
								}}
							>
								{" "}
								Connect{" "}
							</button>
						</div>
					</div>
				)}

				{currentAccount && (
					<div className="nav-links">
						<div className="nav-links-buttons">
							<Link to="/dashboard" className="link">
								<div className="headerItem">Dashbord</div>
							</Link>
							<Link to="/transfer" className="link">
								<div className="headerItem">Transfer</div>
							</Link>
						</div>
						<div className="connect">
							<button
								className="btn btn-small-connect"
								onClick={() => {
									getWalletAddress();
								}}
							>
								{" "}
								Connected{" "}
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
