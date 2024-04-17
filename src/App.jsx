import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ethers } from "ethers";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // useEffect(() => {
  //   if (window.ethereum) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     provider.on("accountsChanged", (accounts) => {
  //       console.log("-- account changed");
  //       console.log(accounts[0] || "");
  //     });

  //     provider.on("network", (newNetwork, oldNetwork) => {
  //       console.log(oldNetwork);
  //       console.log(newNetwork);
  //       if (oldNetwork) {
  //         console.log(newNetwork);
  //       }
  //     });
  //   }

  //   // window.ethereum.on('chainChanged', () => {
  //   // 	window.location.reload();
  //   // })
  //   // window.ethereum.on('accountsChanged', () => {
  //   // 	window.location.reload();
  //   // })
  // }, []);

  // useEffect(() => {
  //   console.log("-- something changed, reloading!");

  //   window.ethereum.on("chainChanged", window.location.reload());
  //   window.ethereum.on("accountChanged", window.location.reload());
  // }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[header-height] pb-[footer-height] flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
function NetworkDetector() {
  const [networkName, setNetworkName] = useState("");

  useEffect(() => {
    const updateNetwork = async () => {
      try {
        if (window.ethereum) {
          // Create a new provider to ensure you're getting the most up-to-date network info
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const network = await provider.getNetwork();
          setNetworkName(network.name);
        }
      } catch (error) {
        console.error("Error getting network:", error);
      }
    };

    updateNetwork();

    const handleNetworkChange = (chainId) => {
      // ethers uses BigNumber for the chainId, so let's convert it
      const networkChangedTo = ethers.BigNumber.from(chainId).toString();
      console.log(`Network changed to: ${networkChangedTo}`);
      updateNetwork();
    };

    window.ethereum.on("chainChanged", handleNetworkChange);

    // Clean up the effect by removing the event listener
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("chainChanged", handleNetworkChange);
      }
    };
  }, []);

  return (
    <div>
      <p>Current Network: {networkName || "Not connected"}</p>
    </div>
  );
}
