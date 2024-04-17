import React from "react";

import Button from "../../atoms/Button";

function AvailableBalance({ balance, totalFeeClaimableRewards }) {
  return (
    <>
      Avaliable Balance: <span>{balance}</span>
      <div>Total Points</div>
      <div className="flex justify-between items-center mb-2">
        <div>USDC</div>
        <div>{totalFeeClaimableRewards}</div>
      </div>
      <div className="cardRow">
        <div>Tuto</div>
      </div>
      <Button
        type="button"
        className="cardButton"
        onClick={() => {
          console.log("-- claim rewards not active yet!");
        }}
      >
        Claim
      </Button>
    </>
  );
}

export default AvailableBalance;
