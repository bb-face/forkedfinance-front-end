import { atom, selector } from "recoil";

export const userBalanceAtom = atom({
  key: "userBalance",
  default: 0,
});

export const transformedUserBalance = selector({
  key: "transformedUserBalance",
  get: ({ get }) => {
    const balance = get(userBalanceAtom);

    return Math.round((balance / 1000000) * 100) / 100;
  },
});
