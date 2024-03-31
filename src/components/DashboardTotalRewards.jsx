function DashboardTotalRewards() {
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
