import React from "react";
import { Link } from "react-router-dom";

import Button from "../../atoms/Button";

function AvailableBalance({ balance, points }) {
  return (
    <>
      <div className="items-center mb-2">
        <div>
          Avaliable Balance: <span>{balance || 0}</span>
        </div>
        <div>
            Deposit, Withdraw, Transfer to get Points
        </div>
      </div>
      
      <div className="flex justify-end ">
        <Link to="../transfer">
          <Button>Instant Gas-Free Transfer</Button>
        </Link>
      </div>
    </>
  );
}

export default AvailableBalance;
