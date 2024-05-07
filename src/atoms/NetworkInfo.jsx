import React from "react";
import chainsData from "../costant/chainId.json";

function NetworkInfo({ chainId }) {
  const networkName = chainsData[chainId] || chainId;

  return <div>{networkName}</div>;
}

export default NetworkInfo;
