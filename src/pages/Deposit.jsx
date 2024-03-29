import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Input, Popover } from "antd";
import { WalletTwoTone } from "@ant-design/icons";

import BankABI from "../assets/BankABI.json";
import USDCABI from "../assets/USDCABI.json";

import useLocalState from "../utils/localState";

const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const bankAddress = "0x3149496ED8C90FC2418b3dD389ca606b87d23D45";

const Deposit = () => {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [transferAmount, setTransferAmount] = useState(null);

	function changeAmount(e) {
		setTransferAmount(e.target.value);
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

	const approveUSDC = async () => {
		const approveAmount =
			"115792089237316195423570985008687907853269984665640564039457584007913129639935";
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const tokenContract = new ethers.Contract(USDCAddress, USDCABI, signer);
		await tokenContract
			.approve(bankAddress, approveAmount)
			.then((tx) => {
				//do whatever you want with tx
			})
			.catch((e) => {
				if (e.code === 4001) {
					console.log("Rejected");
				}
			});

		// const unlimitedTokens = Math.pow(2, 255);
	};

	const deposit = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(bankAddress, BankABI, signer);

		await contract
			.depositUSDC(transferAmount * 10 ** 6)
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
					<h4>USDC In - 0.5% Fee...</h4>
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
						value={transferAmount}
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
						<button
							type="button"
							className="validateButton"
							onClick={approveUSDC}
						>
							Approve
						</button>
						<button type="button" className="swapButton" onClick={deposit}>
							Deposit
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Deposit;
