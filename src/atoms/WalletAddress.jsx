const WalletAddress = ({ address }) => {
	const formatAddress = (address) => {
		return address
			? `${address.slice(0, 6)}...${address.slice(-4)}`
			: "No Address";
	};

	return (
		<div>
			<p>{formatAddress(address)}</p>
		</div>
	);
};

export default WalletAddress;
