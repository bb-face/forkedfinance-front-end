import React, { useState } from "react";
import { ethers } from "ethers";

import Button from "../../atoms/Button";

// import  permitSigned  from "../../utils/permit";
import { format } from "../../utils/formats";

import { getFeeTutoContract } from "../../utils/getFeeTutoContract";
import { getTutocContract } from "../../utils/getTutoContract";
import { getRRContract } from "../../utils/getRRContract";

import {
  feeTutoAddr,
  maxUint,
  tutoAddr,
  chainId,
} from "../../costant/prod-costant";
import NumberInput from "../../atoms/NumberInput";
import { useRecoilValue } from "recoil";
import { walletAddressAtom } from "../../state/wallet";

function Tuto({
  tutoBalance,
  tutoStakedAmounts,
  pointsMultiplier,
  tutoTotalStakedAmounts,
}) {
  const [amount, setAmount] = useState(0);
  const currentAddress = useRecoilValue(walletAddressAtom);

  const value = ethers.constants.MaxUint256;

  async function permitSigned(signer, token, spender, timestamp) {
    const deadline = timestamp + 86400;
    const [nonce, name, version, chainId, ownerAddress] = await Promise.all([
      token.nonces(signer.getAddress()),
      token.name(),
      "1",
      signer.getChainId(),
      signer.getAddress(),
    ]);
  
    const typedData = [
      {
        name,
        version,
        chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
          },
          {
            name: "deadline",
            type: "uint256",
          },
        ],
      },
      {
        owner: ownerAddress,
        spender,
        value,
        nonce,
        deadline,
      },
    ];
  
    return typedData;
  }

  const stakeTuto = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();

      if (!amount) {
        return;
      }

      if (network.chainId === chainId) {
        const tutoContract = getTutocContract(signer);
        const allowance = await tutoContract.allowance(
          currentAddress,
          feeTutoAddr
        );
        const parsedAllowance = format(allowance, 6);
        

        if (amount > parsedAllowance) {
          const feeTutoContract = getFeeTutoContract(signer);

          const block = await provider.getBlock("latest");
          const permit = await permitSigned(
            signer,
            tutoContract,
            feeTutoAddr,
            block.timestamp
          );
          
          const signature = await signer._signTypedData(
            permit[0],
            permit[1],
            permit[2]
          );
          const signed = ethers.utils.splitSignature(signature);
          const parsedAmount = ethers.utils.parseUnits(amount, 18);

          await feeTutoContract.stakeWithPermit(
              maxUint,
              parsedAmount,
              permit[2].deadline.toString(),
              signed.v,
              signed.r,
              signed.s
            )
            .then((tx) => {
              console.log(tx.hash);
            })
            .catch((e) => {
              console.log(e)
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
      const signer = provider.getSigner();

      if (!amount) {
        return;
      }

      if (network.chainId === chainId) {
      
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
        <div>{tutoBalance}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Staked</div>
        <div>{tutoStakedAmounts}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Points Multiplier</div>
        <div>{pointsMultiplier}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>Total Staked</div>
        <div>{tutoTotalStakedAmounts}</div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-2 press-start-2p-regular text-xs">
    
          <NumberInput
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
					<div className="flex mt-4">
						<Button type="button" onClick={stakeTuto} >Stake</Button>
						<Button type="button" onClick={unstakeTuto} className="ml-4">Unstake</Button>
					</div>
        
      </div>
    </>
  );
}

export default Tuto;
