import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { ethers } from "ethers";

import { Input } from "antd"; // TODO: remove library
import { permitSigned } from "../utils/Permit";
import { contract } from "../utils/ContractInstance";
import { parse, format } from "../utils/formats";

import stableCoinTrackerABI from "../assets/StableCoinContractABI.json";

import rewardTrackerABI from "../assets/RewardTrackerABI.json";
import TutoABI from "../assets/TutoABI.json";

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

const ff = "0x00295670C7f8C501f58FA66f1a161a66A05ddC78";

const USDCAddress = "0x8c7A265C1C40F65A6F924207fa859da29b581c2B";
const rewardRouterAddr = "0x4DdEc5379d5050bE1B23F759202b868617d13D18";

const feeUsdcAddr = "0x7885c88160C2cfcCF02445cc26709319b5C76337";
const feeTutoAddr = "0xB5000c1722E0AdbDe6cF4f0467C37e47b589818e";

const usdcModalLabel = "USDC";
const FFModalLabel = "FF";

const chainId = 11155111;

const unstakeModalButton = "Stop Earning";
const depositModalButton = "Deposit";
const withdrawModalButton = "Withdraw";
const depositStablecoinModalHeading = "Deposit Stablecoin - 0.5% Fee";
const withdrawStablecoinModalHeading = "Withdraw Stablecoin - 0.5% Fee";
const stakeFFModalHeading = "Stake FF";
const unstakeFFModalHeading = "Unstake FF";

const usdcDecimals = 10 ** 6;
const decimals = 10 ** 18;
const secondsPerYear = 31536000;

function Dashboard() {
  const { user } = useUserManagement();
  const chainId = useRecoilValue(chainIdAtom);
  const setError = useSetRecoilState(errorAtom);
  const { connectWallet } = useConnectWallet();

  const [usdcAccountBalance, setUsdcAccountBalance] = useState(null);

  const [stableCoinStakedAmount, setStableCoinStakedAmount] = useState(null);
  const [totalStableCoinStakedAmount, setTotalStableCoinStakedAmount] =
    useState(null);

  const [signedData, setSignedData] = useState(null);
  const [deadline, setDeadline] = useState(null);

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

  function changeAmount(e) {
    setAmount(e.target.value);
  }

  const signPermit = async (contractAddr, ABI) => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const block = await provider.getBlock("latest");
      const contract = contract(contractAddr, ABI, signer);
      const data = await permitSigned(
        signer,
        contract,
        feeUsdcAddr,
        block.timestamp
      );
      const signature = await signer._signTypedData(data[0], data[1], data[2]);
      const VRS = ethers.utils.splitSignature(signature);
      setSignedData(VRS);
      setDeadline(data[2].deadline.toString());
    }
  };

  const stakeTuto = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = signer.getAddress();
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const contractRewardRouter = contract(
          rewardRouterAddr,
          rewardRouterABI.abi,
          signer
        );
        const tuto = contract(tutoAdr, TutoABI.abi, signer);
        const allowance = await tuto.allowance(currentAddress, feeTutoAddr);
        const parsedAllowance = JSON.parse(allowance);

        if (amount > parsedAllowance) {
          signPermit(tutoAdr, TutoABI.abi);

          const maxUint =
            "115792089237316195423570985008687907853269984665640564039457584007913129639935";
          await tuto
            .stakeWithPermit(
              amount,
              maxUint,
              deadline,
              signedData.v,
              signedData.r,
              signedData.s
            )
            .then((tx) => {
              console.log(tx.hash);
            })
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        } else {
          const parsedUnit = ethers.utils.parseUnits(amount, 18);

          await contractRewardRouter
            .stakeFF(parsedUnit)
            .then((tx) => {
              console.log(tx);
              //do whatever you want with tx
            })
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        }
      }
    }
  };

  const updateBalance = async () => {
    try {
      setBalance(Math.round((user / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  const chainChanged = () => {
    window.location.reload();
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", chainChanged);
    window.ethereum.on("accountChanged", getAccountContractsData);

    if (!chainId || !currentAddress) {
      connectWallet();
      return;
    }

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
