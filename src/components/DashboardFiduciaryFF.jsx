function DashboardFiduciaryFF() {
	return (
		<div className="stakeCardFF">
			<div className="stakeCardHeader">
				<div>Fiduciary FF</div>
			</div>
			<div className="cardRow">
				<div>Price</div>
				<div>Soon... I promise</div>
			</div>
			<div className="cardRow">
				<div>Wallet</div>
				<div>{fidFFAccountBalance}</div>
			</div>
			<div className="cardRow">
				<div>Staked</div>
				<div>{fidFFStakedAmounts}</div>
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
				<div>Vesting Status</div>
				<div>{vestedStatus}%</div>
			</div>
			<div className="cardRow">
				<div>FF Claimable</div>
				<div>{vestedFF}</div>
			</div>

			<div className="cardRow">
				<div>Total Staked</div>
				<div>{fidFFTotalDepositSuply}</div>
			</div>
			<div className="cardRow">
				<div>Total Supply</div>
				<div>{fidFFSupply}</div>
			</div>
			<div className="stakeCardFooter">
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
	);
}

export default DashboardFiduciaryFF;
