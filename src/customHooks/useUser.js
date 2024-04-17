import axios from "axios";
import { useRecoilState } from "recoil";
import { ethers } from "ethers";

import { userState } from "../state/user";
import { isLoadingState } from "../state/isLoading";

export const useUserManagement = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const saveUser = (userData) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      if (window.ethereum?.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const currentAddress = await provider
          .getSigner()
          .getAddress()
          .catch((error) => {
            if (error.code === 4001) {
              console.log("Rejected");
            }
            return;
          });

        const resp = await axios({
          url: `${import.meta.env.VITE_SERVER_URL}/balances/${currentAddress}`,
          method: "get",
        });
        if (resp.data === 0) {
          saveUser("0");
        } else {
          saveUser(resp.data);
        }
      }
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    user,
    saveUser,
    removeUser,
    fetchUser,
  };
};
