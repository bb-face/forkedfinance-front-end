import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Popover } from "antd";
import { WalletTwoTone } from "@ant-design/icons";
import { ethers } from "ethers";

import { useGlobalContext } from "../context/context";
import useLocalState from "../utils/localState";

const url = "https://server.forkedfinance.xyz";

const Transfer = () => {
	const { user } = useGlobalContext();
	const [transferTo, settransferTo] = useState(null);
	const [transferAmount, setTransferAmount] = useState(null);
	const [balance, setBalance] = useState(null);

	const { alert, showAlert, setLoading, setSuccess, hideAlert } =
		useLocalState();

	const updateBalance = async () => {
		try {
			// const { data } = await axios.get(`${url}/api/v1/users/updateBalance`, {
			//   withCredentials: true,
			// });
			setBalance(Math.round((user / 1000000) * 100) / 100);
		} catch (error) {
			console.log(error);
		}
	};

	const transferBalance = async (e) => {
		e.preventDefault();
		setLoading(true);
		hideAlert();
		if (!transferAmount) {
			showAlert({
				text: "Please state the amount...",
			});
			setTimeout(() => {
				hideAlert();
			}, 7000);
			setLoading(false);
			return;
		}
		if (!transferTo) {
			showAlert({
				text: "Please provide wallet..",
			});
			setTimeout(() => {
				hideAlert();
			}, 7000);
			setLoading(false);
			return;
		}
		try {
			const { currentAddress, signedMessage } = await signTransfer();
			const { data } = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/balances/transferBalance`,
				{
					account: currentAddress,
					// unsignedMessage: unsignedMessage,
					signedMessage: signedMessage,
					walletTo: transferTo,
					amount: transferAmount,
				},
			);

			showAlert({ text: data.msg, type: "success" });
			setTimeout(() => {
				hideAlert();
			}, 7000);
			setSuccess(true);
		} catch (error) {
			showAlert({ text: error.response.data.msg });
			setTimeout(() => {
				hideAlert();
			}, 7000);
			setSuccess(true);
		}
		updateBalance();
		setLoading(false);
	};

	const signTransfer = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const currentAddress = await provider
			.getSigner()
			.getAddress()
			.catch((e) => {
				if (e.code === 4001) {
					console.log("Rejected");
				}
			});

		const unsignedMessage = process.env.REACT_APP_SECRET_SIGN_STRING;
		const payload = ethers.utils.defaultAbiCoder.encode(
			// [process.env.REACT_APP_SECRET_SIGN_STRING],
			["string"],
			[unsignedMessage],
		);
		const payloadHash = ethers.utils.keccak256(payload);

		const signedMessage = await signer
			.signMessage(ethers.utils.arrayify(payloadHash))
			.catch((e) => {
				if (e.code === 4001) {
					console.log("Rejected");
				}
			});

		if (!signedMessage) {
			return;
		}
		// const fullyExpandedSig = ethers.utils.splitSignature(signedMessage);

		// const signingAddress = ethers.utils.verifyMessage(
		//   ethers.utils.arrayify(payloadHash),
		//   fullyExpandedSig
		// );
		const data = { currentAddress, signedMessage };
		return data;
	};

	const validateBalanceTo = async (e) => {
		e.preventDefault();
		setLoading(true);
		hideAlert();
		console.log("test");

		console.log(process.env.REACT_APP_SERVER_URL);
		if (!transferTo) {
			showAlert({
				text: "Please provide Wallet",
			});
			setTimeout(() => {
				hideAlert();
			}, 7000);
			setLoading(false);
			return;
		}
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/balances/validateBalanceTo`,
				{
					walletTo: transferTo,
				},
			);
			showAlert({ text: data.msg, type: "success" });
			setSuccess(true);
		} catch (error) {
			showAlert({
				text: error.response.data.msg,
			});
			setSuccess(true);
		}
		// updateBalance();
		setTimeout(() => {
			hideAlert();
		}, 7000);

		setLoading(false);
	};

	function changeAmount(e) {
		setTransferAmount(e.target.value);
	}
	function changetransferTo(e) {
		settransferTo(String(e.target.value));
	}

	useEffect(() => {
		updateBalance();
		clearTimeout();
	}, [updateBalance]);

	return (
		<div className="page">
			{alert.show && (
				<div className={`alert alert-${alert.type}`}>{alert.text}</div>
			)}

			{/* {loading && hideAlert()} */}
			<div className="tradeBox">
				<div className="tradeBoxHeader">
					<h4>Pay Someone</h4>
					<Popover
						content={balance}
						title="Balance"
						trigger="click"
						placement="bottom"
					>
						<WalletTwoTone twoToneColor="#504acc" className="cog" />
					</Popover>
				</div>

				<div className="inputs">
					<Input
						placeholder="Wallet"
						value={transferTo}
						type="string"
						onChange={changetransferTo}
						//   disabled={!prices}
					/>
					<Input
						placeholder="Amount"
						type="number"
						value={transferAmount}
						onChange={changeAmount}
					/>
				</div>

				<div className="buttons">
					{/* <Popover
            content={userTo}
            title="Details matching..."
            // trigger=
            placement="bottom"
            arrow=""
          > */}
					<button
						type="button"
						className="validateButton"
						onClick={validateBalanceTo}
						//   disabled={!transferTo || !transferAmount}
					>
						Not Sure?
					</button>
					{/* </Popover> */}
					<button
						type="button"
						className="swapButton"
						onClick={transferBalance}

						//   disabled={!transferTo || !transferAmount}
					>
						GO!
					</button>
				</div>
			</div>
		</div>
	);
};

export default Transfer;
