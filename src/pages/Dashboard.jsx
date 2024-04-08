import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { Input } from "antd";

import usdcABI from "../assets/USDCABI.json";




import rewardRouterABI from "../assets/RewardRouterABI.json";
import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import stableCoinTrackerNoFeeABI from "../assets/StableCoinNoFeeABI.json";

import rewardTrackerABI from "../assets/RewardTrackerABI.json";

import distributorABI from "../assets/DistributorABI.json";


import ffABI from "../assets/FfABI.json";

import { useGlobalContext } from "../context/context";

const url = "https://server.forkedfinance.xyz";

const ff = "0x00295670C7f8C501f58FA66f1a161a66A05ddC78";

const USDCAddress = "0x55d030B2A681605b7a1E32d8D924EE124e9D01b7";
const rewardRouter = "0x89E9B4AC2eD32a404c63FCCC507e7DD74E03bd4B";

const feeUsdc = "0xD04f6170Db4B957502FC574049624f72DB64C4Ba";
const feeFF = "0x81706c695834a6a087D2100B2e52eEeFB158bA7f";




const usdcModalLabel = "USDC";
const FFModalLabel = "FF";


const unstakeModalButton = "Stop Earning";


const depositModalButton = "Deposit";
const withdrawModalButton = "Withdraw";
const depositStablecoinModalHeading = "Deposit Stablecoin - 0.5% Fee";
const withdrawStablecoinModalHeading = "Withdraw Stablecoin - 0.5% Fee";
const stakeFFModalHeading = "Stake FF";
const unstakeFFModalHeading = "Unstake FF";



const usdcDecimals = 10 ** 6;
const decimals = 10 ** 18;
const secondsPerYear = 31536000;

