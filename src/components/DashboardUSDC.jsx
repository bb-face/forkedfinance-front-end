import { useState } from "react";

import {
	depositStablecoinModalHeading,
	usdcModalLabel,
	withdrawModalButton,
	withdrawStablecoinModalHeading,
} from "../costant/prod-costant";

function DashboardUSDC() {
	const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);
	const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
	const [usdcClaimableRewards, setUsdcClaimableRewards] = useState(null);
	const [usdcReserved, setUsdcReserved] = useState(null);
	const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
		useState(null);

	const toggleModal = (heading, label, button) => {
		setModalHeading(heading);
		setModalLabel(label);
		setModalButton(button);
		setModal(!modal);
	};

	return (
		<div className="stakeCard">
			<div className="stakeCardHeader">
				<div>USDC </div>
			</div>
			<div className="cardRow">
				<div>Wallet</div>
				<div>${usdcAccountBalance}</div>
			</div>
			<div className="cardRow">
				<div>Staked</div>
				<div>${stableCoinStakedAmount} </div>
			</div>
			<div className="cardRow">
				<div>APR</div>
				<div>{APR}%</div>
			</div>
			<div className="cardRow">
				<div>Rewards</div>
				<div>${usdcClaimableRewards}</div>
			</div>
			<div className="cardRow">
				<div>Reserved for Vesting</div>
				<div>${usdcReserved}</div>
			</div>
			<div className="cardRow">
				<div>Total Staked</div>
				<div>${totalStableCoinStakedAmount}</div>
			</div>

			<div className="stakeCardFooter">
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
	);
}

export default DashboardUSDC;
