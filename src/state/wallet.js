import { atom, selector } from "recoil";
import { ethers } from "ethers";

export const walletState = atom({
  key: "walletState",
  default: {
    isConnected: false,
    address: null,
    balance: 0,
  },
});

// export const walletAddressState = atom({
//   key: "walletAddressState",
//   default: "",
//   effects: [
//     ({ setSelf }) => {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//
//       provider.on("accountsChanged", (accounts) => {
//         setSelf(accounts[0] || "");
//       });
//
//       return () => {
//         provider.removeListener("accountsChanged");
//       };
//     },
//   ],
// });
//
// export const networkState = atom({
//   key: "networkState",
//   default: null,
//   effects: [
//     ({ setSelf }) => {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//
//       provider.on("network", (newNetwork, oldNetwork) => {
//         if (oldNetwork) {
//           setSelf(newNetwork);
//         }
//       });
//
//       return () => {
//         provider.removeListener("network");
//       };
//     },
//   ],
// });
//
// export const networkNameSelector = selector({
//   key: "networkNameSelector",
//   get: ({ get }) => {
//     const network = get(networkState);
//     return network ? network.name : "unknown";
//   },
// });
//