function Dashboard() {
	const { user } = useGlobalContext();
	const [currentAccount, setCurrentAccount] = useState(null);
	const [shortCurrentAccount, setShortCurrentAccount] = useState(null);

	const [amount, setAmount] = useState(null);
	const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);
	

	const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
	const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
		useState(null);

	const [modal, setModal] = useState(false);
	const [modalHeading, setModalHeading] = useState(false);
	const [modalLabel, setModalLabel] = useState(false);
	const [modalButton, setModalButton] = useState(false);

	const [balance, setBalance] = useState(null);
	const [APR, setAPR] = useState(null);
	const [feeFFAPR, setFeeFFAPR] = useState(null);
	
	const [ffClaimableRewards, setFFClaimableRewards] = useState(null);
	const [usdcClaimableRewards, setUsdcClaimableRewards] = useState(null);
	const [totalFeeClaimableRewards, setTotalFeeClaimableRewards] =
		useState(null);

	const [ffPrice, setFFPrice] = useState(null);
	const [ffSupply, setFFSuply] = useState(null);
		
	const [ffBalance, setFFBalance] = useState(null);
	const [ffStakedAmounts, setFFStakedAmounts] = useState(null);
	
	const [ffTotalStakedAmounts, setFFTotalStakedAmounts] = useState(null);

	function changeAmount(e) {
		setAmount(e.target.value);
	}

	function handleModalButton(modalHeading) {
		if (modalHeading === depositStablecoinModalHeading) {
			depositUSDC();
		}
		if (modalHeading === withdrawStablecoinModalHeading) {
			withdrawUSDC();
		}
		if (modalHeading === stakeFFModalHeading) {
			stakeFF();
		}
		if (modalHeading === unstakeFFModalHeading) {
			unstakeFF();
		}
		
		
		
	}

	const depositUSDC = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);

				const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);
				const allowance = await usdcContract.allowance(currentAddress, feeUsdc);
				const parsedAllowance = JSON.parse(allowance);
				if (amount > parsedAllowance) {
					const approveAmount =
						"115792089237316195423570985008687907853269984665640564039457584007913129639935";
					await usdcContract
						.approve(feeUsdc, approveAmount)
						.then((tx) => {})
						.catch((e) => {
							if (e.code === 4001) {
								console.log("Rejected");
							}
						});
				} else {
					if (!amount) {
						return;
					}

					const parsedAmount = ethers.utils.parseUnits(amount, 6);

					await contractRewardRouter
						.depositUsdc(parsedAmount)
						.then((tx) => {
							console.log(tx.hash);
							//do whatever you want with tx
						})
						.catch((e) => {
							if (e.code === 4001) {
								console.log("Rejected");
							}
						});
				}
			}
		}
	};
	const withdrawUSDC = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);
				const parsedAmount = ethers.utils.parseUnits(amount, 6);

				await contractRewardRouter
					.withdrawUsdc(parsedAmount)
					.then((tx) => {
						//do whatever you want with tx
					})
					.catch((e) => {
						if (e.code === 4001) {
							console.log("Rejected");
						}
					});
			}
		}
	};
	const stakeFF = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);
				const ffContract = new ethers.Contract(ff, ffABI, signer);
				const allowance = await ffContract.allowance(currentAddress, stakedFF);

				if (amount > allowance) {
					const approveAmount =
						"115792089237316195423570985008687907853269984665640564039457584007913129639935";
					await ffContract
						.approve(stakedFF, approveAmount)
						.then((tx) => {})
						.catch((e) => {
							if (e.code === 4001) {
								console.log("Rejected");
							}
						});
				} else {
					const parsedUnit = ethers.utils.parseUnits(amount, 18);

					await contractRewardRouter
						.stakeFF(parsedUnit)
						.then((tx) => {
							console.log(tx);
							//do whatever you want with tx
						})
						.catch((e) => {
							if (e.code === 4001) {
								console.log("Rejected");
							}
						});
				}
			}
		}
	};
	const unstakeFF = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);

				const parsedUnit = ethers.utils.parseUnits(amount, 18);

				await contractRewardRouter
					.unstakeFF(parsedUnit)
					.then((tx) => {
						//do whatever you want with tx
					})
					.catch((e) => {
						if (e.code === 4001) {
							console.log("Rejected");
						}
					});
			}
		}
	};
	
	
	const compound = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);

				await contractRewardRouter
					.handleRewards(true, true, true, true, true, true, true)
					.then((tx) => {
						//do whatever you want with tx
					})
					.catch((e) => {
						if (e.code === 4001) {
							console.log("Rejected");
						}
					});
			}
		}
	};
	const claimRewards = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);

				await contractRewardRouter
					.handleRewards(true, false, true, false, false, true, false)
					.then((tx) => {
						//do whatever you want with tx
					})
					.catch((e) => {
						if (e.code === 4001) {
							console.log("Rejected");
						}
					});
			}
		}
	};

	
	const getAccountContractsData = async () => {
		if (window.ethereum?.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const network = await provider.getNetwork();
			await provider.send("eth_requestAccounts");
			const currentAddress = await provider
				.getSigner()
				.getAddress()
				.catch((e) => {
					if (e.code === 4001) {
						console.log("Rejected");
					}
				});

			setCurrentAccount(currentAddress);
			setShortCurrentAccount(
				`${currentAddress.slice(0, 7)}...${currentAddress.slice(36)}`,
			);
			const signer = provider.getSigner();

			async function signerContract(address, ABI) {
				return new ethers.Contract(address, ABI, signer);
			}

			function formatUsdc(chainOutput) {
				return (
					Math.round(
						parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10,
					) / 10
				);
			}
			function formatErc(chainOutput) {
				return (
					Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) /
					10
				);
			}

			if (network.chainId === 5) {
				// Trackers

				const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);
				

				const usdcFeeTrackerContract = new ethers.Contract(
					feeUsdc,
					stableCoinTrackerABI,
					signer,
				);
				

				const stakedFFContract = new ethers.Contract(
					stakedFF,
					rewardTrackerABI,
					signer,
				);
				const feeFFTrackerContract = new ethers.Contract(
					feeFF,
					rewardTrackerABI,
					signer,
				);
				

				const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
				const parsedUsdcBalance = ethers.utils.formatUnits(
					JSON.parse(currentUsdcBalance, null, 2),
					6,
				);
				setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

				

				const currentUsdcStaked =
					await usdcFeeTrackerContract.stakedAmounts(currentAddress);

				

				

				//.................................................................

				

				const claimableUsdcFeeReward =
					await usdcFeeTrackerContract.claimable(currentAddress);

				setUsdcClaimableRewards(formatUsdc(claimableUsdcFeeReward));
				setStableCoinStakedAmount(formatUsdc(currentUsdcStaked));

				const ffStakedAmount = await stakedFFContract.depositBalances(
					currentAddress,
					ff,
				);
				setFFStakedAmounts(
					Math.round(ethers.utils.formatEther(ffStakedAmount) * 10) / 10,
				);

				const claimableFFFeeReward =
					await feeFFTrackerContract.claimable(currentAddress);
				setFFClaimableRewards(formatUsdc(claimableFFFeeReward));

				

				
				// Tokens

				const ffContract = new ethers.Contract(ff, ffABI, signer);
				const ffAccountBalance = await ffContract.balanceOf(currentAddress);
				if (!ffAccountBalance) {
					setFFBalance("0");
				} else {
					setFFBalance(
						Math.round(ethers.utils.formatEther(ffAccountBalance) * 10) / 10,
					);
				}

				// Distributors
				const stableFeeDistributor = new ethers.Contract(
					usdcFeeDistributor,
					distributorABI,
					signer,
				);
				const stableRewards = await stableFeeDistributor.pendingRewards();

				const ffFeeDistributor = new ethers.Contract(
					feeFFDistributor,
					distributorABI,
					signer,
				);

				

				

				setTotalFeeClaimableRewards(
					Math.round(
						(formatUsdc(claimableUsdcFeeReward) +
							formatUsdc(claimableFFFeeReward)) *
							10,
					) / 10,
				);

				
				

				
			}
		}
	};
	const getContractsData = async () => {
		const provider = new ethers.providers.JsonRpcProvider(
			`https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
		);
		const network = await provider.getNetwork();

		async function providerContract(address, ABI) {
			return new ethers.Contract(address, ABI, provider);
		}

		function formatUsdc(chainOutput) {
			return (
				Math.round(parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10) /
				10
			);
		}
		function formatErc(chainOutput) {
			return (
				Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) / 10
			);
		}
		if (network.chainId === 5) {
			const stableCoinTrackerContract = await providerContract(
				feeUsdc,
				stableCoinTrackerABI,
			);
			
			const stakedFFContract = await providerContract(
				stakedFF,
				rewardTrackerABI,
			);

			const feeFFTracker = await providerContract(feeFF, stableCoinTrackerABI);

			
			const sFFSupply = await stakedFFContract.totalSupply();
			const sFFTPI = await stakedFFContract.tokensPerInterval();

			

			const totalStableCoinStaked =
				await stableCoinTrackerContract.totalDepositSupply(USDCAddress);

			setTotalStableCoinStakedAmount(formatUsdc(totalStableCoinStaked));

			const feeTokensPerInterval =
				await stableCoinTrackerContract.tokensPerInterval();
			const tokensPerYear = feeTokensPerInterval * secondsPerYear;

			setAPR(
				Math.round(
					(formatUsdc(tokensPerYear) / formatUsdc(totalStableCoinStaked)) *
						1000,
				) / 10,
			);

			const feeFFTotalSupply = await feeFFTracker.totalSupply();

			const ffFeeTokensPerInterval = await feeFFTracker.tokensPerInterval();
			const ffFeeAPR =
				Math.round(
					(formatUsdc(ffFeeTokensPerInterval * secondsPerYear) /
						formatErc(feeFFTotalSupply)) *
						1000,
				) / 10;
			setFeeFFAPR(ffFeeAPR);

			const ffContract = new ethers.Contract(ff, ffABI, provider);

			const ffTotalSupply = await ffContract.totalSupply();
			setFFSuply(Math.round(ethers.utils.formatEther(ffTotalSupply)));
		}
	};

	const updateBalance = async () => {
		try {
			setBalance(Math.round((user / 1000000) * 100) / 100);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleModal = (heading, label, button) => {
		setModalHeading(heading);
		setModalLabel(label);
		setModalButton(button);
		setModal(!modal);
	};

	const closeModal = () => {
		setModal(!modal);
	};

	if (modal) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}
	// getAccountContractsData();
	// getContractsData();
	const chainChanged = () => {
		window.location.reload();
	};
	window.ethereum.on("chainChanged", chainChanged);
	window.ethereum.on("accountChanged", getAccountContractsData);

	useEffect(() => {
		updateBalance();
		getAccountContractsData();
		getContractsData();
	}, [updateBalance, getAccountContractsData, getContractsData]);

	return (
		<div className="page">
			{alert.show && (
				<div className={`alert alert-${alert.type}`}>{alert.text}</div>
			)}
			{modal && (
				<>
					<button type="button" onClick={closeModal} className="overlay" />
					<div className="modal">
						<div className="modal-content">
							<div className="modal-heading">{modalHeading}</div>
							<div className="modal-divider">
								<hr />
							</div>
							<button
								type="button"
								className="close-modal"
								onClick={closeModal}
							>
								✕
							</button>
							<div className="modal-input">
								<Input
									type="number"
									placeholder="0.0"
									bordered={false}
									onChange={changeAmount}
								/>
								<div className="label">{modalLabel}</div>
							</div>
							<div className="modal-divider">
								<hr />
							</div>
							<div className="modal-buttons">
								<button
									type="button"
									className="modalButton"
									onClick={() => {
										handleModalButton(modalHeading);
									}}
								>
									{modalButton}
								</button>
							</div>
						</div>
					</div>
				</>
			)}
			<div className="header">
				<Link to="/transfer" className="inTextLink">
					Pay Someone without Gas or Transaction Fees
				</Link>

				<div>
					Avaliable Balance: <span>{balance}</span>
				</div>

				<div className="wallet">
					Connected Wallet: <span>{shortCurrentAccount}</span>
				</div>
			</div>

			<div className="stakeContent">
				<div className="stakeCards">
					<div className="stakeCard">
						<div className="stakeCardHeader">
							<div>USDC </div>
						</div>
						<div className="divider">
							<hr />
						</div>
						<div className="cardRow">
							<div>
								<div>Wallet</div>
							</div>
							<div>
								<div>${usdcAccountBalance}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Staked</div>
							</div>
							<div>
								<div>${stableCoinStakedAmount} </div>
							</div>
						</div>
						<div className="cardRow">
							{/* <div>
								<div>APR</div>
							</div>
							<div>
								<div>{APR}%</div>
							</div> */}
						</div>
						<div className="cardRow">
							<div>
								<div>Points</div>
							</div>
							{/* <div>
								<div>${usdcClaimableRewards}</div>
							</div> */}
						</div>
						
						<div className="cardRow">
							{/* <div>
								<div>Total Staked</div>
							</div> */}
							<div>
								<div>${totalStableCoinStakedAmount}</div>
							</div>
						</div>

						<div className="stakeCardFooter">
							<div className="divider">
								<hr />
							</div>
							<div className="cardRow">
								<div className="cardRowButtons">
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												depositStablecoinModalHeading,
												usdcModalLabel,
												depositModalButton,
											);
										}}
									>
										Stake
									</button>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												withdrawStablecoinModalHeading,
												usdcModalLabel,
												withdrawModalButton,
											);
										}}
									>
										Unstake
									</button>
									
									
								</div>
							</div>
						</div>
					</div>
					<div className="stakeCard">
						<div className="stakeCardHeader">
							<div>Total Points</div>
						</div>
						<div className="divider">
							<hr />
						</div>
						<div className="cardRow">
							<div>
								<div>USDC</div>
							</div>
							<div>
								<div>{totalFeeClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Tuto</div>
							</div>
							
						</div>
						
						

						<div className="stakeCardFooter">
							<div className="divider">
								<hr />
								<div className="cardRow">
									<div className="cardRowButtons">
										
							
										<button
											type="button"
											className="cardButton"
											onClick={claimRewards}
										>
											Claim
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="stakeCardFF">
							<div className="stakeCardHeader">
								<div>Tuto</div>
							</div>
							<div className="divider">
								<hr />
							</div>
							<div className="cardRow">
								<div>
									<div>Price</div>
								</div>
								<div>
									<div> Soon!</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Wallet</div>
								</div>
								<div>
									<div>{ffBalance}</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Staked</div>
								</div>
								<div>
									<div>{ffStakedAmounts}</div>
								</div>
							</div>
							{/* <div className="cardRow">
								<div>
									<div>APR</div>
								</div>
								<div>
									<div>{feeFFAPR}%</div>
								</div>
							</div> */}
							<div className="cardRow">
								<div>
									<div>Points</div>
								</div>
								<div>
									<div>{ffClaimableRewards}</div>
								</div>
							</div>
							
							
					
							<div className="cardRow">
								<div>
									<div>Total Staked</div>
								</div>
								<div>
									<div>{ffTotalStakedAmounts}</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Total Supply</div>
								</div>
								<div>
									<div>{ffSupply}</div>
								</div>
							</div>
							<div className="stakeCardFooter">
								<div className="divider" />
								<hr />
							</div>
							<div className="cardRow">
								<div className="cardRowButtons">
									<a href="test" className="cardButton">
										Buy
									</a>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												stakeFFModalHeading,
												FFModalLabel,
												stakeModalButton,
											);
										}}
									>
										Stake
									</button>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												unstakeFFModalHeading,
												FFModalLabel,
												unstakeModalButton,
											);
										}}
									>
										Unstake
									</button>
								</div>
							</div>
						</div>
					</div>
					
						
					
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
