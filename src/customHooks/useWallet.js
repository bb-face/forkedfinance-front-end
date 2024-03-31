import { useSetRecoilState } from "recoil";
import { walletState } from "../state/wallet";

export function useWallet() {
	const setWallet = useSetRecoilState(walletState);

	const connectWallet = async () => {
		if (window.ethereum) {
			const addressArray = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const address = addressArray[0];

			setWallet({
				isConnected: true,
				address: address,
			});
		} else {
			console.error("Ethereum object doesn't exist!");
		}
	};

	const disconnectWallet = () => {
		setWallet({
			isConnected: false,
			address: null,
			balance: 0,
		});
	};

	return { connectWallet, disconnectWallet };
}
