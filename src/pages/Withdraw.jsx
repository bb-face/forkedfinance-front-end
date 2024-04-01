import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { ethers } from "ethers";
import { walletState } from "../state/wallet";

import Button from "../atoms/Button";
import BankABI from "../assets/BankABI.json";
import { url, bankAddress } from "../costant/prod-costant";

const Withdraw = () => {
	const wallet = useRecoilValue(walletState);

	const [withdrawalAmount, setwithdrawalAmount] = useState(null);
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
					value={withdrawalAmount}
					onChange={changeAmount}
				/>
			</div>

			{wallet.isConnected ? (
				<div className="flex justify-between space-x-4">
					<Button
						type="button"
						className="flex-1 p-2  font-semibold"
						onClick={withdraw}
					>
						Withdraw
					</Button>
				</div>
			) : (
				<div>Connect your wallet first</div>
			)}
		</div>
	);
};

export default Withdraw;
