import React, { useState } from "react";
import { ethers } from "ethers";

import Button from "../../atoms/Button";

import { permitSigned } from "../../utils/Permit";

import usdcAbi from "../../assets/USDCABI.json";
import TutoABI from "../../assets/TutoABI.json";

const feeUsdcAddr = "0x7885c88160C2cfcCF02445cc26709319b5C76337";

function Tuto({
  ffBalance,
  ffStakedAmounts,
  ffClaimableRewards,
  ffTotalStakedAmounts,
  ffSupply,
}) {
  const [signedData, setSignedData] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const USDCAddress = "0x8c7A265C1C40F65A6F924207fa859da29b581c2B";

  // const signPermit = async (contractAddr = USDCAddress, ABI = usdcAbi) => {
  const signPermit = async () => {
    if (window.ethereum?.isMetaMask) {
      const contractAddr = USDCAddress;
      const ABI = usdcAbi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const block = await provider.getBlock("latest");
      const contract = new ethers.Contract(contractAddr, ABI, signer);
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
          await signPermit(tutoAdr, TutoABI.abi);

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

  const unstakeFF = async () => {}; // TODO: transform in unstakeTuto not available yet

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
        <form onClick={stakeTuto}>
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
      <h3>Signed data</h3>
      {signedData}
      <h3>Deadline</h3>
      {deadline}
      <button type="button" onClick={signPermit}>
        sign permi
      </button>
    </>
  );
}

export default Tuto;
