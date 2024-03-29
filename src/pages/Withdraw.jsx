import React, { useState, useEffect } from "react";
import { Input, Popover } from "antd";
import { WalletTwoTone } from "@ant-design/icons";

import axios from "axios";
import { ethers } from "ethers";
import BankABI from "../assets/BankABI.json";
const bankAddress = "0x3149496ED8C90FC2418b3dD389ca606b87d23D45";

const url = "https://server.forkedfinance.xyz";

const Withdraw = () => {
	const [withdrawalAmount, setwithdrawalAmount] = useState(null);
	const [currentAccount, setCurrentAccount] = useState(null);
	const [balance, setBalance] = useState(null);

	function changeAmount(e) {
		setwithdrawalAmount(e.target.value);
	}

	const updateBalance = async () => {
		try {
			const { data } = await axios.get(`${url}/api/v1/users/updateBalance`, {
				withCredentials: true,
			});
			setBalance(Math.round((data.balance / 1000000) * 100) / 100);
		} catch (error) {
			console.log(error);
		}
	};

	const setting = () => {
		return (
			<>
				<div>{balance} USDC</div>
			</>
		);
	};

	const getWalletAddress = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});

			setCurrentAccount(currentAddress);
		}
	};

	const withdraw = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(bankAddress, BankABI, signer);

		await contract
			.initiateWithdraw(withdrawalAmount * 10 ** 6)
			.then((tx) => {
				//do whatever you want with tx
			})
			.catch((e) => {
				if (e.code === 4001) {
					console.log("Rejected");
				}
			});
	};

	const chainChanged = () => {
		window.location.reload();
	};
	window.ethereum.on("chainChanged", chainChanged);
	window.ethereum.on("accountChanged", getWalletAddress);

	useEffect(() => {
		updateBalance();
	}, [updateBalance]);

	return (
		<div className="page">
			<div className="tradeBox">
				<div className="tradeBoxHeader">
					<h4>USDC Out - 0.5% Fee...</h4>
					<Popover
						content={setting}
						title="Balance"
						trigger="click"
						placement="bottom"
					>
						<WalletTwoTone twoToneColor="#504acc" className="cog" />
					</Popover>
				</div>

				<div className="inputs">
					<Input
						placeholder="Amount"
						type="number"
						value={withdrawalAmount}
						onChange={changeAmount}
					/>
				</div>

				{!currentAccount && (
					<div className="buttons">
						<button
							type="button"
							className="swapButton"
							onClick={getWalletAddress}
						>
							Connect Wallet
						</button>
					</div>
				)}
				{currentAccount && (
					<div className="buttons">
						<button type="button" className="swapButton" onClick={withdraw}>
							Withdraw
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Withdraw;
