import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { Link } from "react-router-dom";

import usdcABI from "../assets/USDCABI.json";
import fidFFABI from "../assets/FidFFABI.json";
import vesterABI from "../assets/VesterABI.json";
import usdcVesterABI from "../assets/UsdcVesterABI.json";

import rewardRouterABI from "../assets/RewardRouterABI.json";
import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import stableCoinTrackerNoFeeABI from "../assets/StableCoinNoFeeABI.json";

import rewardTrackerABI from "../assets/RewardTrackerABI.json";

import distributorABI from "../assets/DistributorABI.json";
import bonusDistributorABI from "../assets/BonusDistributorABI.json";

import ffABI from "../assets/FfABI.json";

import { useGlobalContext } from "../context/context";

function Dashboard() {
	const { user } = useGlobalContext();

	const [amount, setAmount] = useState(null);
	const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);
	const [fidFFAccountBalance, setFidFFAccountBalance] = useState(null);

	const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
	const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
		useState(null);

	const [modal, setModal] = useState(false);
	const [modalButton, setModalButton] = useState(false);

	const [balance, setBalance] = useState(null);
	const [APR, setAPR] = useState(null);
	const [feeFFAPR, setFeeFFAPR] = useState(null);
	const [sUsdcFidFFAPR, setSUsdcFidFFAPR] = useState(null);
	const [stakedFFFidFFAPR, setStakedFFFidFFAPR] = useState(null);

	const [ffClaimableRewards, setFFClaimableRewards] = useState(null);
	const [usdcClaimableRewards, setUsdcClaimableRewards] = useState(null);
	const [totalFeeClaimableRewards, setTotalFeeClaimableRewards] =
		useState(null);

	const [totalFidFFClaimableRewards, setTotalFidFFClaimableRewards] =
		useState(null);
	const [bonusClaimableRewards, setBonusClaimableRewards] = useState(null);

	const [fidFFTotalDepositSuply, setFidFFTotalDepositSuply] = useState(null);

	const [ffPrice, setFFPrice] = useState(null);
	const [ffSupply, setFFSuply] = useState(null);
	const [fidFFSupply, setFidFFSupply] = useState(null);

	const [usdcReserved, setUsdcReserved] = useState(null);
	const [ffReserved, setFFReserved] = useState(null);
	const [vestedFF, setVestedFF] = useState(null);
	const [vestedStatus, setVestedStatus] = useState(null);

	const [ffBalance, setFFBalance] = useState(null);
	const [ffStakedAmounts, setFFStakedAmounts] = useState(null);
	const [bnStakedAmounts, setBnStakedAmounts] = useState(null);
	const [fidFFStakedAmounts, setFidFFStakedAmounts] = useState(null);
	const [boostPercentageAPR, setBoostPercentageAPR] = useState(0);

	const [ffTotalStakedAmounts, setFFTotalStakedAmounts] = useState(null);

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
		if (modalHeading === stakeFidFFModalHeading) {
			stakeFidFF();
		}
		if (modalHeading === unstakeFidFFModalHeading) {
			unstakeFidFF();
		}
		if (modalHeading === usdcVestFidFFModalHeading) {
			usdcVest();
		}
		if (modalHeading === usdcUnvestFidFFModalHeading) {
			usdcUnvest();
		}
		if (modalHeading === vestFidFFModalHeading) {
			ffVest();
		}
		if (modalHeading === unvestFidFFModalHeading) {
			ffUnvest();
		}
	}

	const depositUSDC = async () => {
		if (window.ethereum?.isMetaMask) {
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
	const stakeFidFF = async () => {
		if (window.ethereum?.isMetaMask) {
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);
				const fidFFContract = new ethers.Contract(fidFF, fidFFABI, signer);
				const allowance = await fidFFContract.allowance(
					currentAddress,
					stakedFF,
				);
				const parsedAllowance = JSON.parse(allowance);

				if (amount > parsedAllowance) {
					const approveAmount =
						"115792089237316195423570985008687907853269984665640564039457584007913129639935";
					await fidFFContract
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
						.stakeFidFF(parsedUnit)
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
		}
	};
	const unstakeFidFF = async () => {
		if (window.ethereum?.isMetaMask) {
			const signer = provider.getSigner();

			if (network.chainId === 5) {
				const contractRewardRouter = new ethers.Contract(
					rewardRouter,
					rewardRouterABI,
					signer,
				);

				const parsedUnit = ethers.utils.parseUnits(amount, 18);

				await contractRewardRouter
					.unstakeFidFF(parsedUnit)
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

	const usdcVest = async () => {
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
				const vesterContract = new ethers.Contract(
					usdcVester,
					usdcVesterABI,
					signer,
				);

				const parsedAmount = ethers.utils.parseUnits(amount, 18);

				await vesterContract
					.deposit(parsedAmount)
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
	};
	const usdcUnvest = async () => {
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
				const vesterContract = new ethers.Contract(
					usdcVester,
					usdcVesterABI,
					signer,
				);

				// const parsedAmount = ethers.utils.parseUnits(amount, 18);

				await vesterContract
					.withdraw()
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
	const ffVest = async () => {
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
				const vesterContract = new ethers.Contract(ffVester, vesterABI, signer);

				const parsedAmount = ethers.utils.parseUnits(amount, 18);

				await vesterContract
					.deposit(parsedAmount)
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

	const ffUnvest = async () => {
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
				const vesterContract = new ethers.Contract(ffVester, vesterABI, signer);

				await vesterContract
					.withdraw()
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
			const currentAddress = "Todo";

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
				const fidFFContract = new ethers.Contract(fidFF, fidFFABI, signer);

				const usdcFeeTrackerContract = new ethers.Contract(
					feeUsdc,
					stableCoinTrackerABI,
					signer,
				);
				const usdcFidFFTrackerContract = new ethers.Contract(
					stakedUsdc,
					stableCoinTrackerNoFeeABI,
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
				const bonusTrackerContract = new ethers.Contract(
					bonusFF,
					rewardTrackerABI,
					signer,
				);

				const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
				const parsedUsdcBalance = ethers.utils.formatUnits(
					JSON.parse(currentUsdcBalance, null, 2),
					6,
				);
				setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

				const currentFidFFBalance =
					await fidFFContract.balanceOf(currentAddress);
				setFidFFAccountBalance(
					Math.round(ethers.utils.formatEther(currentFidFFBalance) * 10) / 10,
				);

				const currentUsdcStaked =
					await usdcFeeTrackerContract.stakedAmounts(currentAddress);

				// FidFF to claim

				const usdcClaimableFidFFReward =
					await usdcFidFFTrackerContract.claimable(currentAddress);

				const ffClaimableFidFFReward =
					await stakedFFContract.claimable(currentAddress);

				setTotalFidFFClaimableRewards(
					Math.round(
						(parseFloat(ethers.utils.formatEther(usdcClaimableFidFFReward)) +
							parseFloat(ethers.utils.formatEther(ffClaimableFidFFReward))) *
							10,
					) / 10,
				);

				//.................................................................

				const claimableBonusReward =
					await bonusTrackerContract.claimable(currentAddress);
				setBonusClaimableRewards(formatErc(claimableBonusReward));

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

				const fidFFStakedBalance = await stakedFFContract.depositBalances(
					currentAddress,
					fidFF,
				);

				setFidFFStakedAmounts(
					Math.round(ethers.utils.formatEther(fidFFStakedBalance) * 10) / 10,
				);

				const bnStakedBalance = await feeFFTrackerContract.depositBalances(
					currentAddress,
					bnFF,
				);
				setBnStakedAmounts(
					Math.round(ethers.utils.formatEther(bnStakedBalance) * 10) / 10,
				);

				const boostPercentage =
					(100 * parseInt(ethers.utils.formatEther(bnStakedBalance))) /
					parseInt(
						ethers.utils.formatEther(ffStakedAmount) +
							parseInt(ethers.utils.formatEther(fidFFStakedBalance)),
					);

				if (!boostPercentage) {
					setBoostPercentageAPR("0");
				} else {
					setBoostPercentageAPR(Math.round(boostPercentage * 10) / 10);
				}

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

				const fidFFdistributor = new ethers.Contract(
					usdcFidFFDistributor,
					distributorABI,
					signer,
				);
				const fidFFRewards = await fidFFdistributor.pendingRewards();

				const bonusDistributor = new ethers.Contract(
					bonusFFDistributor,
					bonusDistributorABI,
					signer,
				);
				const pendingBonusReward = await bonusDistributor.pendingRewards();

				setTotalFeeClaimableRewards(
					Math.round(
						(formatUsdc(claimableUsdcFeeReward) +
							formatUsdc(claimableFFFeeReward)) *
							10,
					) / 10,
				);

				// Vesters

				const usdcVesterContract = await signerContract(
					usdcVester,
					usdcVesterABI,
				);
				const ffVesterContract = await signerContract(ffVester, vesterABI);

				const usdcVestedFF = await usdcVesterContract.claimable(currentAddress);
				const ffVestedFF = await ffVesterContract.claimable(currentAddress);

				const getUsdcVestedAmount =
					await usdcVesterContract.getVestedAmount(currentAddress);
				const getUsdcPairAmount = await usdcVesterContract.getPairAmount(
					currentAddress,
					getUsdcVestedAmount,
				);

				const getFFVestedAmount =
					await ffVesterContract.getVestedAmount(currentAddress);

				const getFFPairAmount = await ffVesterContract.getPairAmount(
					currentAddress,
					getFFVestedAmount,
				);

				setUsdcReserved(formatErc(getUsdcPairAmount));
				setFFReserved(formatErc(getFFPairAmount));
				setVestedFF(
					Math.round((formatErc(usdcVestedFF) + formatErc(ffVestedFF)) * 10) /
						10,
				);

				if (formatErc(usdcVestedFF) + formatErc(ffVestedFF) === 0) {
					setVestedStatus("0");
				} else {
					setVestedStatus(
						Math.round(
							((100 * (formatErc(usdcVestedFF) + formatErc(ffVestedFF))) /
								(formatErc(getUsdcVestedAmount) +
									formatErc(getFFVestedAmount))) *
								10,
						) / 10,
					);
				}
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
			const stableCoinFidFFTrackerContract = await providerContract(
				stakedUsdc,
				stableCoinTrackerNoFeeABI,
			);

			const stakedFFContract = await providerContract(
				stakedFF,
				rewardTrackerABI,
			);

			const feeFFTracker = await providerContract(feeFF, stableCoinTrackerABI);

			const sUsdcSupply = await stableCoinFidFFTrackerContract.totalSupply();
			const sUsdcTPI = await stableCoinFidFFTrackerContract.tokensPerInterval();
			const sFFSupply = await stakedFFContract.totalSupply();
			const sFFTPI = await stakedFFContract.tokensPerInterval();

			setSUsdcFidFFAPR(
				Math.round(
					((parseFloat(ethers.utils.formatEther(sUsdcTPI)) * secondsPerYear) /
						formatUsdc(sUsdcSupply)) *
						1000,
				) / 10,
			);

			setStakedFFFidFFAPR(
				Math.round(
					((parseFloat(ethers.utils.formatEther(sFFTPI)) * secondsPerYear) /
						formatErc(sFFSupply)) *
						1000,
				) / 10,
			);

			const fidFFTotalStaked = await stakedFFContract.totalDepositSupply(fidFF);
			setFidFFTotalDepositSuply(
				Math.round(ethers.utils.formatEther(fidFFTotalStaked) * 10) / 10,
			);

			const fidFFContract = await providerContract(fidFF, fidFFABI);

			const fidFFTotalSupply = await fidFFContract.totalSupply();
			setFidFFSupply(Math.round(ethers.utils.formatEther(fidFFTotalSupply)));

			const ffTotalStaked = await stakedFFContract.totalDepositSupply(ff);
			setFFTotalStakedAmounts(formatErc(ffTotalStaked));

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
			{modal && <DashboardModal />}

			<div>
				Avaliable Balance: <span>{balance}</span>
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
							<div>
								<div>APR</div>
							</div>
							<div>
								<div>{APR}%</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Rewards</div>
							</div>
							<div>
								<div>${usdcClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Reserved for Vesting</div>
							</div>
							<div>
								<div>${usdcReserved}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Total Staked</div>
							</div>
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
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												usdcVestFidFFModalHeading,
												FidFFModalLabel,
												vestModalButton,
											);
										}}
									>
										Vest
									</button>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												usdcUnvestFidFFModalHeading,
												FidFFModalLabel,
												unvestModalButton,
											);
										}}
									>
										<strike>Vest</strike>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="stakeCard">
						<div className="stakeCardHeader">
							<div>Total Rewards</div>
						</div>
						<div className="divider">
							<hr />
						</div>
						<div className="cardRow">
							<div>
								<div>USDC</div>
							</div>
							<div>
								<div>${totalFeeClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>FF</div>
							</div>
							<div>
								<div>{vestedFF}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Fiduciary FF</div>
							</div>
							<div>
								<div>{totalFidFFClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Multiplier Points APR</div>
							</div>
							<div>
								<div>100%</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Multiplier Points</div>
							</div>
							<div>
								<div>{bonusClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Staked Multiplier Points</div>
							</div>
							<div>
								<div>{bnStakedAmounts}</div>
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
											onClick={compound}
										>
											Compound
										</button>
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
								<div>FF</div>
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
							<div className="cardRow">
								<div>
									<div>APR</div>
								</div>
								<div>
									<div>{feeFFAPR}%</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Rewards</div>
								</div>
								<div>
									<div>${ffClaimableRewards}</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Boost Percentage</div>
								</div>
								<div>
									<div>{boostPercentageAPR}%</div>
								</div>
							</div>
							<div className="cardRow">
								<div>
									<div>Reserved for Vesting</div>
								</div>
								<div>
									<div>{ffReserved}</div>
								</div>
							</div>
							<br />
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
					<div className="stakeCardFF">
						<div className="stakeCardHeader">
							<div>Fiduciary FF</div>
						</div>
						<div className="divider">
							<hr />
						</div>
						<div className="cardRow">
							<div>
								<div>Price</div>
							</div>
							<div>
								<div>Soon... I promise</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Wallet</div>
							</div>
							<div>
								<div>{fidFFAccountBalance}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Staked</div>
							</div>
							<div>
								<div>{fidFFStakedAmounts}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>APR</div>
							</div>
							<div>
								<div>{feeFFAPR}%</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Rewards</div>
							</div>
							<div>
								<div>${ffClaimableRewards}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Vesting Status</div>
							</div>
							<div>
								<div>{vestedStatus}%</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>FF Claimable</div>
							</div>
							<div>
								<div>{vestedFF}</div>
							</div>
						</div>
						<br />

						<div className="cardRow">
							<div>
								<div>Total Staked</div>
							</div>
							<div>
								<div>{fidFFTotalDepositSuply}</div>
							</div>
						</div>
						<div className="cardRow">
							<div>
								<div>Total Supply</div>
							</div>
							<div>
								<div>{fidFFSupply}</div>
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
												stakeFidFFModalHeading,
												FidFFModalLabel,
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
												unstakeFidFFModalHeading,
												FidFFModalLabel,
												unstakeModalButton,
											);
										}}
									>
										Unstake
									</button>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												vestFidFFModalHeading,
												FidFFModalLabel,
												vestModalButton,
											);
										}}
									>
										Vest
									</button>
									<button
										type="button"
										className="cardButton"
										onClick={() => {
											toggleModal(
												unvestFidFFModalHeading,
												FidFFModalLabel,
												unvestModalButton,
											);
										}}
									>
										<strike>Vest</strike>
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
