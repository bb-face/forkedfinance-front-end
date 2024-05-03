import React, { useState } from "react";
import { ethers } from "ethers";

import Button from "../../atoms/Button";

import { permitSigned } from "../../utils/permit";
import { getCurrentAddress } from "../../utils/getAddress";
import { format } from "../../utils/formats";


import { getFeeTutoContract } from "../../utils/getFeeTutoContract";
import { getTutocContract } from "../../utils/getTutoContract";
import { getRRContract } from "../../utils/getRRContract";

import { feeTutoAddr, maxUint, tutoAddr, chainId } from "../../costant/prod-costant";


function Tuto({
  ffBalance,
  ffStakedAmounts,
  ffClaimableRewards,
  ffTotalStakedAmounts,
  ffSupply,
}) {

  const [amount, setAmount] = useState(0);
  

  const stakeTuto = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = getCurrentAddress(provider);
      const signer = provider.getSigner();

      if(!amount) {return};

      if (network.chainId === chainId) {
        const tutoContract = getTutocContract(signer);
        const allowance = await tutoContract.allowance(currentAddress, feeTutoAddr);
        const parsedAllowance = format(allowance, 6)
        console.log(parsedAllowance)

        if (amount > parsedAllowance) {

          const feeTutoContract = getFeeTutoContract(signer);

          const block = await provider.getBlock('latest');
          const permit = await permitSigned(signer, tutoContract, feeTutoAddr, block.timestamp);
          const signature = await signer._signTypedData(permit[0], permit[1], permit[2]);
          const signed = ethers.utils.splitSignature(signature);
         
          await feeTutoContract
          
            .stakeWithPermit(
              tutoAddr,
              amount,
              maxUint,
              (permit[2].deadline).toString(),
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

          const parsedUnit = ethers.utils.parseUnits(amount, 18);
          
          await rrContract
            .stakeTuto(parsedUnit)
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

  const unstakeTuto = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const currentAddress = getCurrentAddress(provider);
      const signer = provider.getSigner();

      if(!amount) {return};

      if (network.chainId === chainId) {
        const tutoContract = getTutocContract(signer);
        const allowance = await tutoContract.allowance(currentAddress, feeTutoAddr);
        const parsedAllowance = format(allowance, 6)
        console.log(parsedAllowance)

         
        const rrContract = getRRContract(signer);                  

        const parsedUnit = ethers.utils.parseUnits(amount, 18);
          
        await rrContract
            .unstakeTuto(parsedUnit)
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
  }; // TODO: transform in unstakeTuto not available yet

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
        <form >
          <input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
         
        </form>
        <form onClick={stakeTuto}>
          
          <Button type="submit">Stake</Button>
          
        </form>
        <form onClick={unstakeTuto}>
          {/* <input
            // type="number"
            // placeholder="0.0"
            // value={amount}
            // onChange={(event) => setUnstakeAmount(event.target.value)}
          /> */}
          <Button type="submit">Unstake</Button>
        </form>
      </div>
      
    </>
  );
}

export default Tuto;
