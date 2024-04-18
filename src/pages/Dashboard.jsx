import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ethers } from "ethers";

import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import ffABI from "../assets/FfABI.json";

import DepositUSDC from "../components/Dashboard/DepositUSDC";
import Tuto from "../components/Dashboard/Tuto";
import AvailableBalance from "../components/Dashboard/AvailableBalance";
import { useUserManagement } from "../customHooks/useUser";
import { walletAddressAtom } from "../state/wallet";
import { formatUsdc, formatErc } from "../utils/formatBalance";
import { getProviderSigner } from "../utils/getProviderSignerNetwork";

import { secondsPerYear, feeFF, feeUsdc } from "../costant/prod-costant";
import { chainIdAtom } from "../state/network";
import { errorAtom } from "../state/error";
import { getUsdcContract } from "../utils/getUsdcContract";
import { getUsdcFeeContract } from "../utils/getUsdcFeeContract";
import { getFeeFFTrackerContract } from "../utils/getFeeFFTrackerContract";
import useConnectWallet from "../customHooks/useWallet";

async function providerContract(address, ABI) {
  return new ethers.Contract(address, ABI, provider);
}

function Dashboard() {
  const { user } = useUserManagement();
  const chainId = useRecoilValue(chainIdAtom);
  const setError = useSetRecoilState(errorAtom);
  const { connectWallet } = useConnectWallet();

  const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);

  const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
  const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
    useState(null);

  const [balance, setBalance] = useState(null);
  const [APR, setAPR] = useState(null);
  const [feeFFAPR, setFeeFFAPR] = useState(null);

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
    const { signer } = await getProviderSigner(
      currentAddress,
      setWalletAddress
    );

    if (chainId !== 11155111) {
      setError("Wrong network");
      return;
    }

    console.log("-- selected correct network");

    const usdcContract = getUsdcContract(signer);
    const usdcFeeTrackerContract = getUsdcFeeContract(signer);
    const feeFFTrackerContract = getFeeFFTrackerContract(signer);

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

    const ffContract = new ethers.Contract(ff, ffABI, signer);
    const ffAccountBalance = await ffContract.balanceOf(currentAddress);

    console.log("-- here");
    console.log(ffAccountBalance);

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
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`
    );

    if (chainId !== 5) {
      setError("Wrong network");
      return;
    }

    const stableCoinTrackerContract = await providerContract(
      feeUsdc,
      stableCoinTrackerABI
    );
    const feeFFTracker = await providerContract(feeFF, stableCoinTrackerABI);

    const totalStableCoinStaked =
      await stableCoinTrackerContract.totalDepositSupply(USDCAddress);
    const feeTokensPerInterval =
      await stableCoinTrackerContract.tokensPerInterval();
    const tokensPerYear = feeTokensPerInterval * secondsPerYear;

    setTotalStableCoinStakedAmount(formatUsdc(totalStableCoinStaked));
    setAPR(
      Math.round(
        (formatUsdc(tokensPerYear) / formatUsdc(totalStableCoinStaked)) * 1000
      ) / 10
    );

    const feeFFTotalSupply = await feeFFTracker.totalSupply();
    const ffFeeTokensPerInterval = await feeFFTracker.tokensPerInterval();
    const ffFeeAPR =
      Math.round(
        (formatUsdc(ffFeeTokensPerInterval * secondsPerYear) /
          formatErc(feeFFTotalSupply)) *
          1000
      ) / 10;

    setFeeFFAPR(ffFeeAPR);

    const ffContract = new ethers.Contract(ff, ffABI, provider);
    const ffTotalSupply = await ffContract.totalSupply();

    setFFSupply(Math.round(ethers.utils.formatEther(ffTotalSupply)));
  };

  const updateBalance = async () => {
    try {
      setBalance(Math.round((user / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("-- chainId has changed");
    console.log(chainId);
    // updateBalance();
    getAccountContractsData();
    // getContractsData();
  }, [updateBalance, getAccountContractsData, getContractsData, chainId]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <div className=" p-6 shadow-xl">
            <AvailableBalance
              balance={balance}
              totalFeeClaimableRewards={totalFeeClaimableRewards}
            />
          </div>
        </div>
        <div className="w-1/2 px-2">
          <div className="p-6 shadow-xl">
            <DepositUSDC
              usdcAccountBalance={usdcAccountBalance}
              stableCoinStakedAmount={stableCoinStakedAmount}
              APR={APR}
              usdcClaimableRewards={usdcClaimableRewards}
              totalStableCoinStakedAmount={totalStableCoinStakedAmount}
            />
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
