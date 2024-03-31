import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const AppContext = React.createContext();

function AppProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	const saveUser = (user) => {
		setUser(user);
	};

	const removeUser = () => {
		setUser(null);
	};

	const fetchUser = async () => {
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
					url: `${process.env.REACT_APP_SERVER_URL}/balances/${currentAddress}`,
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

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<AppContext.Provider
			value={{
				isLoading,
				saveUser,
				user,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider };
