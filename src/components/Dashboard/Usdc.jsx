import React, { useState } from "react";
import { ethers } from "ethers";
import { useRecoilValue } from "recoil";

import Button from "../../atoms/Button";

// import  permitSigned  from "../../utils/permit";

import {
  chainId,
  maxUint,
  feeUsdcAddr,
} from "../../costant/prod-costant";

import { getUsdcContract } from "../../utils/getUsdcContract";
import { getRRContract } from "../../utils/getRRContract";
import { getFeeUsdcContract } from "../../utils/getFeeUsdcContract";
import { format } from "../../utils/formats";
import NumberInput from "../../atoms/NumberInput";
import { walletAddressAtom } from "../../state/wallet";

function Usdc({
  usdcAccountBalance,
  stableCoinStakedAmount,
  points,
  totalStableCoinStakedAmount,
}) {
  const [amount, setAmount] = useState(0);
  const currentAddress = useRecoilValue(walletAddressAtom);


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
        maxUint,
        nonce,
        deadline,
      },
    ];
  
    return typedData;
  }

  const depositUSDC = async () => {
    if (window.ethereum?.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
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
        <div>Points</div>
        <div>{points}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div>Total Deposits</div>
        <div>{totalStableCoinStakedAmount}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <form>
          <NumberInput
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </form>
          <Button type="button" onClick={depositUSDC}>Deposit</Button>
          <Button type="button" onClick={withdrawUSDC}>Withhdraw</Button>
      </div>
    </>
  );
}

export default Usdc;
