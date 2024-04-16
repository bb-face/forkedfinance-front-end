import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Popover } from "antd";
import { WalletTwoTone } from "@ant-design/icons";
import { ethers } from "ethers";

import { useGlobalContext } from "../context/context";
import useLocalState from "../utils/localState";

const url = "https://server.forkedfinance.xyz";

const Transfer = () => {
  const { user } = useGlobalContext();
  const [transferTo, settransferTo] = useState(null);
  const [transferAmount, setTransferAmount] = useState(null);
  const [balance, setBalance] = useState(null);

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
    console.log("test");

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

  return (
    <div>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}

      <div className="text-white mb-6">
        <p className="text-sm text-gray-400 mb-2">You're paying</p>
        <div className="flex items-baseline space-x-2">
          <Popover
            content={balance}
            title="Balance"
            trigger="click"
            placement="bottom"
            className="text-4xl font-bold"
          >
            <WalletTwoTone twoToneColor="#504acc" className="cog" />
          </Popover>
          <p className="text-lg text-gray-400">0 ETH ↓</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="toAddress" className="block text-gray-400 mb-2">
          To
        </label>
        <Input
          id="toAddress"
          type="text"
          placeholder="Wallet address or ENS name"
          className="w-full bg-gray-700 text-white p-3 rounded outline-none focus:ring-2 focus:ring-purple-600"
          value={transferTo}
          onChange={changetransferTo}
        />
      </div>

      <div className="mb-6">
        <Input
          placeholder="Amount"
          type="number"
          className="w-full bg-gray-700 text-white p-3 rounded outline-none focus:ring-2 focus:ring-purple-600"
          value={transferAmount}
          onChange={changeAmount}
        />
      </div>

      <button
        type="submit"
        onClick={transferBalance}
        className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-colors"
      >
        Tuto
      </button>
      <button type="button" onClick={validateBalanceTo}>
        Not Sure?
      </button>
    </div>
  );
};

export default Transfer;
