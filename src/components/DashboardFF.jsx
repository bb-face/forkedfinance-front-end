function DashboardFF() {
	return (
		<div className="stakeCardFF">
			<div className="stakeCardHeader">
				<div>FF</div>
			</div>
			<div className="cardRow">
				<div>Price</div>
				<div> Soon!</div>
			</div>
			<div className="cardRow">
				<div>Wallet</div>
				<div>{ffBalance}</div>
			</div>
			<div className="cardRow">
				<div>Staked</div>
				<div>{ffStakedAmounts}</div>
			</div>
			<div className="cardRow">
				<div>APR</div>
				<div>{feeFFAPR}%</div>
			</div>
			<div className="cardRow">
				<div>Rewards</div>
				<div>${ffClaimableRewards}</div>
			</div>
			<div className="cardRow">
				<div>Boost Percentage</div>
				<div>{boostPercentageAPR}%</div>
			</div>
			<div className="cardRow">
				<div>Reserved for Vesting</div>
				<div>{ffReserved}</div>
			</div>
			<div className="cardRow">
				<div>Total Staked</div>
				<div>{ffTotalStakedAmounts}</div>
			</div>
			<div className="cardRow">
				<div>Total Supply</div>
				<div>{ffSupply}</div>
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
							toggleModal(stakeFFModalHeading, FFModalLabel, stakeModalButton);
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
	);
}

export default DashboardFF;
