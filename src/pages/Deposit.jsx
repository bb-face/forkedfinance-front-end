import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useRecoilValue } from "recoil";

import { walletState } from "../state/wallet";
import Button from "../atoms/Button";

import BankABI from "../assets/BankABI.json";
import USDCABI from "../assets/USDCABI.json";
import {
	USDCAddress,
	USDCApprovaAmount,
	bankAddress,
} from "../costant/prod-costant";

const Deposit = () => {
	const wallet = useRecoilValue(walletState);

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

	const approveUSDC = async () => {
		const approveAmount = USDCApprovaAmount;
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

	// TODO manage change of chain or address
	// const chainChanged = () => {
	// 	window.location.reload();
	// };
	// window.ethereum.on("chainChanged", chainChanged);
	// window.ethereum.on("accountChanged", getWalletAddress);

	return (
		<div className="max-w-md mx-auto my-10 p-6">
			<div className="mb-4">
				<h4 className="text-lg font-semibold">USDC In - 0.5% Fee...</h4>
			</div>
			<div className="mb-4">
				<input
					className="w-full p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Amount"
					type="number"
					value={transferAmount}
					onChange={changeAmount}
				/>
			</div>

			{wallet.isConnected ? (
				<div className="flex justify-between space-x-4">
					<Button
						type="button"
						className="flex-1 p-2 rounded font-semibold"
						onClick={approveUSDC}
					>
						Approve
					</Button>
					<Button
						type="button"
						className="flex-1 p-2  font-semibold"
						onClick={deposit}
					>
						Deposit
					</Button>
				</div>
			) : (
				<div>Connect your wallet first</div>
			)}
		</div>
	);
};

export default Deposit;
