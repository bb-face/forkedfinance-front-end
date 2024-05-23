import React from "react";

import Button from "../../atoms/Button";

function AvailableBalance({ balance, points }) {
  return (
    <>
      <div className="items-center mb-2">
        <div>
          Avaliable Balance: <span>{balance || 0}</span>
        </div>
        <div>
          Points: <span>{points || 0}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          className="cardButton"
          disabled="true"
          onClick={() => {
            console.log("-- claim rewards not active yet!");
          }}
        >
          Claim
        </Button>
      </div>
    </>
  );
}

export default AvailableBalance;
