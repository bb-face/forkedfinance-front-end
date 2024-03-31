import { atom } from "recoil";

export const walletState = atom({
	key: "walletState",
	default: {
		isConnected: false,
		address: null,
		balance: 0,
	},
});
