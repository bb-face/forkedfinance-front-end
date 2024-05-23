import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ethers } from "ethers";

// import { Input } from "antd"; // TODO: remove library

import Usdc from "../components/Dashboard/Usdc";
import Tuto from "../components/Dashboard/Tuto";
import AvailableBalance from "../components/Dashboard/AvailableBalance";

import { walletAddressAtom } from "../state/wallet";
import { formatUsdc, formatErc } from "../utils/formatBalance";
import { getProviderSigner } from "../utils/getProviderSignerNetwork";

import { chainIdAtom } from "../state/network";
import { errorAtom } from "../state/error";
import { getUsdcContract } from "../utils/getUsdcContract";
import { getFeeUsdcContract } from "../utils/getFeeUsdcContract";
import { getFeeTutoContract } from "../utils/getFeeTutoContract";
import { getTutocContract } from "../utils/getTutoContract";

import useConnectWallet from "../customHooks/useWallet";

import { feeUsdcAddr, usdcAddr, tutoAddr } from "../costant/prod-costant";
import { userBalanceAtom } from "../state/userBalance";

function Dashboard() {
  // TODO: where is this needed?
  // const balance = useRecoilValue(transformedUserBalance);

  const chainId = useRecoilValue(chainIdAtom);
  const setError = useSetRecoilState(errorAtom);
  const { connectWallet } = useConnectWallet();

  const [usdcAccountBalance, setUsdcAccountBalance] = useState(0);

  const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(0);
  const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
  useState(0);

  const [balance, setBalance] = useState(null);
  const [pointsMultiplier, setpointsMultiplier] = useState(1);
  const [points, setPoints] = useState(0);

  const [tutoBalance, setTutoBalance] = useState(0);
  const [tutoStakedAmounts, setTutoStakedAmounts] = useState(0);
  const [tutoTotalStakedAmounts, setTutoTotalStakedAmounts] = useState(0);

  const currentAddress = useRecoilValue(walletAddressAtom);
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  const getAccountContractsData = async () => {
    if (!chainId) return;

    if (chainId !== 11155111) {
      setError("Wrong network");
      return;
    }
    const { signer } = await getProviderSigner(
      currentAddress,
      setWalletAddress
    );

    const usdcContract = getUsdcContract(signer);
    const usdcFeeTrackerContract = getFeeUsdcContract(signer);
    const tutoFeeTrackerContract = getFeeTutoContract(signer);

    const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
    const parsedUsdcBalance = ethers.utils.formatUnits(
      JSON.parse(currentUsdcBalance, null, 2),
      6
    );

    setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

    const currentUsdcStaked = await usdcFeeTrackerContract.stakedAmounts(
      currentAddress
    );
    const currentTutoStaked = await tutoFeeTrackerContract.stakedAmounts(
      currentAddress
    );
    const totalTutoStaked = await tutoFeeTrackerContract.totalDepositSupply(
      tutoAddr 
    );

    setStableCoinStakedAmount(formatUsdc(currentUsdcStaked));
    setTutoStakedAmounts(formatErc(currentTutoStaked));
    setTutoTotalStakedAmounts(formatErc(totalTutoStaked));

    const tutoContract = getTutocContract(signer);
    const tutoAccountBalance = await tutoContract.balanceOf(currentAddress);

    if (!tutoAccountBalance) {
      setTutoBalance("0");
    } else {
      setTutoBalance(formatErc(tutoAccountBalance));
    }

    
  };

  const getContractsData = async () => {
    if (!chainId) return;

    if (chainId !== 11155111) {
      setError("Wrong network");
      return;
    }
    const { signer } = await getProviderSigner(
      currentAddress,
      setWalletAddress
    );

    const stableCoinTrackerContract = getFeeUsdcContract(signer);
    const feeFFTracker = getFeeTutoContract(signer);
    
    const totalStableCoinStaked =
    await stableCoinTrackerContract.totalDepositSupply(usdcAddr);
    // const feeTokensPerInterval =
    //   await stableCoinTrackerContract.tokensPerInterval();
    // const tokensPerYear = feeTokensPerInterval * secondsPerYear;
    
    setTotalStableCoinStakedAmount(formatUsdc(totalStableCoinStaked));
    // setAPR(
      //   Math.round(
        //     (formatUsdc(tokensPerYear) / formatUsdc(totalStableCoinStaked)) * 1000
        //   ) / 10
        // );
        
   



  };

  useEffect(() => {
    if (!chainId || !currentAddress) {
      connectWallet();

      return;
    }

    // updateBalance();
    getAccountContractsData();
    getContractsData();
  }, [chainId]);

  useEffect(() => { //fetch pointsMultiplier from backend
    if (!currentAddress) {
      connectWallet();

      return;
    }

    // fetch function points, balance, pointsMultiplier
    
  }, [currentAddress]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <div className=" p-6 shadow-2xl bg-primary">
            <AvailableBalance balance={balance} points={points} />
          </div>
        </div>
        <div className="w-1/2 px-2">
          <div className="p-6 shadow-2xl bg-primary">
            <Usdc
              usdcAccountBalance={usdcAccountBalance}
              stableCoinStakedAmount={stableCoinStakedAmount}
              points={points}
              totalStableCoinStakedAmount={totalStableCoinStakedAmount}
            />
          </div>
          <div className="p-6 mt-6 shadow-2xl bg-primary">
            <Tuto
              tutoBalance={tutoBalance}
              tutoStakedAmounts={tutoStakedAmounts}
              pointsMultiplier={pointsMultiplier}
              tutoTotalStakedAmounts={tutoTotalStakedAmounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
