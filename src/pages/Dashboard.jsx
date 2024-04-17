import { useEffect, useState } from "react";

import { ethers } from "ethers";

import usdcABI from "../assets/USDCABI.json";

import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";
import rewardTrackerABI from "../assets/RewardTrackerABI.json";
import ffABI from "../assets/FfABI.json";

import DepositUSDC from "../components/Dashboard/DepositUSDC";
import Tuto from "../components/Dashboard/Tuto";
import AvailableBalance from "../components/Dashboard/AvailableBalance";
import { useUserManagement } from "../customHooks/useUser";

const url = "https://server.forkedfinance.xyz";

const ff = "0x00295670C7f8C501f58FA66f1a161a66A05ddC78";

const USDCAddress = "0x55d030B2A681605b7a1E32d8D924EE124e9D01b7";

const feeUsdc = "0xD04f6170Db4B957502FC574049624f72DB64C4Ba";
const feeFF = "0x81706c695834a6a087D2100B2e52eEeFB158bA7f";

const usdcDecimals = 10 ** 6;
const decimals = 10 ** 18;
const secondsPerYear = 31536000;

function Dashboard() {
  const { user } = useUserManagement();

  const [currentAccount, setCurrentAccount] = useState(null);
  const [shortCurrentAccount, setShortCurrentAccount] = useState(null);

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

  const getAccountContractsData = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      await provider.send("eth_requestAccounts");
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });

      setCurrentAccount(currentAddress);
      setShortCurrentAccount(
        `${currentAddress.slice(0, 7)}...${currentAddress.slice(36)}`
      );
      const signer = provider.getSigner();

      async function signerContract(address, ABI) {
        return new ethers.Contract(address, ABI, signer);
      }

      function formatUsdc(chainOutput) {
        return (
          Math.round(
            parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10
          ) / 10
        );
      }
      function formatErc(chainOutput) {
        return (
          Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) /
          10
        );
      }

      if (network.chainId === 5) {
        // Trackers

        const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);

        const usdcFeeTrackerContract = new ethers.Contract(
          feeUsdc,
          stableCoinTrackerABI,
          signer
        );

        const feeFFTrackerContract = new ethers.Contract(
          feeFF,
          rewardTrackerABI,
          signer
        );

        const currentUsdcBalance = await usdcContract.balanceOf(currentAddress);
        const parsedUsdcBalance = ethers.utils.formatUnits(
          JSON.parse(currentUsdcBalance, null, 2),
          6
        );
        setUsdcAccountBalance(Math.round(parsedUsdcBalance * 10) / 10);

        const currentUsdcStaked = await usdcFeeTrackerContract.stakedAmounts(
          currentAddress
        );

        //.................................................................

        const claimableUsdcFeeReward = await usdcFeeTrackerContract.claimable(
          currentAddress
        );

        setUsdcClaimableRewards(formatUsdc(claimableUsdcFeeReward));
        setStableCoinStakedAmount(formatUsdc(currentUsdcStaked));

        const claimableFFFeeReward = await feeFFTrackerContract.claimable(
          currentAddress
        );
        setFFClaimableRewards(formatUsdc(claimableFFFeeReward));

        // Tokens

        const ffContract = new ethers.Contract(ff, ffABI, signer);
        const ffAccountBalance = await ffContract.balanceOf(currentAddress);
        if (!ffAccountBalance) {
          setFFBalance("0");
        } else {
          setFFBalance(
            Math.round(ethers.utils.formatEther(ffAccountBalance) * 10) / 10
          );
        }

        setTotalFeeClaimableRewards(
          Math.round(
            (formatUsdc(claimableUsdcFeeReward) +
              formatUsdc(claimableFFFeeReward)) *
              10
          ) / 10
        );
      }
    }
  };

  const getContractsData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`
    );
    const network = await provider.getNetwork();

    async function providerContract(address, ABI) {
      return new ethers.Contract(address, ABI, provider);
    }

    function formatUsdc(chainOutput) {
      return (
        Math.round(parseFloat(ethers.utils.formatUnits(chainOutput, 6)) * 10) /
        10
      );
    }
    function formatErc(chainOutput) {
      return (
        Math.round(parseFloat(ethers.utils.formatEther(chainOutput)) * 10) / 10
      );
    }
    if (network.chainId === 5) {
      const stableCoinTrackerContract = await providerContract(
        feeUsdc,
        stableCoinTrackerABI
      );

      const feeFFTracker = await providerContract(feeFF, stableCoinTrackerABI);

      const totalStableCoinStaked =
        await stableCoinTrackerContract.totalDepositSupply(USDCAddress);

      setTotalStableCoinStakedAmount(formatUsdc(totalStableCoinStaked));

      const feeTokensPerInterval =
        await stableCoinTrackerContract.tokensPerInterval();
      const tokensPerYear = feeTokensPerInterval * secondsPerYear;

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
    }
  };

  const updateBalance = async () => {
    try {
      setBalance(Math.round((user / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateBalance();
    getAccountContractsData();
    getContractsData();
  }, [updateBalance, getAccountContractsData, getContractsData]);

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
