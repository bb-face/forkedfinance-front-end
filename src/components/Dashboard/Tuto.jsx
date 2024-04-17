import React, { useState } from "react";

import Button from "../../atoms/Button";

function Tuto({
  ffBalance,
  ffStakedAmounts,
  ffClaimableRewards,
  ffTotalStakedAmounts,
  ffSupply,
}) {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const stakeFF = async () => {
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
        const ffContract = new ethers.Contract(ff, ffABI, signer);
        const allowance = await ffContract.allowance(currentAddress, stakedFF);

        if (amount > allowance) {
          const approveAmount =
            "115792089237316195423570985008687907853269984665640564039457584007913129639935";
          await ffContract
            .approve(stakedFF, approveAmount)
            .then((tx) => {})
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
  const unstakeFF = async () => {
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

        const parsedUnit = ethers.utils.parseUnits(amount, 18);

        await contractRewardRouter
          .unstakeFF(parsedUnit)
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
        <h1 className="text-lg font-semibold">TUTO</h1>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Price</div>
        <div> Soon!</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Wallet</div>
        <div>{ffBalance}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Staked</div>
        <div>{ffStakedAmounts}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Points</div>
        <div>{ffClaimableRewards}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Total Staked</div>
        <div>{ffTotalStakedAmounts}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Total Supply</div>
        <div>{ffSupply}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form onClick={stakeFF}>
          <input
            type="number"
            placeholder="0.0"
            value={stakeAmount}
            onChange={(event) => setStakeAmount(event.target.value)}
          />
          <Button type="submit">stake</Button>
        </form>
        <form onClick={unstakeFF}>
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

export default Tuto;
