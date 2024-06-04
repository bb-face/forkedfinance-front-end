import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

import { fetchUserBalance } from "../utils/fetchUserBalance";
import { walletAddressAtom } from "../state/wallet";
import { userBalanceAtom } from "../state/userBalance";
import useConnectWallet from "../customHooks/useWallet";
import { messageAtom } from "../state/message";
import { fetchString } from "../utils/fetchString";
import { requestTransfer } from "../utils/requestTransfer";
import { transformedUserBalance } from "../state/userBalance";

import Button from "../atoms/Button";
import NumberInput from "../atoms/NumberInput";
import TextInput from "../atoms/StringInput";

const Transfer = () => {
  // const balance = useRecoilValue(transformedUserBalance);
  const [balance, setBalance] = useRecoilState(transformedUserBalance);
  const setUserBalance = useSetRecoilState(userBalanceAtom);
  const setMessage = useSetRecoilState(messageAtom);
  const currentAddress = useRecoilValue(walletAddressAtom);

  const { connectWallet } = useConnectWallet();

  const [transferTo, settransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);

  useEffect(() => {
    const fetchInitialBalance = async () => {
      if (currentAddress) {
        const newUserBalance = await fetchUserBalance(currentAddress);
        setBalance(newUserBalance);
      }
    };

    fetchInitialBalance();
  }, [currentAddress, setBalance]);

  const transferBalance = async (e) => {
    e.preventDefault();

    if (!currentAddress) {
      connectWallet();

      return;
    }

    if (!transferAmount) {
      return;
    }
    if (!transferTo) {
      return;
    }

    try {
      const signedMessage = await signTransfer();

      const res = await requestTransfer(
        currentAddress,
        signedMessage,
        transferTo,
        transferAmount
      );

      // TODO: do something with res
      const newUserBalance = fetchUserBalance(currentAddress);
      setUserBalance(newUserBalance);
    } catch (error) {
      // TODO: do something with the error
    }
  };

  const signTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const payloadHash = await fetchString(currentAddress, "transfer");

    const signedMessage = await signer
      .signMessage(ethers.utils.arrayify(payloadHash))
      .catch((e) => {
        if (e.code === 4001) {
          console.log("Rejected");
        }
      });

    if (!signedMessage) {
      return;
    }

    return signedMessage;
  };

  const validateBalanceTo = async (e) => {
    e.preventDefault();

    if (!transferTo) {
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/balances/validateBalanceTo`,
        {
          walletTo: transferTo,
        }
      );

      setMessage("Address is valid!");
    } catch (error) {
      // TODO: do something with the error
      // print in the error component?
    }
  };

  function changeAmount(e) {
    setTransferAmount(e.target.value);
  }
  function changetransferTo(e) {
    settransferTo(String(e.target.value));
  }

  // TODO: create pop up for messages that are not errors/warnings and put [message] there;

  return (
    <div className="mx-auto p-4">
      <div className="min-w-96">
        <div className=" p-6 shadow-2xl bg-primary">
          <div className="flex items-baseline space-x-2">
            Balance: {balance}
          </div>
          <label htmlFor="amount" className="block text-gray-400 mb-2 mt-6">
            Amount
          </label>
          <NumberInput value={transferAmount} onChange={changeAmount} />
          <label htmlFor="toAddress" className="block text-gray-400 mb-2 mt-6">
            To
          </label>
          <TextInput value={transferTo} onChange={changetransferTo} />
          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              className="cardButton"
              onClick={transferBalance}
            >
              Transfer
            </Button>
            <Button type="button" onClick={validateBalanceTo}>
              Not Sure?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
