import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ethers } from "ethers";

// import { Input } from "antd"; // TODO: remove library

import DepositUSDC from "../components/Dashboard/DepositUSDC";
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

import { feeUsdcAddr, usdcAddr } from "../costant/prod-costant";
import { userBalanceAtom } from "../state/userBalance";

function Dashboard() {
  // TODO: where is this needed?
  // const balance = useRecoilValue(transformedUserBalance);

  const chainId = useRecoilValue(chainIdAtom);
  const setError = useSetRecoilState(errorAtom);
  const { connectWallet } = useConnectWallet();

  const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);

  const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
  const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
    useState(null);

  const [balance, setBalance] = useState(null);
  const [APR, setAPR] = useState(null);
  const [feeTutoAPR, setfeeTutoAPR] = useState(null);

  const [ffClaimableRewards, setFFClaimableRewards] = useState(null);
  const [usdcClaimableRewards, setUsdcClaimableRewards] = useState(null);
  const [totalFeeClaimableRewards, setTotalFeeClaimableRewards] =
    useState(null);

  const [ffSupply, setFFSupply] = useState(null);

  const [ffBalance, setFFBalance] = useState(null);
  const [ffStakedAmounts, setFFStakedAmounts] = useState(null);

  const [ffTotalStakedAmounts, setFFTotalStakedAmounts] = useState(null);

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
    const feeFFTrackerContract = getFeeTutoContract(signer);

    const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
    const parsedUsdcBalance = ethers.utils.formatUnits(
      JSON.parse(currentUsdcBalance, null, 2),
      6
    );

    setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

    const currentUsdcStaked = await usdcFeeTrackerContract.stakedAmounts(
      currentAddress
    );
    const claimableUsdcFeeReward = await usdcFeeTrackerContract.claimable(
      currentAddress
    );
    const claimableFFFeeReward = await feeFFTrackerContract.claimable(
      currentAddress
    );

    setUsdcClaimableRewards(formatUsdc(claimableUsdcFeeReward));
    setStableCoinStakedAmount(formatUsdc(currentUsdcStaked));
    setFFClaimableRewards(formatUsdc(claimableFFFeeReward));

    const tutoContract = getTutocContract(signer);
    const ffAccountBalance = await tutoContract.balanceOf(currentAddress);

    if (!ffAccountBalance) {
      setFFBalance("0");
    } else {
      setFFBalance(formatErc(ffAccountBalance));
    }

    setTotalFeeClaimableRewards(
      Math.round(
        (formatUsdc(claimableUsdcFeeReward) +
          formatUsdc(claimableFFFeeReward)) *
          10
      ) / 10
    );
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

    const feeFFTotalSupply = await feeFFTracker.totalSupply();
    const ffFeeTokensPerInterval = await feeFFTracker.tokensPerInterval();
    // const ffFeeAPR =
    //   Math.round(
    //     (formatUsdc(ffFeeTokensPerInterval * secondsPerYear) /
    //       formatErc(feeFFTotalSupply)) *
    //       1000
    //   ) / 10;

    // setFeeFFAPR(ffFeeAPR);

    const tutoContract = getTutocContract(signer);

    const ffTotalSupply = await tutoContract.totalSupply();

    setFFSupply(Math.round(ethers.utils.formatEther(ffTotalSupply)));
  };

  useEffect(() => {
    if (!chainId || !currentAddress) {
      connectWallet();

      return;
    }

    updateBalance();
    getAccountContractsData();
    getContractsData();
  }, [chainId]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <div className=" p-6 shadow-2xl bg-primary">
            <AvailableBalance
              balance={balance}
              totalFeeClaimableRewards={totalFeeClaimableRewards}
            />
          </div>
        </div>
        <div className="w-1/2 px-2">
          <div className="p-6 shadow-2xl bg-primary">
            <DepositUSDC
              usdcAccountBalance={usdcAccountBalance}
              stableCoinStakedAmount={stableCoinStakedAmount}
              APR={APR}
              usdcClaimableRewards={usdcClaimableRewards}
              totalStableCoinStakedAmount={totalStableCoinStakedAmount}
            />
          </div>
          <div className="p-6 mt-6 shadow-2xl bg-primary">
            <Tuto
              ffBalance={ffBalance}
              ffStakedAmounts={ffStakedAmounts}
              ffClaimableRewards={ffClaimableRewards}
              ffTotalStakedAmounts={ffTotalStakedAmounts}
              ffSupply={ffSupply}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
