async function getWalletAddress() {
	if (!window.ethereum?.isMetaMask) {
		return "metamsk is not installed";
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	await provider.send("eth_requestAccounts");
	const currentAddress = await provider
		.getSigner()
		.getAddress()
		.catch((error) => {
			if (error.code === 4001) {
				console.log("Rejected");
			}
			return;
		});

	return currentAddress;
}

export default getWalletAddress;
