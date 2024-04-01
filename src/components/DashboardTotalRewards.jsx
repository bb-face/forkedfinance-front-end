import { useState } from "react";

function DashboardTotalRewards() {
	const [totalFeeClaimableRewards, setTotalFeeClaimableRewards] =
		useState(null);
	const [totalFidFFClaimableRewards, setTotalFidFFClaimableRewards] =
		useState(null);
	const [vestedFF, setVestedFF] = useState(null);
	const [bonusClaimableRewards, setBonusClaimableRewards] = useState(null);
	const [bnStakedAmounts, setBnStakedAmounts] = useState(null);

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

	return (
		<div className="stakeCard">
			<div>Total Rewards</div>
			<div className="cardRow">
				<div>USDC</div>
				<div>${totalFeeClaimableRewards}</div>
			</div>
			<div className="cardRow">
				<div>FF</div>
				<div>{vestedFF}</div>
			</div>
			<div className="cardRow">
				<div>Fiduciary FF</div>
				<div>{totalFidFFClaimableRewards}</div>
			</div>
			<div className="cardRow">
				<div>Multiplier Points APR</div>
				<div>100%</div>
			</div>
			<div className="cardRow">
				<div>Multiplier Points</div>
				<div>{bonusClaimableRewards}</div>
			</div>
			<div className="cardRow">
				<div>Staked Multiplier Points</div>
				<div>{bnStakedAmounts}</div>
			</div>
			<div className="cardRow">
				<button type="button" className="cardButton" onClick={compound}>
					Compound
				</button>
				<button type="button" className="cardButton" onClick={claimRewards}>
					Claim
				</button>
			</div>
		</div>
	);
}

export default DashboardTotalRewards;
