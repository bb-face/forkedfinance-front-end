import React, { useState } from "react";
import { ethers } from "ethers";

import Button from "../../atoms/Button";

import { permitSigned } from "../../utils/permit";
import {
  usdcAddr,
  chainId,
  maxUint,
  rewardRouterAddr,
  feeUsdcAddr,
} from "../../costant/prod-costant";
import rewardRouterABI from "../../assets/RewardTrackerABI.json";

import { getCurrentAddress } from "../../utils/getAddress";
import { getUsdcContract } from "../../utils/getUsdcContract";
import { getRRContract } from "../../utils/getRRContract";
import { getFeeUsdcContract } from "../../utils/getFeeUsdcContract";
import { format } from "../../utils/formats";

function DepositUSDC({
  usdcAccountBalance,
  stableCoinStakedAmount,
  APR,
  usdcClaimableRewards,
  totalStableCoinStakedAmount,
}) {
  const [amount, setAmount] = useState(0);

  const depositUSDC = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = getCurrentAddress(provider);
      const signer = provider.getSigner();

      if (!amount) {
        return;
      }

      if (network.chainId === chainId) {
        const usdcContract = getUsdcContract(signer);
        const allowance = await usdcContract.allowance(
          currentAddress,
          feeUsdcAddr
        );
        const parsedAllowance = format(allowance, 6);

        if (amount > parsedAllowance) {
          const feeUsdcContract = getFeeUsdcContract(signer);
          const usdcContract = getUsdcContract(signer);

          const block = await provider.getBlock("latest");
          const permit = await permitSigned(
            signer,
            usdcContract,
            feeUsdcAddr,
            block.timestamp
          );
          const signature = await signer._signTypedData(
            permit[0],
            permit[1],
            permit[2]
          );
          const signed = ethers.utils.splitSignature(signature);

          const parsedAmount = ethers.utils.parseUnits(amount, 6);

          await feeUsdcContract
            .stakeWithPermit(
              parsedAmount,
              maxUint,
              permit[2].deadline.toString(),
              signed.v,
              signed.r,
              signed.s
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
          const rrContract = getRRContract(signer);
          const parsedAmount = ethers.utils.parseUnits(amount, 6);

          await rrContract
            .depositUsdc(parsedAmount)
            .then((tx) => {
              console.log(tx.hash);
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

  const withdrawUSDC = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();

      if (network.chainId === chainId) {
        const rrContract = getRRContract(signer);
        const parsedAmount = ethers.utils.parseUnits(amount, 6);
        console.log(amount);
        await rrContract
          .withdrawUsdc(parsedAmount)
          .then((tx) => {
            //do whatever you want with tx
          })
          .catch((e) => {
            if (e.code === 4001) {
              console.log("Rejected");
            }
          });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">USDC</h1>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Wallet</div>
        <div>{usdcAccountBalance}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Deposited</div>
        <div>{stableCoinStakedAmount} </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Points Multiplier</div>
        <div>{APR}x</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Points</div>
        <div>{usdcClaimableRewards}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div>Total Deposits</div>
        <div>${totalStableCoinStakedAmount}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <form>
          <input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </form>

        <form onClick={depositUSDC}>
          <Button type="submit">Deposit</Button>
        </form>
        <form onClick={withdrawUSDC}>
          {/* <input
            type="number"
            placeholder="0.0"
            // value={unstakeAmount}
            // onChange={(event) => setUnstakeAmount(event.target.value)}
          /> */}
          <Button type="submit">Withhdraw</Button>
        </form>
      </div>
    </>
  );
}

export default DepositUSDC;
