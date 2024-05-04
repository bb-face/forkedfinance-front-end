import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Button from "../atoms/Button";
import NumberInput from "../atoms/NumberInput";
import TextInput from "../atoms/StringInput";

import useLocalState from "../utils/localState";
import { useUserManagement } from "../customHooks/useUser";

const url = "https://server.forkedfinance.xyz";

const Transfer = () => {
  const { user } = useUserManagement();

  const [transferTo, settransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const { alert, showAlert, setLoading, setSuccess, hideAlert } =
    useLocalState();

  const updateBalance = async () => {
    try {
      // const { data } = await axios.get(`${url}/api/v1/users/updateBalance`, {
      //   withCredentials: true,
      // });
      setBalance(Math.round((user / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  const transferBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();
    if (!transferAmount) {
      showAlert({
        text: "Please state the amount...",
      });
      setTimeout(() => {
        hideAlert();
      }, 7000);
      setLoading(false);
      return;
    }
    if (!transferTo) {
      showAlert({
        text: "Please provide wallet..",
      });
      setTimeout(() => {
        hideAlert();
      }, 7000);
      setLoading(false);
      return;
    }
    try {
      const { currentAddress, signedMessage } = await signTransfer();
      const { data } = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/balances/transferBalance`,
        {
          account: currentAddress,
          // unsignedMessage: unsignedMessage,
          signedMessage: signedMessage,
          walletTo: transferTo,
          amount: transferAmount,
        }
      );

      showAlert({ text: data.msg, type: "success" });
      setTimeout(() => {
        hideAlert();
      }, 7000);
      setSuccess(true);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setTimeout(() => {
        hideAlert();
      }, 7000);
      setSuccess(true);
    }
    updateBalance();
    setLoading(false);
  };

  const signTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider
      .getSigner()
      .getAddress()
      .catch((e) => {
        if (e.code === 4001) {
          console.log("Rejected");
        }
      });

    const unsignedMessage = import.meta.env.VITE_SECRET_SIGN_STRING;
    const payload = ethers.utils.defaultAbiCoder.encode(
      // [import.meta.env.VITE_SECRET_SIGN_STRING],
      ["string"],
      [unsignedMessage]
    );
    const payloadHash = ethers.utils.keccak256(payload);

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
    // const fullyExpandedSig = ethers.utils.splitSignature(signedMessage);

    // const signingAddress = ethers.utils.verifyMessage(
    //   ethers.utils.arrayify(payloadHash),
    //   fullyExpandedSig
    // );
    const data = { currentAddress, signedMessage };
    return data;
  };

  const validateBalanceTo = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();

    console.log(import.meta.env.VITE_SERVER_URL);
    if (!transferTo) {
      showAlert({
        text: "Please provide Wallet",
      });
      setTimeout(() => {
        hideAlert();
      }, 7000);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/balances/validateBalanceTo`,
        {
          walletTo: transferTo,
        }
      );
      showAlert({ text: data.msg, type: "success" });
      setSuccess(true);
    } catch (error) {
      showAlert({
        text: error.response.data.msg,
      });
      setSuccess(true);
    }
    // updateBalance();
    setTimeout(() => {
      hideAlert();
    }, 7000);

    setLoading(false);
  };

  function changeAmount(e) {
    setTransferAmount(e.target.value);
  }
  function changetransferTo(e) {
    settransferTo(String(e.target.value));
  }

  useEffect(() => {
    updateBalance();
    clearTimeout();
  }, [updateBalance]);
  // {alert.show && (
  //   <div className={`alert alert-${alert.type}`}>{alert.text}</div>
  // )}

  return (
    <div className="mx-auto p-4">
      <div className="min-w-96">
        <div className=" p-6 shadow-2xl bg-primary">
          <div className="flex items-baseline space-x-2">
            You are transferring:
          </div>
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
              Claim
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
