import React, { useState } from "react";

import Button from "../../atoms/Button";

function DepositUSDC({
  usdcAccountBalance,
  stableCoinStakedAmount,
  APR,
  usdcClaimableRewards,
  totalStableCoinStakedAmount,
}) {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const depositUSDC = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const signer = provider.getSigner();

      if (network.chainId === 5) {
        const contractRewardRouter = new ethers.Contract(
          rewardRouter,
          rewardRouterABI,
          signer
        );

        const usdcContract = new ethers.Contract(USDCAddress, usdcABI, signer);
        const allowance = await usdcContract.allowance(currentAddress, feeUsdc);
        const parsedAllowance = JSON.parse(allowance);
        if (amount > parsedAllowance) {
          const approveAmount =
            "115792089237316195423570985008687907853269984665640564039457584007913129639935";
          await usdcContract
            .approve(feeUsdc, approveAmount)
            .then((tx) => {})
            .catch((e) => {
              if (e.code === 4001) {
                console.log("Rejected");
              }
            });
        } else {
          if (!amount) {
            return;
          }

          const parsedAmount = ethers.utils.parseUnits(amount, 6);

          await contractRewardRouter
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
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const signer = provider.getSigner();

      if (network.chainId === 5) {
        const contractRewardRouter = new ethers.Contract(
          rewardRouter,
          rewardRouterABI,
          signer
        );
        const parsedAmount = ethers.utils.parseUnits(amount, 6);

        await contractRewardRouter
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
        <div>${usdcAccountBalance}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Staked</div>
        <div>${stableCoinStakedAmount} </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>APR</div>
        <div>{APR}%</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Points</div>
        <div>${usdcClaimableRewards}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div>Total Staked</div>
        <div>${totalStableCoinStakedAmount}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <form onClick={depositUSDC}>
          <input
            type="number"
            placeholder="0.0"
            value={stakeAmount}
            onChange={(event) => setStakeAmount(event.target.value)}
          />
          <Button type="submit">Stake</Button>
        </form>
        <form onClick={withdrawUSDC}>
          <input
            type="number"
            placeholder="0.0"
            value={unstakeAmount}
            onChange={(event) => setUnstakeAmount(event.target.value)}
          />
          <Button type="submit">Unstake</Button>
        </form>
      </div>
    </>
  );
}

export default DepositUSDC;
